using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace parole.Features {
    public class OpenIdConfigurationProvider {
        private record OidcConfig(string BaseUrl);
        private readonly IConfiguration _config;

        public IHostEnvironment Env { get; }

        public OpenIdConfigurationProvider(IConfiguration config, IHostEnvironment env) {
            _config = config;
            Env = env;
        }
        public Dictionary<string, string> GetConfig() {
            var config = Env.EnvironmentName switch {
                "Development" => new OidcConfig("https://localhost:5001"),
                "Staging" => new OidcConfig("https://test.mapserv.utah.gov/app"),
                _ => new OidcConfig("https://prod-dns")
            };

            return Transform(config);
        }

        private Dictionary<string, string> Transform(OidcConfig config) {
            var clientId = Environment.GetEnvironmentVariable("PAROLE_CLIENT_ID_STAGING");

            if (Env.IsDevelopment()) {
                var oidcSection = _config.GetSection("Authentication:UtahId");
                clientId = oidcSection["ClientId"];
            }

            return new() {
                { "authority", "https://login.dts.utah.gov:443/sso/oauth2" },
                { "client_id", clientId },
                { "redirect_uri", $"{config.BaseUrl}/authentication/login-callback" },
                { "post_logout_redirect_uri", $"{config.BaseUrl}/authentication/logout-callback" },
                { "response_type", "code" },
                { "scope", "App:DOCFieldMap openid profile app:public" }
            };
        }
    }
}
