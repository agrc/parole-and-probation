import fetchMock from 'fetch-mock';
import * as React from 'react';
import Item from '../FilterOffender';

fetchMock.mock('end:limit=25', {
  requestId: 1,
  data: ['steve', 'matt', 'nathan'],
});

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Filters/Offender Filter',
  component: Item,
  argTypes: {
    update: { action: 'update' },
  },
};

export const Normal = (args) => (
  <Item
    criteria={{
      gender: '',
      name: '',
      number: '',
      tel: '',
      employer: '',
    }}
    downshift={{
      offenderName: '',
      offenderNumber: '',
      offenderTelephone: '',
      offenderEmployer: '',
    }}
    update={args.update}
  />
);
