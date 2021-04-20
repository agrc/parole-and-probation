using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Serilog;

namespace parole.Features {
    public class LookupService {
        private readonly ILogger _log;
        private readonly string connectionString;

        public LookupService(ILogger log, IConfiguration config) {
            _log = log;
            connectionString = config.GetConnectionString("DefaultConnection");
        }

        public async Task<IEnumerable<AgentItem>> GetAgentsAsync() {
            using var session = new SqlConnection(connectionString);
            try {
                session.Open();
            } catch (SqlException) {
                _log.Warning("Sql Exception connecting to the database");

                return Array.Empty<AgentItem>();
            }

            var records = Enumerable.Empty<AgentItem>();

            try {
                records = await session.QueryAsync<AgentItem>("SELECT * FROM DOCOAdmin.agents");
            } catch (Exception ex) {
                _log.Fatal(ex, "query failure");
            }

            return records;
        }
    }

    public record AgentItem(int Id, string Value, string Agent_Id, string Supervisor_Id, string Supervisor_Name);
    // public class AgentItem {
    //     public int Id { get; set; }
    //     public string Value { get; set; }
    //     public string Agent_Id { get; set; }
    //     public string Supervisor_Id { get; set; }
    //     public string Supervisor_Name { get; set; }
    // }
}
