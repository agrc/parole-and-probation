import * as React from 'react';
import { useImmerReducer } from 'use-immer';
import FilterOther from '../FilterOther';
import { filterReducer } from '../Filters';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Filters/Other Filter',
  component: FilterOther,
  argTypes: {
    update: { action: 'update' },
  },
};

export const Empty = (args) => {
  const [criteria, dispatcher] = useImmerReducer(filterReducer, {
    other: {
      gang: [],
      offense: [],
      supervision: [],
      warrant: '',
      sos: [],
      status: '',
    },
  });

  return (
    <FilterOther
      criteria={criteria.other}
      update={(action) => {
        dispatcher(action);
        args.update(action);
      }}
    />
  );
};
