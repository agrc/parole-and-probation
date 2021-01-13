import { storiesOf } from '@storybook/react';
import fetchMock from 'fetch-mock';
import React from 'react';
import { UserData } from 'react-oidc';
import '../Sidebar/Sidebar.css';
import { GangInformation, IdentifyContainer, IdentifyInformation, OffenderAlerts, OffenderContactInfo, OffenderQuickLook, OtherInformation, PrimaryOffense, RecentVisitation, SpecialSupervision } from './Identify';


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
      'last_office_contact': 25,
      'last_successful_field_contact': 322,
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
      'earned_compliance_credit': 1535760000000,
      'employer_address': 'WEST HIGHWAY 40, ROOSEVELT UT 84066',
      'employer_phone': '435-722-5650',
      'gang_id': null,
      'gang_name': 'West Side Players',
      'gang_type_id': null,
      'offense_code': 'J',
      'offense_description': null,
      'primary_offense': null,
      'race': 'native american/alaskan',
      'ccc': 0,
      'comp': 0,
      'dep': 0,
      'dora': 0,
      'drugct': 0,
      'ecr': 0,
      'em': 0,
      'fosi': 0,
      'fug': 0,
      'gps': 0,
      'igint': 0,
      'incar': 1,
      'mio': 1,
      'pvp': 0,
      'resid': 0,
      'so': 0,
      'soa': 1,
      'sob': 1,
      'soc': 1,
      'state': 'UT',
      'supervision_start_date': 1471327200000,
      'unit': '#8',
      'crime_degree': 'MA',
      'offender_phone': '801-888-0101'
    }
  }]
});

storiesOf('Identify/Integration', module)
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

storiesOf('Identify/Offender quick look', module)
  .add('normal', () => (
    <OffenderQuickLook
      age={412153200000}
      gender="M"
      standard_of_supervision="LOW"
      legal_status="PROBATION"
      active_warrant={0}
      offender="Last name, middle first"
      race={"WHITE"}
      id={999999}
      agent="Agent Orange"
    />
  ))
  .add('no sos', () => (
    <OffenderQuickLook
      age={412153200000}
      gender="M"
      legal_status="PROBATION"
      active_warrant={0}
      offender="Last name, middle first"
      race={null}
      id={999999}
      agent="Agent Orange"
    />
  ))
  .add('active warrant', () => (
    <OffenderQuickLook
      age={412153200000}
      gender="M"
      legal_status="PROBATION"
      active_warrant={1}
      offender="Last name, middle first"
      race={null}
      id={999999}
      agent="Agent Orange"
    />
  ));

storiesOf('Identify/Offender Alerts', module)
  .add('normal', () => (
    <OffenderAlerts
      cautions="cautions"
      alerts="alerts"
    />
  ))
  .add('empty cautions', () => (
    <OffenderAlerts
      cautions=""
      alerts="alerts"
    />
  ))
  .add('empty alerts', () => (
    <OffenderAlerts
      cautions="cautions"
      alerts={null}
    />
  ))
  .add('all empty', () => (
    <OffenderAlerts
      cautions={null}
      alerts={null}
    />
  ));

storiesOf('Identify/Recent Visitation', module)
  .add('normal', () => (
    <RecentVisitation
      office={10}
      successful={1}
      attempted={15}
    />
  ))
  .add('empty office', () => (
    <RecentVisitation
      office=""
      successful={1}
      attempted={15}
    />
  ))
  .add('empty success', () => (
    <RecentVisitation
      office={10}
      successful={null}
      attempted={15}
    />
  ))
  .add('empty attempted', () => (
    <RecentVisitation
      office={10}
      successful={1}
      attempted={null}
    />
  ));

storiesOf('Identify/Special Supervision', module)
  .add('normal', () => (
    <SpecialSupervision>{{
      address: '1405 Washington Blvd',
      address_start_date: 1535760000000,
      address_type: '1st PHYSICAL',
      agent_name: 'Steve Gourley',
      alerts: 'mean dog',
      cautions: 'lies a lot and has a concealed carry license',
      date_of_birth: 648950400000,
      earned_compliance_credit: 1535760000000,
      employer_address: 'WEST HIGHWAY 40, ROOSEVELT UT 84066',
      employer_phone: '435-722-5650',
      gang_id: null,
      gang_name: 'West Side Players',
      gang_type_id: null,
      offense_code: 'J',
      offense_description: null,
      primary_offense: null,
      race: 'native american/alaskan',
      ccc: 0,
      comp: 0,
      dep: 0,
      dora: 0,
      drugct: 0,
      ecr: 0,
      em: 0,
      fosi: 0,
      fug: 0,
      gps: 0,
      igint: 0,
      incar: 1,
      mio: 1,
      pvp: 0,
      resid: 0,
      so: 0,
      soa: 1,
      sob: 1,
      soc: 1,
      state: 'UT',
      supervision_start_date: 1471327200000,
      unit: '#8',
      crime_degree: 'MA',
      offender_phone: '801-888-0101'
    }}</SpecialSupervision>
  ))
  .add('single', () => (
    <SpecialSupervision>{{
      address: '1405 Washington Blvd',
      address_start_date: 1535760000000,
      address_type: '1st PHYSICAL',
      agent_name: 'Steve Gourley',
      alerts: 'mean dog',
      cautions: 'lies a lot and has a concealed carry license',
      date_of_birth: 648950400000,
      earned_compliance_credit: 1535760000000,
      employer_address: 'WEST HIGHWAY 40, ROOSEVELT UT 84066',
      employer_phone: '435-722-5650',
      gang_id: null,
      gang_name: 'West Side Players',
      gang_type_id: null,
      offense_code: 'J',
      offense_description: null,
      primary_offense: null,
      race: 'native american/alaskan',
      ccc: 0,
      comp: 0,
      dep: 0,
      dora: 0,
      drugct: 0,
      ecr: 0,
      em: 0,
      fosi: 0,
      fug: 0,
      gps: 0,
      igint: 0,
      incar: 0,
      mio: 0,
      pvp: 0,
      resid: 0,
      so: 0,
      soa: 0,
      sob: 0,
      soc: 1,
      state: 'UT',
      supervision_start_date: 1471327200000,
      unit: '#8',
      crime_degree: 'MA',
      offender_phone: '801-888-0101'
    }}</SpecialSupervision>
  ))
  .add('empty', () => (
    <SpecialSupervision>{{
      address: '1405 Washington Blvd',
      address_start_date: 1535760000000,
      address_type: '1st PHYSICAL',
      agent_name: 'Steve Gourley',
      alerts: 'mean dog',
      cautions: 'lies a lot and has a concealed carry license',
      date_of_birth: 648950400000,
      earned_compliance_credit: 1535760000000,
      employer_address: 'WEST HIGHWAY 40, ROOSEVELT UT 84066',
      employer_phone: '435-722-5650',
      gang_id: null,
      gang_name: 'West Side Players',
      gang_type_id: null,
      offense_code: 'J',
      offense_description: null,
      primary_offense: null,
      race: 'native american/alaskan',
      ccc: 0,
      comp: 0,
      dep: 0,
      dora: 0,
      drugct: 0,
      ecr: 0,
      em: 0,
      fosi: 0,
      fug: 0,
      gps: 0,
      igint: 0,
      incar: 0,
      mio: 0,
      pvp: 0,
      resid: 0,
      so: 0,
      soa: 0,
      sob: 0,
      soc: 0,
      state: 'UT',
      supervision_start_date: 1471327200000,
      unit: '#8',
      crime_degree: 'MA',
      offender_phone: '801-888-0101'
    }}</SpecialSupervision>
  ));

storiesOf('Identify/Primary Offense', module)
  .add('normal', () => (
    <PrimaryOffense
      primary_offense="PERSON"
      degree="F3"
      description="i did something very bad"
    />
  ))
  .add('empty offense/degree', () => (
    <PrimaryOffense
      primary_offense=""
      degree=""
      description="hello"
    />
  ))
  .add('null and undefined', () => (
    <PrimaryOffense
      primary_offense="ROBBERY"
      degree={undefined}
      description={null}
    />
  ));

storiesOf('Identify/Gang Information', module)
  .add('normal', () => (
    <GangInformation
      gang="CRIPS"
      set="loco yoco"
    />
  ))
  .add('empty', () => (
    <GangInformation
      gang={null}
      set={undefined}
    />
  ))
  .add('null gang', () => (
    <GangInformation
      gang={null}
      set="YOLO"
    />
  ));

storiesOf('Identify/Other Information', module)
  .add('normal', () => (
    <OtherInformation
      supervision_start_date={1535760000000}
      ecc={1535760000000}
    />
  ))
  .add('empty', () => (
    <OtherInformation
      supervision_start_date={null}
      ecc={null}
    />
  ));

storiesOf('Identify/Contact Information', module)
  .add('normal', () => (
    <OffenderContactInfo
      phone={'801-111-1111'}
      address={'123 sesame street'}
      unit={'#1'}
      city={'salt lake city'}
      zip={84101}
      type={"1st Primary"}
      since={1535760000000}
      employer={'ACME'}
      employer_address={'123 Street Drive'}
      employer_phone={'801-222-2222'}
    />
  ))
  .add('empty phones', () => (
    <OffenderContactInfo
      phone={null}
      address={'123 sesame street'}
      unit={'#1'}
      city={'salt lake city'}
      zip={84101}
      type={"1st Primary"}
      since={1535760000000}
      employer={'ACME'}
      employer_address={'123 Street Drive'}
    />
  ))
  .add('address.empty address type', () => (
    <OffenderContactInfo
      phone={'801-111-1111'}
      address={'123 sesame street'}
      unit={'#1'}
      city={'salt lake city'}
      zip={84101}
      since={1535760000000}
      employer={'ACME'}
      employer_address={'123 Street Drive'}
      employer_phone={'801-222-2222'}
    />
  ))
  .add('address.no unit', () => (
    <OffenderContactInfo
      phone={'801-111-1111'}
      address={'123 sesame street'}
      city={'salt lake city'}
      zip={84101}
      type={"1st Primary"}
      since={1535760000000}
      employer={'ACME'}
      employer_address={'123 Street Drive'}
      employer_phone={'801-222-2222'}
    />
  ))
  .add('address.empty since', () => (
    <OffenderContactInfo
      phone={'801-111-1111'}
      address={'123 sesame street'}
      city={'salt lake city'}
      zip={84101}
      type={"1st Primary"}
      since={null}
      employer={'ACME'}
      employer_address={'123 Street Drive'}
      employer_phone={'801-222-2222'}
    />
  ))
  .add('employer.empty employer', () => (
    <OffenderContactInfo
      phone={'801-111-1111'}
      address={'123 sesame street'}
      city={'salt lake city'}
      zip={84101}
      type={"1st Primary"}
      employer_address={'123 Street Drive'}
      employer_phone={'801-222-2222'}
    />
  ))
  .add('employer.empty employer address', () => (
    <OffenderContactInfo
      phone={'801-111-1111'}
      address={'123 sesame street'}
      city={'salt lake city'}
      zip={84101}
      type={"1st Primary"}
      since={null}
      employer={'ACME'}
      employer_phone={'801-222-2222'}
    />
  ));
