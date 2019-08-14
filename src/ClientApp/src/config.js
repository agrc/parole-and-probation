module.exports = {
  mappingConfig: {
    MIN_DESKTOP_WIDTH: 768,
    WEB_MERCATOR_WKID: 3857,
    MARKER_FILL_COLOR: [130, 65, 47, 0.5],
    MARKER_OUTLINE_COLOR: [230, 126, 21, 0.7],
  }, oidcConfig: {
    authority: 'https://login.dts.utah.gov/sso/oauth2/',
    client_id: 'synange-feoffor-673742',
    redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}${process.env.REACT_APP_BASENAME}/callback`,
    response_type: 'token id_token',
    scope: 'openid profile app:public',
    filterProtocolClaims: true,
    loadUserInfo: true
  }, fields: {
    'offender_id': {
      identify: false,
      filter: true
    },
    'gender': {
      identify: false,
      filter: true
    },
    'region': {
      identify: false,
      filter: true
    },
    'agency': {
      identify: true,
      filter: false
    },
    'supervisor_id': {
      identify: false,
      filter: false
    },
    'supervisor_name': {
      identify: false,
      filter: false
    },
    'agent_name': {
      identify: true,
      filter: false
    },
    'offender': {
      identify: false,
      filter: true
    },
    'date_of_birth': {
      identify: true,
      filter: false
    },
    'race': {
      identify: true,
      filter: false
    },
    'legal_status': {
      identify: false,
      filter: true
    },
    'legal_status_code': {
      identify: false,
      filter: false
    },
    'legal_status_description': {
      identify: false,
      filter: false
    },
    'supervision_start_date': {
      identify: true,
      filter: false
    },
    'offender_location': {
      identify: false,
      filter: false
    },
    'address_start_date': {
      identify: true,
      filter: false
    },
    'address': {
      identify: true,
      filter: false
    },
    'unit': {
      identify: true,
      filter: false
    },
    'city': {
      identify: false,
      filter: true
    },
    'state': {
      identify: true,
      filter: false
    },
    'zip': {
      identify: false,
      filter: true
    },
    'address_type_code': {
      identify: true,
      filter: false
    },
    'address_type': {
      identify: true,
      filter: false
    },
    'x': {
      identify: false,
      filter: false
    },
    'y': {
      identify: false,
      filter: false
    },
    'score': {
      identify: false,
      filter: false
    },
    'offender_phone': {
      identify: false,
      filter: true
    },
    'standard_of_supervision': {
      identify: false,
      filter: true
    },
    'special_supervision': {
      identify: true,
      filter: false
    },
    'last_office_contact': {
      identify: false,
      filter: true
    },
    'last_successful_field_contact': {
      identify: false,
      filter: true
    },
    'last_field_contact': {
      identify: false,
      filter: true
    },
    'field_contact_result': {
      identify: true,
      filter: false
    },
    'offense_code': {
      identify: true,
      filter: false
    },
    'primary_offense': {
      identify: true,
      filter: false
    },
    'crime_degree': {
      identify: false,
      filter: true
    },
    'offense_description': {
      identify: true,
      filter: false
    },
    'earned_compliance_credit': {
      identify: true,
      filter: false
    },
    'active_warrant': {
      identify: false,
      filter: true
    },
    'gang_id': {
      identify: true,
      filter: false
    },
    'gang_name': {
      identify: true,
      filter: false
    },
    'gang_type_id': {
      identify: true,
      filter: false
    },
    'gang_type': {
      identify: false,
      filter: true
    },
    'agent_id': {
      identify: false,
      filter: false
    },
    'last_attempted_field_contact': {
      identify: false,
      filter: true
    },
    'in_compliance': {
      identify: false,
      filter: true
    },
    'alerts': {
      identify: true,
      filter: false
    },
    'cautions': {
      identify: true,
      filter: false
    },
    'employer': {
      identify: false,
      filter: true
    },
    'employer_address': {
      identify: true,
      filter: false
    },
    'employer_phone': {
      identify: true,
      filter: false
    }
  }
}
