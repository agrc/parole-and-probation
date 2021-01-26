import * as React from 'react';
import { useImmerReducer } from 'use-immer';
import { filterReducer } from '../Filters';
import FilterLocation from './FilterLocation';
import './FilterLocation.css';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Filters/Location Filter',
  component: FilterLocation,
  argTypes: {
    dispatch: { action: 'dispatched' },
  },
};

const initialState = {
  location: {
    region: [],
    counties: [],
  },
};

export const Normal = (args) => {
  const [criteria, dispatcher] = useImmerReducer(filterReducer, initialState);

  return (
    <FilterLocation
      criteria={criteria.location}
      update={(action) => {
        args.dispatch(action);
        dispatcher(action);
      }}
    />
  );
};
