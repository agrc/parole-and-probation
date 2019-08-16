import React from 'react';
import ReactDOM from 'react-dom';
import { UserData } from 'react-oidc';
import { IdentifyInformation } from './Identify';

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
            'offender_id': 62868,
            'offender_phone': '867-5309',
            'region': 1,
            'standard_of_supervision': 'MOD'
        },
        'popupTemplate': null
    }];
it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render((
        <UserData.Provider value={{
            user: {
                access_token: 'testing'
            }
        }}>
            <IdentifyInformation features={features} offender={features[0]} />
        </UserData.Provider>), div);
    ReactDOM.unmountComponentAtNode(div);
});
