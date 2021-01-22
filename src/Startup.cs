using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using CsvHelper;
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
using Serilog.Events;

namespace parole {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services) {
            services.AddReverseProxy()
              .LoadFromConfig(Configuration.GetSection("ReverseProxy"));

            services.AddControllersWithViews();

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
            services.AddSingleton<ExportService>();
            services.AddSingleton<TypeAheadService>();
            services.AddSingleton<IArcGISCredential>(values);
            services.AddSingleton(emailValues);
            services.AddSingleton(Configuration);

            services.AddSingleton<ILogger>(_ => new LoggerConfiguration()
                .ReadFrom.Configuration(Configuration)
                .CreateLogger());

            services.AddSingleton<TokenValidationParameters>(_ => {
                var authority = "https://login.dts.utah.gov:443/sso/oauth2";

                var configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(
                    $"{authority}/.well-known/openid-configuration",
                    new OpenIdConnectConfigurationRetriever(),
                    new HttpDocumentRetriever());

                var discoveryDocument = configurationManager.GetConfigurationAsync(default).Result;

                return new TokenValidationParameters {
                    ValidIssuer = authority,
                    ValidAudience = "synange-feoffor-673742",
                    IssuerSigningKeys = discoveryDocument.SigningKeys
                };
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
                app.UseSerilogRequestLogging();
            } else {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            if (env.IsStaging()) {
                app.UsePathBase("/app");
            }

            app.UseHttpsRedirection();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints => {
                var tokenService = endpoints.ServiceProvider.GetService<TokenService>();
                var tokenInfo = endpoints.ServiceProvider.GetService<TokenValidationParameters>();
                var logger = endpoints.ServiceProvider.GetService<ILogger>();

                endpoints.MapGet("api/data/{input}/{value}", async context => {
                    // var request = context.Request;
                    // var validated = JwtService.ValidateAndDecode(request, tokenInfo, logger);

                    // if (!validated) {
                    //     logger.Warning("invalid access token");

                    //     context.Response.StatusCode = 401;
                    //     await context.Response.WriteAsync("Invalid Access Token");

                    //     return;
                    // }

                    var typeAheadProvider = endpoints.ServiceProvider.GetService<TypeAheadService>();

                    var input = context.Request.RouteValues["input"].ToString();
                    var value = context.Request.RouteValues["value"].ToString();
                    var limit = 25;
                    int? requestId = null;
                    string filter = null;

                    if (context.Request.Query.TryGetValue("filters", out var filtersQuery) &&
                        !string.IsNullOrEmpty(filtersQuery)) {
                        filter = filtersQuery.ToString();
                    }
                    if (context.Request.Query.TryGetValue("requestId", out var requestIdQuery) &&
                        int.TryParse(requestIdQuery, out var newRequestId)) {
                        requestId = newRequestId;
                    }
                    if (context.Request.Query.TryGetValue("limit", out var limitQuery) &&
                        int.TryParse(limitQuery, out var newLimit)) {
                        limit = newLimit;
                    }

                    var descriptor = new TypeAheadDescriptor(input, value, filter, requestId, limit);

                    var data = await typeAheadProvider.Find(descriptor).ConfigureAwait(false);

                    await context.Response.WriteAsJsonAsync(data).ConfigureAwait(false);
                });

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
                });

                endpoints.MapReverseProxy(proxyPipeline => {
                    proxyPipeline.Use(async (context, next) => {
                        var request = context.Request;
                        var validated = JwtService.ValidateAndDecode(request, tokenInfo, logger);

                        if (!validated) {
                            logger.Warning("invalid access token");

                            context.Response.StatusCode = 401;
                            await context.Response.WriteAsync("Invalid Access Token");

                            return;
                        }

                        request.QueryString = request.QueryString.Add("token", await tokenService.GetToken());

                        await next();
                    });
                });
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
