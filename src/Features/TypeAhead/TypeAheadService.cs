using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Serilog;

namespace parole.Features {
    public class TypeAheadService {
        private readonly string connectionString;
        private readonly ILogger _log;
        private readonly TokenValidationParameters _token;
        private readonly Dictionary<string, string> inputLookup = new() {
            { "name", "offender" },
            { "number", "offender_id" },
            { "phone", "offender_phone" },
            { "employer", "employer" }
        };

        public TypeAheadService(ILogger log, IConfiguration config, TokenValidationParameters token) {
            connectionString = config.GetConnectionString("DefaultConnection");
            _log = log;
            _token = token;
        }

        public async Task<TypeAheadResponse> Find(TypeAheadDescriptor descriptor) {
            _log.Debug("Finding matches for @{descriptor}", descriptor);

            if (!inputLookup.ContainsKey(descriptor.Input.ToLower())) {
                return new TypeAheadResponse(descriptor.RequestId, Array.Empty<string>());
            }

            var field = inputLookup[descriptor.Input.ToLower()];

            var selectAll = false;

            if (descriptor.Value.Length == 0) {
                selectAll = true;
            }

            string query;
            var data = Array.Empty<string>() as IEnumerable<string>;

            using var session = new SqlConnection(connectionString);
            try {
                session.Open();
            } catch (SqlException ex) {
                _log.Fatal("Error accessing database", ex);

                return new TypeAheadResponse(
                    descriptor.RequestId,
                    data
                );
            }

            if (selectAll) {
                query = $"SELECT DISTINCT TOP {descriptor.Limit} {field} FROM DOCOAdmin.offenders ORDER BY {field} ASC";

                if (!string.IsNullOrEmpty(descriptor.Filter)) {
                    query = $"SELECT DISTINCT TOP {descriptor.Limit} {field} FROM DOCOAdmin.offenders WHERE {descriptor.Filter} ORDER BY {field} ASC";
                }

                data = await session.QueryAsync<string>(query);

                return new TypeAheadResponse(
                    descriptor.RequestId,
                    data
                );
            }

            query = $"SELECT DISTINCT TOP {descriptor.Limit} {field} FROM DOCOAdmin.offenders WHERE {field} LIKE @value" +
                    $" ORDER BY {field} ASC";

            if (!string.IsNullOrEmpty(descriptor.Filter)) {
                query = $"SELECT DISTINCT TOP {descriptor.Limit} {field} FROM DOCOAdmin.offenders WHERE {field} LIKE @value" +
                        $" AND {descriptor.Filter} ORDER BY {field} ASC";
            }

            data = await session.QueryAsync<string>(query, new {
                value = $"%{descriptor.Value}%"
            });

            return new TypeAheadResponse(
                descriptor.RequestId,
                data
            );
        }
    }
}
