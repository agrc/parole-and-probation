import fetchMock from 'fetch-mock';
import queryString from 'query-string';
import * as React from 'react';
import { useImmerReducer } from 'use-immer';
import Item from '../FilterOffender';
import { filterReducer } from '../Filters';

fetchMock.mock('glob:*api/data/name*', (url) => {
  const { requestId } = queryString.parse(url.split('?')[1]);

  return {
    requestId: parseInt(requestId),
    data: ['steve', 'matt', 'nathan'],
  };
});

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Filters/Offender Filter',
  component: Item,
  argTypes: {
    update: { action: 'update' },
  },
};

export const Normal = (args) => {
  const [criteria, dispatcher] = useImmerReducer(filterReducer, {
    offender: {
      gender: '',
      name: '',
      number: '',
      tel: '',
      employer: '',
    },
    downshift: {
      offenderName: '',
      offenderNumber: '',
      offenderTelephone: '',
      offenderEmployer: '',
    },
  });

  return (
    <Item
      downshift={criteria.downshift}
      criteria={criteria.offender}
      update={(action) => {
        dispatcher(action);
        args.update(action);
      }}
      currentFilter=""
    />
  );
};
