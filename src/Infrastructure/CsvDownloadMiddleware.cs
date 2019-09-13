using System;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using app.Models;
using CsvHelper;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Serilog;

namespace app.Infrastructure {
    public class CsvDownloadMiddleware {
        private readonly RequestDelegate _nextMiddleware;
        private readonly ILogger _log;
        private readonly TokenValidationParameters _token;
        private readonly string connectionString;

        public CsvDownloadMiddleware(RequestDelegate nextMiddleware, ILogger log, TokenValidationParameters token, IConfiguration config) {
            _nextMiddleware = nextMiddleware;
            _log = log;
            _token = token;
            connectionString = config.GetConnectionString("DefaultConnection");
        }

        public async Task Invoke(HttpContext context) {
            if (!context.Request.Path.StartsWithSegments("/api/download") || !HttpMethods.IsPost(context.Request.HttpContext.Request.Method)) {
                await _nextMiddleware(context);

                return;
            }

            var validated = ValidateAndDecode(context.Request, _token);

            if (!validated) {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Invalid Access Token");

                return;
            }

            var content = string.Empty;
            using (var streamContent = new StreamReader(context.Request.Body)) {
                content = await streamContent.ReadToEndAsync();
            }

            if (string.IsNullOrEmpty(content)) {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync("Invalid Request");

                return;
            }

            var model = JsonConvert.DeserializeObject<CsvDownload>(content);

            if (model.Offenders.Count == 0) {
                return;
            }

            using (var session = new SqlConnection(connectionString)) {
                session.Open();

                var records = session.Query<Schema>("SELECT * FROM DOCOAdmin.offenders WHERE id IN @ids", new {
                    ids = model.Offenders
                });

                using (var stream = new MemoryStream())
                using (var writer = new StreamWriter(stream))
                using (var csv = new CsvWriter(writer)) {
                    csv.WriteRecords(records);
                    await writer.FlushAsync();

                    context.Response.StatusCode = 201;
                    await context.Response.WriteAsync("{\"status\": \"ok\"");
                }
            }

            await _nextMiddleware(context);
        }

        private bool ValidateAndDecode(HttpRequest request, TokenValidationParameters validationToken) {
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
                _log.Warning(ex, "Token validation failure");

                return false;
            } catch (ArgumentException ex) {
                _log.Warning(ex, "Token not well formed");

                return false;
            }
        }
    }
}
