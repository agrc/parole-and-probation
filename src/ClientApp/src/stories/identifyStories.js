import React from 'react';
import { storiesOf } from '@storybook/react';
import fetchMock from 'fetch-mock';
import 'bootstrap/dist/css/bootstrap.css';
import { IdentifyInformation, IdentifyContainer } from '../components/Identify/Identify';
import '../App.css';
import '../components/Sidebar/Sidebar.css';

const features = [
  {
    'geometry': null,
    'symbol': null,
    'attributes': {
      'active_warrant': 0,
      'address': '1405 Washington Blvd',
      'agent_name': 'Steve Gourley',
      'city': 'OGDEN',
      'employer': 'MUSCLE MAN MOVERS, 3607 WASHINGTON BLVD SUITE #1, OGDEN, 385-424-1589',
      'gang_name': null,
      'gender': 'M',
      'last_field_contact': 1521676800000,
      'last_office_contact': 1538697600000,
      'legal_status': 'PROBATION',
      'offender': 'REEF, MIKE SMITH',
      'offender_id': 62868,
      'standard_of_supervision': 'MOD',
      'supervision_start_date': 1496275200000,
      'unit': null,
      'zip': null
    },
    'popupTemplate': null
  }, {
    'geometry': null,
    'symbol': null,
    'attributes': {
      'active_warrant': 0,
      'address': '1400 Washington Blvd',
      'agent_name': 'Steve Gourley',
      'city': 'OGDEN',
      'employer': 'ATLAS VAN LINES, 1701 W. RIVERDALE RD, RIVERDALE, 801-825-2236',
      'field_contact_result': null,
      'gang_name': null,
      'gender': 'M',
      'last_field_contact': null,
      'last_office_contact': 1539216000000,
      'legal_status': 'PROBATION',
      'offender': 'HOG, TOM ALEXANDER',
      'offender_id': 238119,
      'standard_of_supervision': 'HI',
      'supervision_start_date': 1529971200000,
      'unit': '3',
      'zip': null
    },
    'popupTemplate': null
  }];

fetchMock.mock('path:/mapserver/0/query', 200, {
  features:
    [{
      attributes: {
        'date_of_birth': 648950400000,
        'cautions': 'lies a lot and has a concealed carry license',
        'alerts': 'mean dog',
        'special_supervision': 'SO, SO-A, SO-B, SO-C',
        'offense_description': 'POSSESSION OR USE OF A CONTROLLED SUBSTANCE',
        'crime_degree': 'MA',
        'address_type': '1st PHYSICAL',
        'field_contact_result': 'Successful',
        'offender_phone': '801-888-0101',
        'address_start_date': 1535760000000,
        'earned_compliance_credit': 1564531200000,
      }
    }]
});

storiesOf('Identify', module)
  .add('with basic template', () => (
    <IdentifyContainer>
      <IdentifyInformation fetch={fetchMock} features={features}></IdentifyInformation>
    </IdentifyContainer>
  ));
