import * as React from 'react';
import { filterReducer } from '../Filters';
import { agents, supervisors } from '../lookupData';
import FilterAgent from './FilterAgent';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Filters/Agent Filter',
  component: FilterAgent,
  argTypes: {
    dispatch: { action: 'dispatched' }
  }
};


const initialState = {
  agent: {
    loggedInUser: {
      value: 'empty'
    },
    agentList: [],
    supervisor: null,
    vanity: true
  }
};

export const Empty = (args) => {
  const [criteria, dispatcher] = React.useReducer(filterReducer, initialState);

 return <FilterAgent
    data={{ agents, supervisors }}
    criteria={{...criteria.agent, vanity: false}}
    update={(action) => {
      dispatcher(action);
      args.dispatch(action);
    }}
  />
};

export const Vanity = (args) => {
  const [criteria, dispatcher] = React.useReducer(filterReducer, initialState);

  return <FilterAgent
    data={{ agents, supervisors }}
    criteria={criteria.agent}
    update={(action) => {
      dispatcher(action);
      args.dispatch(action);
    }}
  />
};

export const AgentsSelected = (args) => {
  const [criteria, dispatcher] = React.useReducer(filterReducer, initialState);

  return <FilterAgent
    data={{ agents, supervisors }}
    criteria={{
      ...criteria.agent, agentList: [{
        id: -1,
        value: 'Storybook',
        supervisor: 'Airbnb'
      }]
    }}
    update={(action) => {
      dispatcher(action);
      args.dispatch(action);
    }}
  />
};
