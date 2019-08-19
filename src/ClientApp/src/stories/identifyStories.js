import React from 'react';
import { storiesOf } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { IdentifyInformation, IdentifyContainer } from '../components/Identify/Identify';
import { UserData } from 'react-oidc';

import '../components/Sidebar/Sidebar.css';

const features = [
  {
    'geometry': null,
    'symbol': null,
    'attributes': {
      'active_warrant': 0,
      'city': 'OGDEN',
      'crime_degree': 'F3',
      'employer': 'MUSCLE MAN',
      'gang_type': 'NORTENOS',
      'gender': 'M',
      'last_attempted_field_contact': 10,
      'last_field_contact': 1521676800000,
      'last_office_contact': 25,
      'last_successful_field_contact': 25,
      'legal_status': 'PROBATION',
      'offender': 'BRAVO, MIKE SMITH',
      'offender_id': 10,
      'offender_phone': '867-5309',
      'region': 1,
      'standard_of_supervision': 'MOD'
    },
    'popupTemplate': null
  }, {
    'geometry': null,
    'symbol': null,
    'attributes': {
      'active_warrant': 1,
      'city': 'OGDEN',
      'crime_degree': 'F3',
      'employer': null,
      'gang_type': null,
      'gender': 'M',
      'last_attempted_field_contact': 10,
      'last_field_contact': 1521676800000,
      'last_office_contact': 25,
      'last_successful_field_contact': 25,
      'legal_status': 'PROBATION',
      'offender': 'ALPHA, SUSAN SMITH',
      'offender_id': 11,
      'offender_phone': '867-5309',
      'region': 1,
      'standard_of_supervision': 'MOD'
    },
    'popupTemplate': null
  }, {
    'geometry': null,
    'symbol': null,
    'attributes': {
      'active_warrant': 1,
      'city': 'OGDEN',
      'crime_degree': 'F3',
      'employer': null,
      'gang_type': null,
      'gender': 'M',
      'last_attempted_field_contact': 10,
      'last_field_contact': 1521676800000,
      'last_office_contact': 25,
      'last_successful_field_contact': 25,
      'legal_status': 'PROBATION',
      'offender': 'ALPHA, SUSAN SMITH',
      'offender_id': 12,
      'offender_phone': '867-5309',
      'region': 1,
      'standard_of_supervision': 'MOD'
    },
    'popupTemplate': null
  }, {
    'geometry': null,
    'symbol': null,
    'attributes': {
      'active_warrant': 1,
      'city': 'OGDEN',
      'crime_degree': 'F3',
      'employer': null,
      'gang_type': null,
      'gender': 'M',
      'last_attempted_field_contact': 10,
      'last_field_contact': 1521676800000,
      'last_office_contact': 25,
      'last_successful_field_contact': 25,
      'legal_status': 'PROBATION',
      'offender': 'ALPHA, SUSAN SMITH',
      'offender_id': 13,
      'offender_phone': '867-5309',
      'region': 1,
      'standard_of_supervision': 'MOD'
    },
    'popupTemplate': null
  }, {
    'geometry': null,
    'symbol': null,
    'attributes': {
      'active_warrant': 1,
      'city': 'OGDEN',
      'crime_degree': 'F3',
      'employer': null,
      'gang_type': null,
      'gender': 'M',
      'last_attempted_field_contact': 10,
      'last_field_contact': 1521676800000,
      'last_office_contact': 25,
      'last_successful_field_contact': 25,
      'legal_status': 'PROBATION',
      'offender': 'ALPHA, SUSAN SMITH',
      'offender_id': 14,
      'offender_phone': '867-5309',
      'region': 1,
      'standard_of_supervision': 'MOD'
    },
    'popupTemplate': null
  }, {
    'geometry': null,
    'symbol': null,
    'attributes': {
      'active_warrant': 1,
      'city': 'OGDEN',
      'crime_degree': 'F3',
      'employer': null,
      'gang_type': null,
      'gender': 'M',
      'last_attempted_field_contact': 10,
      'last_field_contact': 1521676800000,
      'last_office_contact': 25,
      'last_successful_field_contact': 25,
      'legal_status': 'PROBATION',
      'offender': 'ALPHA, SUSAN SMITH',
      'offender_id': 15,
      'offender_phone': '867-5309',
      'region': 1,
      'standard_of_supervision': 'MOD'
    },
    'popupTemplate': null
  }];

fetchMock.config.overwriteRoutes = true;
fetchMock.mock('path:/mapserver/0/query', {
  'features': [{
    'attributes': {
      'address': '1405 Washington Blvd',
      'address_start_date': 1535760000000,
      'address_type': '1st PHYSICAL',
      'agent_name': 'Steve Gourley',
      'alerts': 'mean dog',
      'cautions': 'lies a lot and has a concealed carry license',
      'date_of_birth': 648950400000,
      'earned_compliance_credit': 1587794400000,
      'employer_address': 'WEST HIGHWAY 40, ROOSEVELT UT 84066',
      'employer_phone': '435-722-5650',
      'field_contact_result': 'SUCCESSFUL',
      'gang_id': null,
      'gang_name': 'West Side Players',
      'gang_type_id': null,
      'offense_code': 'J',
      'offense_description': 'DISTRIB/ARRANGE DIST CONT SUBSTANCE',
      'primary_offense': 'ALCOHOL & DRUG',
      'race': 'native american/alaskan',
      'special_supervision': 'INCAR,SO-A, MIO, SO-C, SO-B',
      'state': 'UT',
      'supervision_start_date': 1471327200000,
      'unit': '#8',
      'crime_degree': 'MA',
      'offender_phone': '801-888-0101'
    }
  }]
});

storiesOf('Identify', module)
  .addDecorator(story => (
    <IdentifyContainer>
      <UserData.Provider value={{
        user: {
          access_token: 'testing'
        }
      }}>
        {story()}
      </UserData.Provider>
    </IdentifyContainer>
  ))
  .add('no features', () => (
    <IdentifyInformation update={() => { }} features={[]} offender={false} index={0}></IdentifyInformation>
  ))
  .add('single feature', () => (
    <IdentifyInformation update={() => { }} features={features[0]} offender={features[0].attributes} index={0}></IdentifyInformation>
  ))
  .add('first of multiple', () => (
    <IdentifyInformation update={() => { }} features={features} offender={features[0].attributes} index={0}></IdentifyInformation>
  ))
  .add('middle of multiple', () => (
    <IdentifyInformation update={() => { }} features={features} offender={features[3].attributes} index={3}></IdentifyInformation>
  ))
  .add('last of multiple', () => (
    <IdentifyInformation update={() => { }} features={features} offender={features[5].attributes} index={5}></IdentifyInformation>
  ));
