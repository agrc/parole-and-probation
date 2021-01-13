import React from 'react';
import { Filters } from '../Filters';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Filters/Agent Filter',
  component: Filters,
  argTypes: {
    dispatch: { action: 'dispatched' }
  }
};

export const normal = (args) => (
  <Filters
    loggedInUser={{ value: 'story tester', id: 999999 }}
    mapDispatcher={args.dispatch}
  />
);
