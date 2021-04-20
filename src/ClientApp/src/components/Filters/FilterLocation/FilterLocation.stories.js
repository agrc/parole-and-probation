import * as React from 'react';
import { useImmerReducer } from 'use-immer';
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

export const Normal = (args) => {
  const [criteria, dispatcher] = useImmerReducer((draft, action) => {
    console.log(`Filter:reducing state ${action.type}`, action);

    switch (action.type) {
      case 'UPDATE_LOCATION': {
        switch (action.meta) {
          case 'counties': {
            draft.location[action.meta] = addOrRemove(
              draft.location[action.meta],
              action.payload.item,
              action.payload.add
            );
            break;
          }
          case 'region': {
            let add = true;
            if (draft.location.region.includes(action.payload)) {
              add = false;
            }

            draft.location.region = addOrRemove(draft.location.region, action.payload, add);
            break;
          }
          default: {
            draft.location[action.meta] = action.payload;
          }
        }

        return;
      }
      default:
        throw new Error();
    }
  }, initialState);

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
