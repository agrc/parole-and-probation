import * as React from 'react';
import { useImmerReducer } from 'use-immer';
import FilterOffender from '../FilterOffender';

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
        offender_id: 1,
      },
    },
    {
      attributes: {
        offender: 'matt',
        offender_id: 2,
      },
    },
    {
      attributes: {
        offender: 'steve',
        offender_id: 3,
      },
    },
    {
      attributes: {
        offender: 'stephanie',
        offender_id: 4,
      },
    },
    {
      attributes: {
        offender: 'santa',
        offender_id: 5,
      },
    },
    {
      attributes: {
        offender: 'sarah',
        offender_id: 6,
      },
    },
    {
      attributes: {
        offender: 'scooby-doo',
        offender_id: 7,
      },
    },
    {
      attributes: {
        offender: 'stephan',
        offender_id: 8,
      },
    },
    {
      attributes: {
        offender: 'smarty-pants',
        offender_id: 9,
      },
    },
    {
      attributes: {
        offender: 'sophia',
        offender_id: 10,
      },
    },
    {
      attributes: {
        offender: 'scarlett',
        offender_id: 11,
      },
    },
    {
      attributes: {
        offender: 'skylar',
        offender_id: 12,
      },
    },
    {
      attributes: {
        offender: 'serenity',
        offender_id: 13,
      },
    },
    {
      attributes: {
        offender: 'savannah',
        offender_id: 14,
      },
    },
    {
      attributes: {
        offender: 'siena',
        offender_id: 15,
      },
    },
    {
      attributes: {
        offender: 'sky',
        offender_id: 16,
      },
    },
    {
      attributes: {
        offender: 'sally',
        offender_id: 17,
      },
    },
    {
      attributes: {
        offender: 'sidney',
        offender_id: 18,
      },
    },
    {
      attributes: {
        offender: 'should not see me',
        offender_id: 19,
      },
    },
  ],
};

export const Normal = (args) => {
  const [criteria, dispatcher] = useImmerReducer(
    (draft, action) => {
      console.log(`Filter:reducing state ${action.type}`, action);

      switch (action.type) {
        case 'UPDATE_OFFENDER': {
          draft.offender[action.meta] = action.payload;

          return;
        }
        default:
          throw new Error();
      }
    },
    {
      offender: {
        gender: '',
        name: '',
        number: '',
        tel: '',
        employer: '',
      },
    }
  );

  return (
    <FilterOffender
      criteria={criteria.offender}
      update={(action) => {
        dispatcher(action);
        args.update(action);
      }}
      featureSet={featureSet}
    />
  );
};
