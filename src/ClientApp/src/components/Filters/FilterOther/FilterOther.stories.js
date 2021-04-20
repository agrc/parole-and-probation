import * as React from 'react';
import { useImmerReducer } from 'use-immer';
import FilterOther from '../FilterOther';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Filters/Other Filter',
  component: FilterOther,
  argTypes: {
    update: { action: 'update' },
  },
};
const addOrRemove = (list, value, add) => {
  if (add) {
    list.push(value);
  } else {
    if (typeof list[0] === 'string' || list[0] instanceof String) {
      const index = list.indexOf(value);
      if (index === -1) {
        throw Error(`The item ${value} was not found in the list: ${list}`);
      }

      list.splice(index, 1);
    } else {
      list = list.filter((item) => item.id !== value);
    }
  }

  return list;
};

export const Empty = (args) => {
  const [criteria, dispatcher] = useImmerReducer(
    (draft, action) => {
      console.log(`Filter:reducing state ${action.type}`, action);

      switch (action.type) {
        case 'UPDATE_OTHER': {
          switch (action.meta) {
            case 'supervision':
            case 'gang':
            case 'offense': {
              draft.other[action.meta] = addOrRemove(
                draft.other[action.meta],
                action.payload.value,
                action.payload.add
              );

              break;
            }
            case 'sos': {
              let add = true;
              if (draft.other.sos.includes(action.payload)) {
                add = false;
              }

              draft.other.sos = addOrRemove(draft.other.sos, action.payload, add);

              break;
            }
            default: {
              draft.other[action.meta] = action.payload;
            }
          }

          return;
        }
        default:
          throw new Error();
      }
    },
    {
      other: {
        gang: [],
        offense: [],
        supervision: [],
        warrant: '',
        sos: [],
        status: '',
      },
    }
  );

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
