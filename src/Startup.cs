using System;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using parole.Features;
using Polly;
using Polly.Extensions.Http;
using Polly.Timeout;
using Serilog;

namespace parole
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddReverseProxy()
        .LoadFromConfig(Configuration.GetSection("ReverseProxy"));

      services.AddControllersWithViews();

      // In production, the React files will be served from this directory
      services.AddSpaStaticFiles(configuration =>
      {
        configuration.RootPath = "ClientApp/build";
      });

      var section = Configuration.GetSection("ArcGIS");
      var values = section.Get<Credential>();

      var emailSection = Configuration.GetSection("Email");
      var emailValues = emailSection.Get<EmailConfig>();

      var retryPolicy = HttpPolicyExtensions
        .HandleTransientHttpError()
        .Or<TimeoutRejectedException>() // thrown by Polly's TimeoutPolicy if the inner call times out
        .WaitAndRetryAsync(3, retryAttempt =>
                TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));

      var timeoutPolicy = Policy.TimeoutAsync<HttpResponseMessage>(8); // Timeout for an individual try

      services.AddHttpClient("default", client => { client.Timeout = new TimeSpan(0, 0, 15); })
        .ConfigurePrimaryHttpMessageHandler(() =>
        {
        var handler = new HttpClientHandler();
        if (handler.SupportsAutomaticDecompression)
        {
            handler.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;
        }

        return handler;
        })
        .AddPolicyHandler(retryPolicy)
        .AddPolicyHandler(timeoutPolicy);

      services.AddSingleton<TokenService>();
      services.AddSingleton<IArcGISCredential>(values);
      services.AddSingleton(emailValues);
      services.AddSingleton(Configuration);

      services.AddSingleton<ILogger>(provider => new LoggerConfiguration()
          .ReadFrom.Configuration(Configuration)
          .CreateLogger());

      services.AddSingleton<TokenValidationParameters>(provider =>
      {
        var authority = "https://login.dts.utah.gov:443/sso/oauth2";

        var configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(
            $"{authority}/.well-known/openid-configuration",
            new OpenIdConnectConfigurationRetriever(),
            new HttpDocumentRetriever());

        var discoveryDocument = configurationManager.GetConfigurationAsync(default).Result;

        return new TokenValidationParameters
        {
          ValidIssuer = authority,
          ValidAudience = "synange-feoffor-673742",
          IssuerSigningKeys = discoveryDocument.SigningKeys
        };
      });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
      }

      if (env.IsStaging())
      {
        app.UsePathBase("/app");
      }

      app.UseSerilogRequestLogging();
      app.UseHttpsRedirection();

      app.UseMiddleware<CsvDownloadMiddleware>();

      app.UseStaticFiles();
      app.UseSpaStaticFiles();

      app.UseRouting();

      app.UseEndpoints(endpoints =>
      {
        var tokenService = endpoints.ServiceProvider.GetService<TokenService>();
        var tokenInfo = endpoints.ServiceProvider.GetService<TokenValidationParameters>();
        var logger = endpoints.ServiceProvider.GetService<ILogger>();

        endpoints.MapReverseProxy(proxyPipeline =>
        {
          proxyPipeline.Use(async (context, next) =>
          {
            var request = context.Request;
            var validated = JwtService.ValidateAndDecode(request, tokenInfo, logger);

            if (!validated)
            {
              logger.Information("invalid access token");

              context.Response.StatusCode = 401;
              await context.Response.WriteAsync("Invalid Access Token");

              return;
            }

            request.QueryString = request.QueryString.Add("token", await tokenService.GetToken());

            await next();
          });
        });
      });

      app.UseSpa(spa =>
      {
        spa.Options.SourcePath = "ClientApp";

        if (env.IsDevelopment())
        {
          spa.UseReactDevelopmentServer(npmScript: "start");
        }
      });
    }
  }
}
