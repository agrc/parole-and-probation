import React from 'react';
import Filters from '../components/Filters/Filters'
import { storiesOf } from '@storybook/react';

storiesOf('Agent Filter', module)
    .add('normal', () => (
        <Filters loggedInUser={{ value: 'story tester', id: 999999 }} />
    ));
