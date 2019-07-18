import React from 'react';
import { storiesOf } from '@storybook/react';
import { IdentifyInformation, IdentifyContainer } from '../components/Identify';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../components/Sidebar/Sidebar.css';

storiesOf('Identify', module)
  .add('with basic template', () => (
    <IdentifyContainer>
      <IdentifyInformation {...{
        offender: {
          name: 'Sarah Sanders',
          number: 1234556,
          age: 35,
          gender: 'Female',
          agent: 'Ace Ventura',
          gangGroup: 'sureno',
          gang: 'barrio mexicanos locos'
        },
        contact: {
          phone: '(801) 888-4325',
          street: '326 east south temple',
          unit: '#7',
          city: 'Salt Lake City',
          zip: 84111,
          addressType: '1st physical',
          addressDuration: new Date('December 17, 1995'),
          employer: 'McDonalds'
        },
        visit: {
          fieldDate: new Date('June 17, 2019'),
          fieldResult: 'Successful',
          officeDate: new Date('May 05, 2019')
        },
        status: {
          legal: 'Probation',
          warrant: 'No Active Warrant',
          sos: 'LOW',
          specialSupervision: [{
            name: 'Sex Offender',
            id: 'SO'
          }],
          crimeDegree: 'F1',
          crime: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          supervisionStart: new Date('January 1, 2018'),
          complianceCredit: new Date('May 15, 2019')
        }
      }}></IdentifyInformation>
    </IdentifyContainer>
  ))
  .add('with partial address and no phone', () => (
    <IdentifyContainer>
      <IdentifyInformation {...{
        offender: {
          name: 'Sarah Sanders',
          number: 1234556,
          age: 35,
          gender: 'Female',
          agent: 'Ace Ventura',
          gangGroup: 'sureno',
          gang: 'barrio mexicanos locos'
        },
        contact: {
          phone: '',
          street: '326 east south temple',
          unit: '',
          city: 'Salt Lake City',
          zip: 84111,
          addressType: '1st physical',
          addressDuration: new Date('December 17, 1995'),
          employer: 'McDonalds'
        },
        visit: {
          fieldDate: new Date('June 17, 2019'),
          fieldResult: 'Successful',
          officeDate: new Date('May 05, 2019')
        },
        status: {
          legal: 'Probation',
          warrant: 'No Active Warrant',
          sos: 'LOW',
          specialSupervision: [{
            name: 'CCC',
            id: 'CCC'
          }, {
            name: 'PVP',
            id: 'PVP'
          }, {
            name: 'COMP',
            id: 'COMP'
          }, {
            name: 'DEP',
            id: 'DEP'
          }, {
            name: 'EM',
            id: 'EM'
          }, {
            name: 'GPS',
            id: 'GPS'
          }, {
            name: 'SO',
            id: 'SO'
          }, {
            name: 'SO-A',
            id: 'SO-A'
          }, {
            name: 'SO-B',
            id: 'SO-B'
          }, {
            name: 'SO-C',
            id: 'SO-C'
          }, {
            name: 'FUG',
            id: 'FUG'
          }, {
            name: 'INCAR',
            id: 'INCAR'
          }, {
            name: 'RESID',
            id: 'RESID'
          }, {
            name: 'DRUG CT',
            id: 'DRUG CT'
          }, {
            name: 'DORA',
            id: 'DORA'
          }, {
            name: 'ECR',
            id: 'ECR'
          }, {
            name: 'FOSI',
            id: 'FOSI'
          }, {
            name: 'IG INT',
            id: 'IG INT'
          }, {
            name: 'MIO',
            id: 'MIO'
          }],
          crimeDegree: 'F1',
          crime: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          supervisionStart: new Date('January 1, 2018'),
          complianceCredit: new Date('May 15, 2019')
        }
      }}></IdentifyInformation>
    </IdentifyContainer>
  ))
  .add('with active warrant', () => (
    <IdentifyContainer>
      <IdentifyInformation {...{
        offender: {
          name: 'Sarah Sanders',
          number: 1234556,
          age: 35,
          gender: 'Female',
          agent: 'Ace Ventura',
          gangGroup: 'sureno',
          gang: 'barrio mexicanos locos'
        },
        contact: {
          phone: '(801) 888-4325',
          street: '326 east south temple',
          unit: '#7',
          city: 'Salt Lake City',
          zip: 84111,
          addressType: '1st physical',
          addressDuration: new Date('December 17, 1995'),
          employer: 'McDonalds'
        },
        visit: {
          fieldDate: new Date('June 17, 2019'),
          fieldResult: 'Successful',
          officeDate: new Date('May 05, 2019')
        },
        status: {
          legal: 'Probation',
          warrant: 'Active Warrant',
          sos: 'LOW',
          specialSupervision: [{
            name: 'Sex Offender',
            id: 'SO'
          }],
          crimeDegree: 'F1',
          crime: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          supervisionStart: new Date('January 1, 2018'),
          complianceCredit: new Date('May 15, 2019')
        }
      }}></IdentifyInformation>
    </IdentifyContainer>
  ))
  .add('with caution', () => (
    <IdentifyContainer>
      <IdentifyInformation {...{
        offender: {
          name: 'Sarah Sanders',
          number: 1234556,
          age: 35,
          gender: 'Female',
          agent: 'Ace Ventura',
          gangGroup: 'sureno',
          gang: 'barrio mexicanos locos'
        },
        contact: {
          phone: '(801) 888-4325',
          street: '326 east south temple',
          unit: '#7',
          city: 'Salt Lake City',
          zip: 84111,
          addressType: '1st physical',
          addressDuration: new Date('December 17, 1995'),
          employer: 'McDonalds'
        },
        visit: {
          fieldDate: new Date('June 17, 2019'),
          fieldResult: 'Successful',
          officeDate: new Date('May 05, 2019'),
          cautions: 'She lies a lot and has a concealed carry license and a mean dog.'
        },
        status: {
          legal: 'Probation',
          warrant: 'No Active Warrant',
          sos: 'LOW',
          specialSupervision: [{
            name: 'Sex Offender',
            id: 'SO'
          }],
          crimeDegree: 'F1',
          crime: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          supervisionStart: new Date('January 1, 2018'),
          complianceCredit: new Date('May 15, 2019')
        }
      }}></IdentifyInformation>
    </IdentifyContainer>
  ))
  .add('with out sos', () => (
    <IdentifyContainer>
      <IdentifyInformation {...{
        offender: {
          name: 'Sarah Sanders',
          number: 1234556,
          age: 35,
          gender: 'Female',
          agent: 'Ace Ventura',
          gangGroup: 'sureno',
          gang: 'barrio mexicanos locos'
        },
        contact: {
          phone: '(801) 888-4325',
          street: '326 east south temple',
          unit: '#7',
          city: 'Salt Lake City',
          zip: 84111,
          addressType: '1st physical',
          addressDuration: new Date('December 17, 1995'),
          employer: 'McDonalds'
        },
        visit: {
          fieldDate: new Date('June 17, 2019'),
          fieldResult: 'Successful',
          officeDate: new Date('May 05, 2019'),
          cautions: 'She lies a lot and has a concealed carry license and a mean dog.'
        },
        status: {
          legal: 'Probation',
          warrant: 'No Active Warrant',
          sos: '',
          specialSupervision: [{
            name: 'Sex Offender',
            id: 'SO'
          }],
          crimeDegree: 'F1',
          crime: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          supervisionStart: new Date('January 1, 2018'),
          complianceCredit: new Date('May 15, 2019')
        }
      }}></IdentifyInformation>
    </IdentifyContainer>
  ))
  .add('without gang', () => (
    <IdentifyContainer>
      <IdentifyInformation {...{
        offender: {
          name: 'Sarah Sanders',
          number: 1234556,
          age: 35,
          gender: 'Female',
          agent: 'Ace Ventura',
          gangGroup: '',
          gang: ''
        },
        contact: {
          phone: '(801) 888-4325',
          street: '326 east south temple',
          unit: '#7',
          city: 'Salt Lake City',
          zip: 84111,
          addressType: '1st physical',
          addressDuration: new Date('December 17, 1995'),
          employer: 'McDonalds'
        },
        visit: {
          fieldDate: new Date('June 17, 2019'),
          fieldResult: 'Successful',
          officeDate: new Date('May 05, 2019')
        },
        status: {
          legal: 'Probation',
          warrant: 'No Active Warrant',
          sos: 'LOW',
          specialSupervision: [{
            name: 'Sex Offender',
            id: 'SO'
          }],
          crimeDegree: 'F1',
          crime: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          supervisionStart: new Date('January 1, 2018'),
          complianceCredit: new Date('May 15, 2019')
        }
      }}></IdentifyInformation>
    </IdentifyContainer>
  ));
