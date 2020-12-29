using parole.Models;
using CsvHelper;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using Microsoft.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Threading.Tasks;
using System.Text.Json;

namespace parole.Features {
    public class CsvDownloadMiddleware {
        private readonly RequestDelegate _nextMiddleware;
        private readonly ILogger _log;
        private readonly TokenValidationParameters _token;
        private readonly string connectionString;
        private readonly EmailSender _emailer;

        public CsvDownloadMiddleware(RequestDelegate nextMiddleware, ILogger log, TokenValidationParameters token,
                                     IConfiguration config, EmailConfig emailConfig) {
            _nextMiddleware = nextMiddleware;
            _log = log;
            _token = token;
            connectionString = config.GetConnectionString("DefaultConnection");
            _emailer = new EmailSender(emailConfig, log);
        }

        public async Task Invoke(HttpContext context) {
            if (!context.Request.Path.StartsWithSegments("/api/download") || !HttpMethods.IsPost(context.Request.HttpContext.Request.Method)) {
                await _nextMiddleware(context);

                return;
            }

            var validated = JwtService.ValidateAndDecode(context.Request, _token, _log);

            if (!validated) {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Invalid Access Token");

                return;
            }

            CsvDownload model;
            try {
                model = await JsonSerializer.DeserializeAsync<CsvDownload>(context.Request.Body, new JsonSerializerOptions {
                    PropertyNameCaseInsensitive = true
                });
            } catch (JsonException) {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync("Invalid Request");

                return;
            }

            if (model?.Offenders?.Count == 0) {
                return;
            }

            _log.Information("Invoking CSV export");

            using var session = new SqlConnection(connectionString);
            session.Open();

            var records = await session.QueryAsync<Schema>("SELECT * FROM DOCOAdmin.offenders WHERE id IN @ids", new {
                ids = model.Offenders
            });

            context.Response.Clear();
            context.Response.StatusCode = 201;
            context.Response.Headers["Content-Type"] = "application/csv";
            context.Response.Headers["Content-Disposition"] = "attachment; filename=offenders.csv";

            _log.Debug("Converting to csv {records}", records);

            using var stream = new MemoryStream();
            using var writer = new StreamWriter(stream);
            using var csv = new CsvWriter(writer, CultureInfo.CurrentCulture);
            csv.WriteRecords(records);
            await writer.FlushAsync();

            stream.Position = 0;
            await stream.CopyToAsync(context.Response.Body);
            stream.Position = 0;

            await _emailer.SendAsync(new[] { model.Agent }, stream);
        }
    }
}
