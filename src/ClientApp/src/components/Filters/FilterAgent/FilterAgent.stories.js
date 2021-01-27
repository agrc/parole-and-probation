import * as React from 'react';
import { useImmerReducer } from 'use-immer';
import { filterReducer } from '../Filters';
import { agents, supervisors } from '../lookupData';
import FilterAgent from './FilterAgent';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Filters/Agent Filter',
  component: FilterAgent,
  argTypes: {
    dispatch: { action: 'dispatched' },
  },
};

const defaultAgent = {
  loggedInUser: {
    value: 'somebody famous',
    id: 999,
  },
  agentList: [],
  supervisor: null,
  vanity: true,
};

export const Empty = (args) => {
  const [criteria, dispatcher] = useImmerReducer(filterReducer, {
    agent: {
      ...defaultAgent,
      vanity: false,
    },
  });

  return (
    <FilterAgent
      data={{ agents, supervisors }}
      criteria={criteria.agent}
      update={(action) => {
        dispatcher(action);
        args.dispatch(action);
      }}
    />
  );
};

export const Vanity = (args) => {
  const [criteria, dispatcher] = useImmerReducer(filterReducer, { agent: defaultAgent });

  return (
    <FilterAgent
      data={{ agents, supervisors }}
      criteria={criteria.agent}
      update={(action) => {
        dispatcher(action);
        args.dispatch(action);
      }}
    />
  );
};

export const AgentsSelected = (args) => {
  const [criteria, dispatcher] = useImmerReducer(filterReducer, {
    agent: {
      ...defaultAgent,
      agentList: [
        {
          id: -1,
          value: 'Storybook',
          supervisor: 'Airbnb',
        },
      ],
    },
  });

  return (
    <FilterAgent
      data={{ agents, supervisors }}
      criteria={criteria.agent}
      update={(action) => {
        dispatcher(action);
        args.dispatch(action);
      }}
    />
  );
};
