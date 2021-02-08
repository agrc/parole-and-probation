using parole.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using Serilog;
using Microsoft.Data.SqlClient;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace parole.Features {
    public class ExportService {
        private readonly ILogger _log;
        private readonly string connectionString;

        public ExportService(ILogger log, IConfiguration config) {
            _log = log;
            connectionString = config.GetConnectionString("DefaultConnection");
        }

        public async Task<IEnumerable<Schema>> GetRecords(CsvDownload model) {
            _log.Information("Invoking CSV export");

            using var session = new SqlConnection(connectionString);
            try {
                session.Open();
            } catch (SqlException) {
                return Array.Empty<Schema>();
            }

            var records = await session.QueryAsync<Schema>("SELECT * FROM DOCOAdmin.offenders WHERE id IN @ids", new {
                ids = model.Offenders
            });

            _log.Debug("Converting to csv {records}", records);

            return records;
        }
    }
}
