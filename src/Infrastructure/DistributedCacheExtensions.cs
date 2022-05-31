using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;

namespace parole.Infrastructure;

public class RedisOptions {
    public string Configuration { get; set; } = "localhost:6379";
}
public static class DistributedCacheExtensions {
    public static IServiceCollection AddDistributedAuthentication(this IServiceCollection services, RedisOptions redisOptions) {
        var redis = ConnectionMultiplexer.Connect(redisOptions.Configuration);

        services.AddStackExchangeRedisCache(options => options.Configuration = redisOptions.Configuration);

        services.AddSingleton<ITicketStore, RedisTicketStore>();
        services.AddSingleton<IConnectionMultiplexer>(redis);

        services.AddDataProtection().PersistKeysToStackExchangeRedis(redis, "data-protection-key");

        services.AddOptions<CookieAuthenticationOptions>(CookieAuthenticationDefaults.AuthenticationScheme)
          .Configure<ITicketStore>((options, store) => {
              options.Cookie.Name = ".auth-ticket.auth";
              options.SessionStore = store;
              options.ExpireTimeSpan = TimeSpan.FromHours(4);
              options.SlidingExpiration = true;

              options.ForwardChallenge = OpenIdConnectDefaults.AuthenticationScheme;
              options.LoginPath = "/authentication/login";
              options.AccessDeniedPath = "/authentication/access-denied";
              options.LogoutPath = "/";
          }).PostConfigure<IServiceProvider>((options, provider) => {
              options.Events.OnRedirectToAccessDenied = context => {
                  context.Response.Headers["Location"] = context.RedirectUri;
                  context.Response.StatusCode = 401;

                  return Task.CompletedTask;
              };
          });

        return services;
    }
}
