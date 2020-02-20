using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using app.Features.Tokens;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Serilog;

namespace app.Features.TypeAhead {
    public class DataController : ControllerBase {
        private readonly ILogger _log;
        private readonly TokenValidationParameters _token;
        private readonly Dictionary<string, string> inputLookup = new Dictionary<string, string>{
            {"name", "offender"},
            {"number", "offender_id"},
            {"phone", "offender_phone"},
            {"employer", "employer"}
        };
        private readonly string connectionString;

        public DataController(ILogger log, IConfiguration config, TokenValidationParameters token) {
            _log = log;
            _token = token;
            connectionString = config.GetConnectionString("DefaultConnection");
        }

        [HttpGet]
        [Route("api/data/{input}/{value}")]
        public async Task<IActionResult> FindItems(string input, string value, string filters, int? requestId, int? limit = 25) {
            var validated = JwtService.ValidateAndDecode(Request, _token, _log);

            if (!validated) {
                return new UnauthorizedResult();
            }

            _log.Debug("Finding matchings for {value} in {input}", value, input);

            if (!inputLookup.ContainsKey(input.ToLower())) {
                return new JsonResult(new {
                    requestId,
                    data = new string[] { }
                });
            }

            var field = inputLookup[input.ToLower()];

            var selectAll = false;

            if (value.Length == 0) {
                selectAll = true;
            }

            string query;

            if (selectAll) {
                using (var session = new SqlConnection(connectionString)) {
                    session.Open();

                    query = $"SELECT DISTINCT TOP {limit} {field} FROM DOCOAdmin.offenders ORDER BY {field} ASC";

                    if (!string.IsNullOrEmpty(filters)) {
                        query = $"SELECT DISTINCT TOP {limit} {field} FROM DOCOAdmin.offenders WHERE {filters} ORDER BY {field} ASC";
                    }

                    var data = await session.QueryAsync<string>(query);

                    return new JsonResult(new {
                        requestId,
                        data
                    });
                }
            }

            using (var session = new SqlConnection(connectionString)) {
                session.Open();

                query = $"SELECT DISTINCT TOP {limit} {field} FROM DOCOAdmin.offenders WHERE {field} LIKE @value" +
                        $" ORDER BY {field} ASC";

                if (!string.IsNullOrEmpty(filters)) {
                    query = $"SELECT DISTINCT TOP {limit} {field} FROM DOCOAdmin.offenders WHERE {field} LIKE @value" +
                            $" AND {filters} ORDER BY {field} ASC";
                }

                var data = await session.QueryAsync<string>(query, new {
                    value = $"%{value}%"
                });

                return new JsonResult(new {
                    requestId,
                    data
                });
            }
        }
    }
}
