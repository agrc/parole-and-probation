using System;

namespace app.Models {

    public class Schema {
        public int offender_id { get; set; }
        public string gender { get; set; }
        public int region { get; set; }
        public string agency { get; set; }
        public string supervisor_id { get; set; }
        public string supervisor_name { get; set; }
        public string agent_name { get; set; }
        public string offender { get; set; }
        public DateTime date_of_birth { get; set; }
        public string race { get; set; }
        public string legal_status { get; set; }
        public string legal_status_code { get; set; }
        public string legal_status_description { get; set; }
        public DateTime supervision_start_date { get; set; }
        public string offender_location { get; set; }
        public DateTime address_start_date { get; set; }
        public string address { get; set; }
        public string unit { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public int zip { get; set; }
        public string address_type_code { get; set; }
        public string address_type { get; set; }
        public decimal x { get; set; }
        public decimal y { get; set; }
        public double score { get; set; }
        public string offender_phone { get; set; }
        public string standard_of_supervision { get; set; }
        public string special_supervision { get; set; }
        public int last_office_contact { get; set; }
        public int last_successful_field_contact { get; set; }
        public DateTime last_field_contact { get; set; }
        public string field_contact_result { get; set; }
        public string offense_code { get; set; }
        public string primary_offense { get; set; }
        public string crime_degree { get; set; }
        public string offense_description { get; set; }
        public DateTime earned_compliance_credit { get; set; }
        public bool active_warrant { get; set; }
        public int gang_id { get; set; }
        public string gang_name { get; set; }
        public int gang_type_id { get; set; }
        public string gang_type { get; set; }
        public int agent_id { get; set; }
        public int last_attempted_field_contact { get; set; }
        public bool in_compliance { get; set; }
        public string alerts { get; set; }
        public string cautions { get; set; }
        public string employer { get; set; }
        public string employer_address { get; set; }
        public string employer_phone { get; set; }
        public string county { get; set; }
    }
}
