import * as React from 'react';
import Component from '../FilterOther';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Filters/Other Filter',
  component: Component,
  argTypes: {
    update: { action: 'update' },
  },
};

export const normal = (args) => (
  <Component
    criteria={{
      gang: [
        { id: 1, name: 'sureno' },
        { id: 2, name: 'crip' },
      ],
      offense: [{ id: 'A', name: 'murder' }],
      supervision: [{ id: 1, name: 'ccc' }],
      warrant: 'Yes',
      sos: ['low'],
      status: 'parole',
    }}
    update={args.update}
  />
);
