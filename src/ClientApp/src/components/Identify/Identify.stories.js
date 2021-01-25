import fetchMock from 'fetch-mock';
import * as React from 'react';
import { UserData } from 'react-oidc';
import '../Sidebar/Sidebar.css';
import { IdentifyContainer, IdentifyInformation } from './Identify';

const features = [
  {
    geometry: null,
    symbol: null,
    attributes: {
      active_warrant: 0,
      city: 'OGDEN',
      crime_degree: 'F3',
      employer: 'MUSCLE MAN',
      gang_type: 'NORTENOS',
      gender: 'M',
      last_attempted_field_contact: 10,
      last_office_contact: 25,
      last_successful_field_contact: 322,
      legal_status: 'PROBATION',
      offender: 'BRAVO, MIKE SMITH',
      offender_id: 10,
      offender_phone: '867-5309',
      region: 1,
      standard_of_supervision: 'MOD',
    },
    popupTemplate: null,
  },
  {
    geometry: null,
    symbol: null,
    attributes: {
      active_warrant: 1,
      city: 'OGDEN',
      crime_degree: 'F3',
      employer: null,
      gang_type: null,
      gender: 'M',
      last_attempted_field_contact: 10,
      last_office_contact: 25,
      last_successful_field_contact: 25,
      legal_status: 'PROBATION',
      offender: 'ALPHA, SUSAN SMITH',
      offender_id: 11,
      offender_phone: '867-5309',
      region: 1,
      standard_of_supervision: 'MOD',
    },
    popupTemplate: null,
  },
  {
    geometry: null,
    symbol: null,
    attributes: {
      active_warrant: 1,
      city: 'OGDEN',
      crime_degree: 'F3',
      employer: null,
      gang_type: null,
      gender: 'M',
      last_attempted_field_contact: 10,
      last_office_contact: 25,
      last_successful_field_contact: 25,
      legal_status: 'PROBATION',
      offender: 'ALPHA, SUSAN SMITH',
      offender_id: 12,
      offender_phone: '867-5309',
      region: 1,
      standard_of_supervision: 'MOD',
    },
    popupTemplate: null,
  },
  {
    geometry: null,
    symbol: null,
    attributes: {
      active_warrant: 1,
      city: 'OGDEN',
      crime_degree: 'F3',
      employer: null,
      gang_type: null,
      gender: 'M',
      last_attempted_field_contact: 10,
      last_office_contact: 25,
      last_successful_field_contact: 25,
      legal_status: 'PROBATION',
      offender: 'ALPHA, SUSAN SMITH',
      offender_id: 13,
      offender_phone: '867-5309',
      region: 1,
      standard_of_supervision: 'MOD',
    },
    popupTemplate: null,
  },
  {
    geometry: null,
    symbol: null,
    attributes: {
      active_warrant: 1,
      city: 'OGDEN',
      crime_degree: 'F3',
      employer: null,
      gang_type: null,
      gender: 'M',
      last_attempted_field_contact: 10,
      last_office_contact: 25,
      last_successful_field_contact: 25,
      legal_status: 'PROBATION',
      offender: 'ALPHA, SUSAN SMITH',
      offender_id: 14,
      offender_phone: '867-5309',
      region: 1,
      standard_of_supervision: 'MOD',
    },
    popupTemplate: null,
  },
  {
    geometry: null,
    symbol: null,
    attributes: {
      active_warrant: 1,
      city: 'OGDEN',
      crime_degree: 'F3',
      employer: null,
      gang_type: null,
      gender: 'M',
      last_attempted_field_contact: 10,
      last_office_contact: 25,
      last_successful_field_contact: 25,
      legal_status: 'PROBATION',
      offender: 'ALPHA, SUSAN SMITH',
      offender_id: 15,
      offender_phone: '867-5309',
      region: 1,
      standard_of_supervision: 'MOD',
    },
    popupTemplate: null,
  },
];

fetchMock.config.overwriteRoutes = true;
fetchMock.mock('path:/mapserver/0/query', {
  features: [
    {
      attributes: {
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
        offender_phone: '801-888-0101',
      },
    },
  ],
});

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Identify/Integration',
  decorators: [
    (Story) => (
      <IdentifyContainer>
        <UserData.Provider
          value={{
            user: {
              access_token: 'testing',
            },
          }}
        >
          {Story()}
        </UserData.Provider>
      </IdentifyContainer>
    ),
  ],
};

export const NoFeatures = () => (
  <IdentifyInformation update={() => {}} features={[]} offender={false} index={0}></IdentifyInformation>
);
export const SingleFeature = () => (
  <IdentifyInformation
    update={() => {}}
    features={features[0]}
    offender={features[0].attributes}
    index={0}
  ></IdentifyInformation>
);
export const FirstOfMultiple = () => (
  <IdentifyInformation
    update={() => {}}
    features={features}
    offender={features[0].attributes}
    index={0}
  ></IdentifyInformation>
);
export const MiddleOfMultiple = () => (
  <IdentifyInformation
    update={() => {}}
    features={features}
    offender={features[3].attributes}
    index={3}
  ></IdentifyInformation>
);
export const LastOfMultiple = () => (
  <IdentifyInformation
    update={() => {}}
    features={features}
    offender={features[5].attributes}
    index={5}
  ></IdentifyInformation>
);
