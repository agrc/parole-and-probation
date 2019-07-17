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
        show: true,
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
          phone: 'CELL: (801) 888-4325',
          street: '123 Red Street',
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
          specialSupervisionTitle: 'SO',
          specialSupervision: 'Sex Offender',
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
        show: true,
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
          phone: 'CELL: (801) 888-4325',
          street: '123 Red Street',
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
          specialSupervisionTitle: 'SO',
          specialSupervision: 'Sex Offender',
          crimeDegree: 'F1',
          crime: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          supervisionStart: new Date('January 1, 2018'),
          complianceCredit: new Date('May 15, 2019')
        }
      }}></IdentifyInformation>
    </IdentifyContainer>
  ));
