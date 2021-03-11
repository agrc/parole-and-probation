module.exports = {
  mappingConfig: {
    MIN_DESKTOP_WIDTH: 768,
    WEB_MERCATOR_WKID: 3857,
  },
  fields: {
    offender_id: {
      identify: false,
      filter: true,
      type: 'oid',
    },
    gender: {
      identify: false,
      filter: true,
      type: 'string',
    },
    region: {
      identify: false,
      filter: true,
      type: 'integer',
    },
    agency: {
      identify: false,
      filter: false,
    },
    supervisor_id: {
      identify: false,
      filter: false,
    },
    supervisor_name: {
      identify: false,
      filter: false,
    },
    agent_name: {
      identify: true,
      filter: false,
    },
    offender: {
      identify: false,
      filter: true,
      type: 'string',
    },
    date_of_birth: {
      identify: true,
      filter: false,
    },
    race: {
      identify: true,
      filter: false,
    },
    legal_status: {
      identify: false,
      filter: true,
      type: 'string',
    },
    legal_status_code: {
      identify: false,
      filter: false,
    },
    legal_status_description: {
      identify: false,
      filter: false,
    },
    supervision_start_date: {
      identify: true,
      filter: false,
    },
    offender_location: {
      identify: false,
      filter: false,
    },
    address_start_date: {
      identify: true,
      filter: false,
    },
    address: {
      identify: true,
      filter: false,
    },
    unit: {
      identify: true,
      filter: false,
    },
    city: {
      identify: false,
      filter: true,
      type: 'string',
    },
    state: {
      identify: true,
      filter: false,
    },
    zip: {
      identify: false,
      filter: true,
      type: 'integer',
    },
    address_type_code: {
      identify: false,
      filter: false,
    },
    address_type: {
      identify: true,
      filter: false,
    },
    x: {
      identify: false,
      filter: false,
    },
    y: {
      identify: false,
      filter: false,
    },
    score: {
      identify: false,
      filter: false,
    },
    offender_phone: {
      identify: false,
      filter: true,
      type: 'string',
    },
    standard_of_supervision: {
      identify: false,
      filter: true,
      type: 'string',
    },
    ccc: {
      identify: true,
      filter: false,
      ss: true,
    },
    comp: {
      identify: true,
      filter: false,
      ss: true,
    },
    dep: {
      identify: true,
      filter: false,
      ss: true,
    },
    dora: {
      identify: true,
      filter: false,
      ss: true,
    },
    drugct: {
      identify: true,
      filter: false,
      ss: true,
    },
    ecr: {
      identify: true,
      filter: false,
      ss: true,
    },
    em: {
      identify: true,
      filter: false,
      ss: true,
    },
    fosi: {
      identify: true,
      filter: false,
      ss: true,
    },
    fug: {
      identify: true,
      filter: false,
      ss: true,
    },
    gps: {
      identify: true,
      filter: false,
      ss: true,
    },
    igint: {
      identify: true,
      filter: false,
      ss: true,
    },
    incar: {
      identify: true,
      filter: false,
      ss: true,
    },
    mio: {
      identify: true,
      filter: false,
      ss: true,
    },
    pvp: {
      identify: true,
      filter: false,
      ss: true,
    },
    resid: {
      identify: true,
      filter: false,
      ss: true,
    },
    so: {
      identify: true,
      filter: false,
      ss: true,
    },
    soa: {
      identify: true,
      filter: false,
      ss: true,
    },
    sob: {
      identify: true,
      filter: false,
      ss: true,
    },
    soc: {
      identify: true,
      filter: false,
      ss: true,
    },
    last_office_contact: {
      identify: false,
      filter: true,
      type: 'integer',
    },
    last_successful_field_contact: {
      identify: false,
      filter: true,
      type: 'integer',
    },
    last_field_contact: {
      identify: false,
      filter: false,
    },
    field_contact_result: {
      identify: false,
      filter: false,
    },
    offense_code: {
      identify: true,
      filter: false,
    },
    primary_offense: {
      identify: true,
      filter: false,
    },
    crime_degree: {
      identify: false,
      filter: true,
      type: 'string',
    },
    offense_description: {
      identify: true,
      filter: false,
    },
    earned_compliance_credit: {
      identify: true,
      filter: false,
    },
    active_warrant: {
      identify: false,
      filter: true,
      type: 'integer',
    },
    gang_id: {
      identify: true,
      filter: false,
    },
    gang_name: {
      identify: true,
      filter: false,
    },
    gang_type_id: {
      identify: true,
      filter: false,
    },
    gang_type: {
      identify: false,
      filter: true,
      type: 'string',
    },
    agent_id: {
      identify: false,
      filter: false,
    },
    last_attempted_field_contact: {
      identify: false,
      filter: true,
      type: 'integer',
    },
    in_compliance: {
      identify: false,
      filter: true,
      type: 'integer',
    },
    alerts: {
      identify: true,
      filter: false,
    },
    cautions: {
      identify: true,
      filter: false,
    },
    employer: {
      identify: false,
      filter: true,
      type: 'string',
    },
    employer_address: {
      identify: true,
      filter: false,
    },
    employer_phone: {
      identify: true,
      filter: false,
    },
    county: {
      identify: false,
      filter: true,
      type: 'string',
    },
  },
};
