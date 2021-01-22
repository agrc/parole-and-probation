import * as React from 'react';
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


let criteria = {
  agentList: [],
  supervisorList: [],
  vanity: false
}

const reduce = (action) => {
  let agentList;
  if (action.payload.add) {
    agentList = [action.payload.item].concat(criteria.agentList);
  } else {
    agentList = criteria.agentList.filter(item => item.value.toLowerCase() !== action.payload.item.value.toLowerCase());
  }

  criteria = { ...criteria, agentList };
};

export const empty = (args) => (
  <FilterAgent
    data={{ agents, supervisors }}
    criteria={criteria}
    update={(action) => {
      reduce(action);
      args.dispatch(action);
    }}
  />
);

export const vanity = (args) => (
  <FilterAgent
    data={{ agents, supervisors }}
    criteria={{ ...criteria, vanity: true }}
    update={(action) => {
      reduce(action);
      args.dispatch(action);
    }}
  />
);

export const agentsSelected = (args) => (
  <FilterAgent
    data={{ agents, supervisors }}
    criteria={{
      ...criteria, agentList: [{
        id: -1,
        value: 'Storybook',
        supervisor: 'Airbnb'
      }]
    }}
    update={(action) => {
      reduce(action);
      args.dispatch(action);
    }}
  />
);
