import * as React from 'react';
import { useImmerReducer } from 'use-immer';
import FilterOffender from '../FilterOffender';
import { filterReducer } from '../Filters';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Filters/Offender Filter',
  component: FilterOffender,
  argTypes: {
    update: { action: 'update' },
  },
};

const featureSet = {
  features: [
    {
      attributes: {
        offender: 'scott',
      },
    },
    {
      attributes: {
        offender: 'matt',
      },
    },
    {
      attributes: {
        offender: 'steve',
      },
    },
  ],
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
    <FilterOffender
      downshift={criteria.downshift}
      criteria={criteria.offender}
      update={(action) => {
        dispatcher(action);
        args.update(action);
      }}
      currentFilter=""
      items={featureSet}
    />
  );
};
