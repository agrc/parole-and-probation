using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Serilog;

namespace parole.Features;

public class LookupService(ILogger log, IConfiguration config)
{
    private readonly ILogger _log = log;
    private readonly string? connectionString = config.GetConnectionString("DefaultConnection");

    public async Task<IEnumerable<AgentItem>> GetAgentsAsync()
    {
        using var session = new SqlConnection(connectionString);
        try
        {
            session.Open();
        }
        catch (SqlException ex)
        {
            _log.Fatal(ex, "Sql Exception connecting to the database");

            return [];
        }

        var records = Enumerable.Empty<AgentItem>();

        try
        {
            records = await session.QueryAsync<AgentItem>("SELECT agent_ein as id, value, agent_id, supervisor_id, supervisor FROM DOCOAdmin.agents");
        }
        catch (Exception ex)
        {
            _log.Fatal(ex, "query failure");
        }

        return records;
    }
}

public record AgentItem(string Id, string Value, string Agent_Id, string Supervisor_Id, string Supervisor);
