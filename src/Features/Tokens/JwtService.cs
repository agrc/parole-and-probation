using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using Serilog;

namespace app.Features.Tokens {
    public static class JwtService {
        public static bool ValidateAndDecode(HttpRequest request, TokenValidationParameters validationToken, ILogger log) {
            var jwt = request.Headers["Authorization"];

            if (StringValues.IsNullOrEmpty(jwt)) {
                return false;
            }

            // remove `Bearer `
            jwt = jwt.ToString().Remove(0, 7);

            try {
                var claimsPrincipal = new JwtSecurityTokenHandler().ValidateToken(jwt, validationToken, out var rawValidatedToken);

                return true;
            } catch (SecurityTokenValidationException ex) {
                log.Warning(ex, "Token validation failure");

                return false;
            } catch (ArgumentException ex) {
                log.Warning(ex, "Token not well formed");

                return false;
            }
        }
    }
}
