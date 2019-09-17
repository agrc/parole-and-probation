using app.Features.Tokens;
using app.Infrastructure;
using app.Models;
using app.Models.Tokens;
using app.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.Threading;

namespace app {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.Configure<IISServerOptions>(options => {
                options.AutomaticAuthentication = false;
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration => {
                configuration.RootPath = "ClientApp/build";
            });

            var section = Configuration.GetSection("ArcGIS");
            var values = section.Get<Credential>();

            var emailSection = Configuration.GetSection("Email");
            var emailValues = emailSection.Get<EmailConfig>();

            services.AddSingleton<TokenService>();
            services.AddSingleton<IArcGISCredential>(values);
            services.AddSingleton(provider => new EmailSender(emailValues));
            services.AddSingleton(Configuration);

            services.AddSingleton<ILogger>(provider => new LoggerConfiguration()
                .ReadFrom.Configuration(Configuration)
                .CreateLogger());

            services.AddSingleton<TokenValidationParameters>(provider => {
                var authority = "https://login.dts.utah.gov:443/sso/oauth2";

                var configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(
                    $"{authority}/.well-known/openid-configuration",
                    new OpenIdConnectConfigurationRetriever(),
                    new HttpDocumentRetriever());

                var discoveryDocument = configurationManager.GetConfigurationAsync(CancellationToken.None).Result;

                return new TokenValidationParameters {
                    ValidIssuer = authority,
                    ValidAudience = "synange-feoffor-673742",
                    IssuerSigningKeys = discoveryDocument.SigningKeys
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            } else {
                app.UseExceptionHandler("/Error");
            }

            if (env.IsStaging()) {
                app.UsePathBase("/app");
            }

            app.UseMiddleware<ReverseProxyMiddleware>();
            app.UseMiddleware<CsvDownloadMiddleware>();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseSpa(spa => {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment()) {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
