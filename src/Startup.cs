using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using CsvHelper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using parole.Features;
using Polly;
using Polly.Extensions.Http;
using Polly.Timeout;
using Serilog;

namespace parole {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services) {
            const string authority = "https://login.dts.utah.gov:443/sso/oauth2";

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options => {
                options.ForwardChallenge = OpenIdConnectDefaults.AuthenticationScheme;
                options.LoginPath = "/authentication/login";
                options.LogoutPath = "/";
                options.AccessDeniedPath = "/authentication/access-denied";
            })
            .AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options => {
                var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                options.ClientId = Environment.GetEnvironmentVariable("PAROLE_CLIENT_ID_STAGING");
                options.ClientSecret = Environment.GetEnvironmentVariable("PAROLE_CLIENT_SECRET_STAGING");

                if (environment == Environments.Development) {
                    IConfigurationSection oidcSection = Configuration.GetSection("Authentication:UtahId");
                    options.ClientId = oidcSection["ClientId"];
                    options.ClientSecret = oidcSection["ClientSecret"];
                }

                options.Authority = authority;
                options.ResponseType = "code";
                options.UsePkce = true;

                options.GetClaimsFromUserInfoEndpoint = true;

                options.Scope.Clear();
                options.Scope.Add("openid");
                options.Scope.Add("app:public");
                options.Scope.Add("app:DOCFieldMap");
            });

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

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration => configuration.RootPath = "ClientApp/build");

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
            services.AddSingleton<OpenIdConfigurationProvider>();
            services.AddSingleton<ExportService>();
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

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
                app.UseSerilogRequestLogging();
            } else {
                app.UseExceptionHandler("/Error");
                app.UseForwardedHeaders();
            }

            if (env.IsStaging()) {
                app.UsePathBase("/app");
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => {
                var tokenService = endpoints.ServiceProvider.GetService<TokenService>();
                var logger = endpoints.ServiceProvider.GetService<ILogger>();
                var openIdConfigurationProvider = endpoints.ServiceProvider.GetService<OpenIdConfigurationProvider>();

                endpoints.MapGet("api/configuration", context => context.Response.WriteAsJsonAsync(new Dictionary<string, string>{
                        { "id", context.User.Claims.First(x=> x.Type == "public:WorkforceID").Value },
                        { "name", context.User.Claims.First(x=> x.Type == "public:FullName").Value }
                    })
                ).RequireAuthorization(new[] { CookieAuthenticationDefaults.AuthenticationScheme });

                endpoints.MapPost("api/download", async context => {
                    CsvDownload model;
                    try {
                        model = await context.Request.ReadFromJsonAsync<CsvDownload>(new JsonSerializerOptions {
                            PropertyNameCaseInsensitive = true
                        }).ConfigureAwait(false);
                    } catch (JsonException) {
                        context.Response.StatusCode = 400;
                        await context.Response.WriteAsJsonAsync(new {
                            message = "Invalid Request"
                        }).ConfigureAwait(false);

                        return;
                    }

                    if (model?.Offenders?.Count == 0) {
                        context.Response.StatusCode = 400;
                        await context.Response.WriteAsJsonAsync(new {
                            message = "Invalid Request"
                        }).ConfigureAwait(false);

                        return;
                    }

                    var exportService = endpoints.ServiceProvider.GetService<ExportService>();

                    var records = await exportService.GetRecords(model).ConfigureAwait(false);
                    if (!records.Any()) {
                        context.Response.StatusCode = 200;
                        await context.Response.WriteAsJsonAsync(new {
                            message = "Skipping empty export"
                        }).ConfigureAwait(false);

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
                    await writer.FlushAsync().ConfigureAwait(false);

                    stream.Position = 0;
                    await stream.CopyToAsync(context.Response.Body).ConfigureAwait(false);
                    stream.Position = 0;

                    var emailConfig = endpoints.ServiceProvider.GetService<EmailConfig>();
                    var emailer = new EmailSender(emailConfig, logger);

                    await emailer.SendAsync(new[] { model.Agent }, stream).ConfigureAwait(false);
                }
                ).RequireAuthorization(new[] { CookieAuthenticationDefaults.AuthenticationScheme });

                endpoints.MapReverseProxy(proxyPipeline => {
                    proxyPipeline.Use(async (context, next) => {
                        var request = context.Request;
                        request.QueryString = request.QueryString.Add("token", await tokenService.GetToken().ConfigureAwait(false));

                        await next().ConfigureAwait(false);
                    });
                });
            });

            app.Use(async (context, next) => {
                if (context.User.Identity.IsAuthenticated) {
                    var appClaim = context.User.Claims.FirstOrDefault(x => x.Type == "DOCFieldMap:AccessGranted");
                    if (appClaim?.Value == "true") {
                        await next().ConfigureAwait(false);
                    } else {
                        await context.Response.WriteAsync("Access denied").ConfigureAwait(false);
                    }
                } else {
                    await context.ChallengeAsync(OpenIdConnectDefaults.AuthenticationScheme).ConfigureAwait(false);
                }
            });

            app.UseSpa(spa => {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment()) {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
