using Dapper;
using Microsoft.Extensions.Configuration;
using Serilog;
using Microsoft.Data.SqlClient;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using System.Linq;

namespace parole.Features {
    public class ExportService {
        private readonly ILogger _log;
        private readonly string connectionString;

        public ExportService(ILogger log, IConfiguration config) {
            _log = log;
            connectionString = config.GetConnectionString("DefaultConnection");
        }

        public async Task<IEnumerable<Schema>> GetRecordsAsync(MapFilterState? model) {
            _log.Information("Invoking CSV export");

            if (model is null) {
                return Array.Empty<Schema>();
            }

            var whereClause = SqlService.FormatSql(model);

            using var session = new SqlConnection(connectionString);
            try {
                session.Open();
            } catch (SqlException) {
                _log.Warning("Sql Exception connecting to the database");

                return Array.Empty<Schema>();
            }

            var records = Enumerable.Empty<Schema>();

            try {
                records = await session.QueryAsync<Schema>($"SELECT * FROM DOCOAdmin.offenders WHERE {whereClause}");
            } catch (Exception ex) {
                _log.Fatal(ex, "query failure");
            }

            _log.Debug("Converting records to csv");

            return records;
        }
    }
    public class MapFilterState {
        public DateRecord? Date { get; set; }
        public LocationRecord? Location { get; set; }
        public OffenderRecord? Offender { get; set; }
        public OtherRecord? Other { get; set; }
        public IEnumerable<int>? Agents { get; set; }
    }
    public record DateRecord(string Compliant, int? Attempt, int? Office, int? Success);
    public record LocationRecord(IEnumerable<int> Region, string Zip, string City, IEnumerable<string> Counties);
    public record OffenderRecord(string Gender, string Name, string Number, string Tel, string Employer);
    public record OtherRecord(string Warrant, string Status, IEnumerable<string> Sos, IEnumerable<string> Supervision, IEnumerable<string> Gang, IEnumerable<string> Offense);

    public class Schema {
        public int offender_id { get; set; }
        public string gender { get; set; } = default!;
        public int region { get; set; }
        public string agency { get; set; } = default!;
        public string supervisor_id { get; set; } = default!;
        public string supervisor_name { get; set; } = default!;
        public string agent_name { get; set; } = default!;
        public string offender { get; set; } = default!;
        public DateTime date_of_birth { get; set; }
        public string race { get; set; } = default!;
        public string legal_status { get; set; } = default!;
        public string legal_status_code { get; set; } = default!;
        public string legal_status_description { get; set; } = default!;
        public DateTime supervision_start_date { get; set; }
        public string offender_location { get; set; } = default!;
        public DateTime address_start_date { get; set; }
        public string address { get; set; } = default!;
        public string unit { get; set; } = default!;
        public string city { get; set; } = default!;
        public string state { get; set; } = default!;
        public int zip { get; set; }
        public string address_type_code { get; set; } = default!;
        public string address_type { get; set; } = default!;
        public decimal x { get; set; }
        public decimal y { get; set; }
        public double score { get; set; }
        public string offender_phone { get; set; } = default!;
        public string standard_of_supervision { get; set; } = default!;
        public int last_office_contact { get; set; }
        public int last_successful_field_contact { get; set; }
        public DateTime last_field_contact { get; set; }
        public string field_contact_result { get; set; } = default!;
        public string offense_code { get; set; } = default!;
        public string primary_offense { get; set; } = default!;
        public string crime_degree { get; set; } = default!;
        public string offense_description { get; set; } = default!;
        public DateTime earned_compliance_credit { get; set; }
        public bool active_warrant { get; set; }
        public int gang_id { get; set; }
        public string gang_name { get; set; } = default!;
        public int gang_type_id { get; set; }
        public string gang_type { get; set; } = default!;
        public int agent_id { get; set; }
        public int last_attempted_field_contact { get; set; }
        public bool in_compliance { get; set; }
        public string alerts { get; set; } = default!;
        public string cautions { get; set; } = default!;
        public string employer { get; set; } = default!;
        public string employer_address { get; set; } = default!;
        public string employer_phone { get; set; } = default!;
        public string county { get; set; } = default!;
        public bool ccc { get; set; }
        public bool comp { get; set; }
        public bool dep { get; set; }
        public bool dora { get; set; }
        public bool drugct { get; set; }
        public bool ecr { get; set; }
        public bool em { get; set; }
        public bool fosi { get; set; }
        public bool fug { get; set; }
        public bool gps { get; set; }
        public bool igint { get; set; }
        public bool incar { get; set; }
        public bool mio { get; set; }
        public bool pvp { get; set; }
        public bool resid { get; set; }
        public bool so { get; set; }
        public bool soa { get; set; }
        public bool sob { get; set; }
        public bool soc { get; set; }
    }
}
