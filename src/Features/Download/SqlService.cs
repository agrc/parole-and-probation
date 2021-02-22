using System.Collections.Generic;
using System.Linq;

namespace parole.Features {
    public static class SqlService {
        public static string FormatSql(MapFilterState filters) {
            var sqlParts = new List<string>();

            AddAgent(ref sqlParts, filters.Agents);
            AddDate(ref sqlParts, filters.Date);
            AddLocation(ref sqlParts, filters.Location);
            AddOffender(ref sqlParts, filters.Offender);
            AddOther(ref sqlParts, filters.Other);

            return string.Join(" AND ", sqlParts);
        }

        private static void AddAgent(ref List<string> sqlParts, IEnumerable<int> data) {
            if (!data.Any()) {
                return;
            }

            sqlParts.Add($"agent_id in ({string.Join(',', data)})");
        }
        private static void AddDate(ref List<string> sqlParts, DateRecord data) {
            if (!string.IsNullOrEmpty(data.Compliant)) {
                var compliance = "0";
                if (data.Compliant == "in") {
                    compliance = "1";
                }

                sqlParts.Add($"in_compliance={compliance}");
            }

            if (data.Attempt.HasValue) {
                sqlParts.Add($"last_attempted_field_contact>{data.Attempt.Value}");
            }

            if (data.Office.HasValue) {
                sqlParts.Add($"last_office_contact>{data.Office.Value}");
            }

            if (data.Success.HasValue) {
                sqlParts.Add($"last_successful_field_contact>{data.Success.Value}");
            }
        }
        private static void AddLocation(ref List<string> sqlParts, LocationRecord data) {
            if (data.Region.Any()) {
                sqlParts.Add($"region in ({string.Join(',', data.Region)})");
            }

            if (!string.IsNullOrEmpty(data.Zip)) {
                sqlParts.Add($"zip={data.Zip}");
            }

            if (!string.IsNullOrEmpty(data.City)) {
                sqlParts.Add($"city='{data.City.ToUpper()}'");
            }

            if (data.Counties.Any()) {
                sqlParts.Add($"county in ({string.Join(',', data.Counties.Select(item => $"'{item.ToUpper()}'"))})");
            }
        }
        private static void AddOffender(ref List<string> sqlParts, OffenderRecord data) {
            if (!string.IsNullOrEmpty(data.Gender)) {
                sqlParts.Add($"gender={data.Gender[0]}");
            }
            if (!string.IsNullOrEmpty(data.Name)) {
                sqlParts.Add($"offender='{data.Name}'");
            }
            if (!string.IsNullOrEmpty(data.Number)) {
                sqlParts.Add($"offender_id={data.Number}");
            }
            if (!string.IsNullOrEmpty(data.Tel)) {
                sqlParts.Add($"offender_phone='{data.Tel}'");
            }
            if (!string.IsNullOrEmpty(data.Employer)) {
                sqlParts.Add($"employer='{data.Employer}");
            }
        }
        private static void AddOther(ref List<string> sqlParts, OtherRecord data) {
            if (!string.IsNullOrEmpty(data.Warrant)) {
                var warrant = "0";
                if (data.Warrant == "Yes") {
                    warrant = "1";
                }

                sqlParts.Add($"active_warrant={warrant}");
            }

            if (!string.IsNullOrEmpty(data.Status)) {
                sqlParts.Add($"legal_status='{data.Status.ToUpper()}'");
            }

            if (data.Supervision.Any()) {
                sqlParts.Add(string.Join(" AND ", data.Supervision.Select(item => $"{item}=1")));
            }

            if (data.Gang.Any()) {
                sqlParts.Add($"gang_type in ({string.Join(",", data.Gang.Select(item => $"'{item.ToUpper()}'"))})");
            }

            if (data.Offense.Any()) {
                sqlParts.Add($"offense_code in ({string.Join(",", data.Offense.Select(item => $"'{item}'"))})");
            }

            if (data.Sos.Any()) {
                var query = new List<string> { "standard_of_supervision is null" };

                query.Add($"standard_of_supervision in ({string.Join(',', data.Sos.Where(item => item != "no std").Select(item => $"'{item.ToUpper()}'"))})");

                sqlParts.Add(string.Join(" OR ", query));
            }
        }
    }
}
