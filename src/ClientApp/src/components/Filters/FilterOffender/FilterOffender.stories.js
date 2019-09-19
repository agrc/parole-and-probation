import React from 'react';
import Item from '../FilterOffender';
import fetchMock from 'fetch-mock';
import { storiesOf } from '@storybook/react';

fetchMock.mock('end:limit=25', {
  'requestId': 1,
  'data': ['steve', 'matt', 'nathan']
});

storiesOf('Filters.Offender Filter', module)
  .add('normal', () => (
    <Item criteria={{
      gender: '',
      name: '',
      number: '',
      tel: '',
      employer: ''
    }}
      update={() => { }} />
  ));
