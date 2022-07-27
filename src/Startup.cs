using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using api.Infrastructure;
using CsvHelper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using parole.Features;
using parole.Infrastructure;
using Polly;
using Polly.Extensions.Http;
using Polly.Timeout;
using SendGrid.Extensions.DependencyInjection;
using Serilog;

namespace parole {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services) {
            services.AddCors();

            var redis = Configuration.GetSection("Redis").Get<RedisOptions>();
            services.AddDistributedAuthentication(redis);

            var utahId = Configuration.GetSection("UtahId").Get<OAuthOptions>();
            services.AddUtahIdAuthentication(utahId, new[] { "openid", "app:public", "app:DOCFieldMap", });

            services.AddAuthorization(options => {
                options.AddPolicy(CookieAuthenticationDefaults.AuthenticationScheme, policy => {
                    policy.RequireAuthenticatedUser();
                    policy.RequireClaim("DOCFieldMap:AccessGranted", "true");
                });
                options.AddPolicy(OpenIdConnectDefaults.AuthenticationScheme, policy =>
                    policy.RequireClaim("DOCFieldMap:AccessGranted", "true"));
            });

            services.AddReverseProxy()
              .LoadFromConfig(Configuration.GetSection("ReverseProxy"));

            var section = Configuration.GetSection("ArcGIS");
            var values = section.Get<Credential>();

            var emailSection = Configuration.GetSection("Email");
            var emailValues = emailSection.Get<EmailConfig>();

            services.AddSendGrid(options => options.ApiKey = emailValues.ApiKey);

            var retryPolicy = HttpPolicyExtensions
              .HandleTransientHttpError()
              .Or<TimeoutRejectedException>() // thrown by Polly's TimeoutPolicy if the inner call times out
              .WaitAndRetryAsync(3, retryAttempt =>
                      TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));

            var timeoutPolicy = Policy.TimeoutAsync<HttpResponseMessage>(8); // Timeout for an individual try

            services.AddHttpClient("default", client => client.Timeout = new TimeSpan(0, 0, 15))
              .ConfigurePrimaryHttpMessageHandler(() => {
                  var handler = new HttpClientHandler();

                  if (handler.SupportsAutomaticDecompression) {
                      handler.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;
                  }

                  return handler;
              })
              .AddPolicyHandler(retryPolicy)
              .AddPolicyHandler(timeoutPolicy);

            services.AddSingleton<TokenService>();
            services.AddSingleton<ExportService>();
            services.AddSingleton<LookupService>();
            services.AddSingleton<IArcGISCredential>(values);
            services.AddSingleton(emailValues);
            services.AddSingleton(Configuration);

            services.AddSingleton<ILogger>(_ => new LoggerConfiguration()
                .ReadFrom.Configuration(Configuration)
                .CreateLogger());

            services.Configure<ForwardedHeadersOptions>(options => {
                options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
                options.KnownNetworks.Clear();
                options.KnownProxies.Clear();
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger logger) {
            var redirectUri = "https://fieldmap.udc.utah.gov/signin-oidc";

            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
                app.UseSerilogRequestLogging();
                redirectUri = "http://localhost:5173/signin-oidc";
            } else {
                app.UseExceptionHandler("/Error");
                app.UseForwardedHeaders();
            }

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.Use(async (context, next) => {
                logger.Debug("Request received: {Request} auth: {IsAuthenticated}", context.Request.Path, context.User.Identity?.IsAuthenticated);
                if (!context.User.Identity?.IsAuthenticated ?? false && (context.Request.Path != "/signin-oidc" || context.Request.Path != "/app.webmanifest")) {
                    logger.Debug("challenging: {path}", context.Request.Path);
                    await context.ChallengeAsync(OpenIdConnectDefaults.AuthenticationScheme);
                }

                if (context.User.Identity?.IsAuthenticated == true) {
                    logger.Debug("User: {IsAuthenticated}", context.User.Identity?.IsAuthenticated);

                    var claims = context.User.Claims.ToList();
                    logger.Debug("claim count: {Claims}", claims.Count);
                    logger.Verbose("claims: {Claims}", claims.Select(c => $"{c.Type}={c.Value}"));

                    var appClaim = claims.Find(x => x.Type == "DOCFieldMap:AccessGranted");
                    if (appClaim?.Value == "true") {
                        logger.Debug("has claim awaiting next()");
                        await next();
                    } else {
                        logger.Debug("missing claim writing access denied");
                        await context.Response.WriteAsync("Access denied");
                    }
                } else {
                    var redirectUri = "/";
                    if (env.IsDevelopment()) {
                        redirectUri = "http://localhost:5173";
                    }

                    logger.Debug("challenging request {request} directing back to {redirect}", context.Request.Path, redirectUri);

                    await context.ChallengeAsync(
                        OpenIdConnectDefaults.AuthenticationScheme,
                        new AuthenticationProperties { RedirectUri = redirectUri, }
                    );
                }
            });

            app.UseStaticFiles();
            app.UseMiddleware<ExceptionHandlingMiddleware>();

            app.UseEndpoints(endpoints => {
                var tokenService = endpoints.ServiceProvider.GetService<TokenService>();
                var logger = endpoints.ServiceProvider.GetService<ILogger>();
                var auth = new[] { CookieAuthenticationDefaults.AuthenticationScheme };

                if (env.IsDevelopment()) {
                    // mimic server getting first response for authentication
                    // instead of vite development server
                    endpoints.MapGet("development", context => {
                        context.Response.Redirect("/");
                        return Task.CompletedTask;
                    }).RequireAuthorization(CookieAuthenticationDefaults.AuthenticationScheme);
                }

                endpoints.MapGet("api/login", context => {
                    context.Response.Redirect(redirectUri);
                    return Task.CompletedTask;
                }).RequireAuthorization(OpenIdConnectDefaults.AuthenticationScheme);

                endpoints.MapGet("api/logout", async context => {
                    logger?
                    .ForContext("user", context.User?.Identity)
                    .ForContext("claims", context.User?.Claims)
                    .ForContext("cookies", context.Request?.Cookies)
                    .Information("authentication issue link clicked", context.User);

                    await context.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                    context.Response.Redirect("/");
                });

                endpoints.MapGet("api/configuration", context => context.Response.WriteAsJsonAsync(new Dictionary<string, string>{
                        { "id", context.User.Claims.FirstOrDefault(x=> x.Type == "public:WorkforceID")?.Value ?? string.Empty},
                        { "name", context.User.Claims.FirstOrDefault(x=> x.Type == "public:FullName")?.Value ?? string.Empty}
                    })
                ).RequireAuthorization(CookieAuthenticationDefaults.AuthenticationScheme);

                endpoints.MapGet("api/lookups", async context => {
                    var lookupService = endpoints.ServiceProvider.GetService<LookupService>();
                    if (lookupService is null) {
                        context.Response.StatusCode = 500;
                        await context.Response.WriteAsync("invalid server configuration");

                        return;
                    }

                    context.Response.StatusCode = 200;
                    await context.Response.WriteAsJsonAsync(await lookupService.GetAgentsAsync());
                }).RequireAuthorization(auth);

                endpoints.MapPost("api/download", async context => {
                    MapFilterState? model;
                    try {
                        model = await context.Request.ReadFromJsonAsync<MapFilterState>(new JsonSerializerOptions {
                            PropertyNameCaseInsensitive = true
                        });
                    } catch (JsonException ex) {
                        context.Response.StatusCode = 400;
                        await context.Response.WriteAsJsonAsync(new {
                            message = "Invalid Request " + ex
                        });

                        return;
                    }

                    var exportService = endpoints.ServiceProvider.GetService<ExportService>();

                    if (exportService is null) {
                        context.Response.StatusCode = 500;
                        await context.Response.WriteAsJsonAsync(new {
                            message = "invalid server configuration"
                        });

                        return;
                    }

                    var records = await exportService.GetRecordsAsync(model);

                    if (!records.Any()) {
                        context.Response.StatusCode = 200;
                        await context.Response.WriteAsJsonAsync(new {
                            message = "Skipping empty export"
                        });

                        return;
                    }

                    context.Response.Clear();
                    context.Response.StatusCode = 201;
                    context.Response.Headers["Content-Type"] = "application/csv";
                    context.Response.Headers["Content-Disposition"] = "attachment; filename=offenders.csv";

                    using var stream = new MemoryStream();
                    using var writer = new StreamWriter(stream);
                    using var csv = new CsvWriter(writer, CultureInfo.CurrentCulture);

                    csv.WriteRecords(records);
                    await writer.FlushAsync();

                    stream.Position = 0;
                    await stream.CopyToAsync(context.Response.Body);
                    stream.Position = 0;

                    var emailConfig = endpoints.ServiceProvider.GetService<EmailConfig>();
                    if (emailConfig is null) {
                        logger?.Warning("email configuration is null");

                        return;
                    }

                    var emailer = endpoints.ServiceProvider.GetService<EmailSender>();
                    var emailClaim = context.User.Claims.FirstOrDefault(x => x.Type == "public:Email");

                    if (emailClaim is null || emailer is null) {
                        return;
                    }

                    await emailer.SendAsync(new[] { emailClaim.Value }, stream);
                }).RequireAuthorization(auth);

                endpoints.MapReverseProxy(proxyPipeline => {
                    proxyPipeline.Use(async (context, next) => {
                        var request = context.Request;

                        if (request.Path.StartsWithSegments(new PathString("/secure")) && tokenService is not null) {
                            request.QueryString = request.QueryString.Add("token", await tokenService.GetTokenAsync());
                        }

                        await next();
                    });
                });

                endpoints.MapFallbackToFile("index.html");
            });
        }
    }
}
