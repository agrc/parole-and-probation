using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Serilog;

namespace app.Features.TypeAhead {
    public class DataController : ControllerBase {
        private readonly ILogger _log;
        private readonly Dictionary<string, string> inputLookup = new Dictionary<string, string>{
            {"name", "offender"},
            {"number", "offender_id"},
            {"phone", "offender_phone"},
            {"employer", "employer"}
        };
        private readonly string connectionString;

        public DataController(ILogger log, IConfiguration config) {
            _log = log;
            connectionString = config.GetConnectionString("DefaultConnection");
        }

        [HttpGet]
        [Route("api/data/{input}/{value}")]
        public async Task<JsonResult> FindItems(string input, string value) {
            _log.Debug("Finding matchings for {value} in {input}", value, input);

            if (!inputLookup.ContainsKey(input.ToLower())) {
                return new JsonResult(null);
            }

            var field = inputLookup[input.ToLower()];

            var selectAll = false;

            if (value.Length == 0) {
                selectAll = true;
            }

            if (selectAll) {
                using (var session = new SqlConnection(connectionString)) {
                    session.Open();

                    var data = await session.QueryAsync<string>($"SELECT {field} FROM DOCOAdmin.offenders ORDER BY {field} ASC");

                    return new JsonResult(data);
                }
            }

            using (var session = new SqlConnection(connectionString)) {
                session.Open();

                var data = await session.QueryAsync<string>($"SELECT {field} FROM DOCOAdmin.offenders WHERE {field} LIKE @value" +
                                                            $" ORDER BY {field} ASC", new {
                                                                value = $"%{value}%"
                                                            });

                return new JsonResult(data);
            }
        }
    }
}
