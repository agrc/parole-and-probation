import * as React from 'react';
import { useImmerReducer } from 'use-immer';
import { agentLookup, supervisorLookup } from '../lookupData';
import FilterAgent from './FilterAgent';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Filters/Agent Filter',
  component: FilterAgent,
  argTypes: {
    dispatch: { action: 'dispatched' },
  },
};

const vanityUser = {
  value: 'somebody famous',
  id: 999,
};
const defaultAgent = {
  loggedInUser: vanityUser,
  agentList: [],
  supervisor: null,
  vanity: true,
};

const vanityCheck = (agentList, loggedInUser) => {
  console.log(`Filters:vanity check for ${loggedInUser.value}`);

  const agentArray = Array.from(agentList);

  return agentArray.some((item) => item.value.toLowerCase() === loggedInUser.value.toLowerCase());
};

export const Empty = (args) => {
  const [criteria, dispatcher] = useImmerReducer(
    (draft, action) => {
      console.log(`Filter:reducing state ${action.type}`, action);

      switch (action.type) {
        case 'UPDATE_AGENT_LIST': {
          if (action.meta === 'agent') {
            if (action.payload.add) {
              if (
                draft.agent.agentList.some(
                  (item) => item.value.toLowerCase() === action.payload.item.value.toLowerCase()
                )
              ) {
                return;
              }

              draft.agent.agentList = [action.payload.item].concat(draft.agent.agentList);
            } else {
              draft.agent.supervisorList = [];
              draft.agent.agentList = draft.agent.agentList.filter(
                (item) => item.value.toLowerCase() !== action.payload.item.value.toLowerCase()
              );
            }
          } else if (action.meta === 'supervisor') {
            if (draft.agent.vanity && !vanityCheck(draft.agent.agentList, draft.agent.loggedInUser)) {
              draft.agent.agentList = agentLookup.some(
                (item) => item.value.toLowerCase() === draft.agent.loggedInUser.value.toLowerCase()
              );
            }

            if (!action.payload.supervisor) {
              draft.agent.agentList = [];

              if (draft.agent.vanity) {
                draft.agent.agentList = agentLookup.some(
                  (item) => item.value.toLowerCase() === draft.agent.loggedInUser.value.toLowerCase()
                );
              }
            } else {
              draft.agent.agentList = [];
              draft.agent.supervisor = [];

              if (draft.agent.vanity) {
                draft.agent.agentList.push(draft.agent.loggedInUser);
              }

              const agentsForSupervisor = agentLookup.filter(
                (agent) => agent.supervisor_Id.toLowerCase() === action.payload.supervisor.id.toLowerCase()
              );

              draft.agent.supervisor = [action.payload.supervisor];
              draft.agent.agentList = draft.agent.agentList.concat(agentsForSupervisor);
            }
          }

          draft.agent.vanity = vanityCheck(draft.agent.agentList, draft.agent.loggedInUser);

          return;
        }
        default:
          throw new Error();
      }
    },
    {
      agent: {
        ...defaultAgent,
        vanity: false,
      },
    }
  );

  return (
    <FilterAgent
      data={{ agentLookup, supervisorLookup }}
      criteria={criteria.agent}
      update={(action) => {
        dispatcher(action);
        args.dispatch(action);
      }}
    />
  );
};

export const Vanity = (args) => {
  const [criteria, dispatcher] = useImmerReducer(
    (draft, action) => {
      console.log(`Filter:reducing state ${action.type}`, action);

      switch (action.type) {
        case 'UPDATE_AGENT_LIST': {
          if (action.meta === 'agent') {
            if (action.payload.add) {
              if (
                draft.agent.agentList.some(
                  (item) => item.value.toLowerCase() === action.payload.item.value.toLowerCase()
                )
              ) {
                return;
              }

              draft.agent.agentList = [action.payload.item].concat(draft.agent.agentList);
            } else {
              draft.agent.supervisorList = [];
              draft.agent.agentList = draft.agent.agentList.filter(
                (item) => item.value.toLowerCase() !== action.payload.item.value.toLowerCase()
              );
            }
          } else if (action.meta === 'supervisor') {
            if (draft.agent.vanity && !vanityCheck(draft.agent.agentList, draft.agent.loggedInUser)) {
              draft.agent.agentList = agentLookup.some(
                (item) => item.value.toLowerCase() === draft.agent.loggedInUser.value.toLowerCase()
              );
            }

            if (!action.payload.supervisor) {
              draft.agent.agentList = [];

              if (draft.agent.vanity) {
                draft.agent.agentList = agentLookup.some(
                  (item) => item.value.toLowerCase() === draft.agent.loggedInUser.value.toLowerCase()
                );
              }
            } else {
              draft.agent.agentList = [];
              draft.agent.supervisor = [];

              if (draft.agent.vanity) {
                draft.agent.agentList.push(draft.agent.loggedInUser);
              }

              const agentsForSupervisor = agentLookup.filter(
                (agent) => agent.supervisor_Id.toLowerCase() === action.payload.supervisor.id.toLowerCase()
              );

              draft.agent.supervisor = [action.payload.supervisor];
              draft.agent.agentList = draft.agent.agentList.concat(agentsForSupervisor);
            }
          }

          draft.agent.vanity = vanityCheck(draft.agent.agentList, draft.agent.loggedInUser);

          return;
        }
        default:
          throw new Error();
      }
    },
    {
      agent: {
        ...defaultAgent,
        agentList: [vanityUser],
      },
    }
  );

  return (
    <FilterAgent
      data={{ agentLookup, supervisorLookup }}
      criteria={criteria.agent}
      update={(action) => {
        dispatcher(action);
        args.dispatch(action);
      }}
    />
  );
};

export const AgentsSelected = (args) => {
  const [criteria, dispatcher] = useImmerReducer(
    (draft, action) => {
      console.log(`Filter:reducing state ${action.type}`, action);

      switch (action.type) {
        case 'UPDATE_AGENT_LIST': {
          if (action.meta === 'agent') {
            if (action.payload.add) {
              if (
                draft.agent.agentList.some(
                  (item) => item.value.toLowerCase() === action.payload.item.value.toLowerCase()
                )
              ) {
                return;
              }

              draft.agent.agentList = [action.payload.item].concat(draft.agent.agentList);
            } else {
              draft.agent.supervisorList = [];
              draft.agent.agentList = draft.agent.agentList.filter(
                (item) => item.value.toLowerCase() !== action.payload.item.value.toLowerCase()
              );
            }
          } else if (action.meta === 'supervisor') {
            if (draft.agent.vanity && !vanityCheck(draft.agent.agentList, draft.agent.loggedInUser)) {
              draft.agent.agentList = agentLookup.some(
                (item) => item.value.toLowerCase() === draft.agent.loggedInUser.value.toLowerCase()
              );
            }

            if (!action.payload.supervisor) {
              draft.agent.agentList = [];

              if (draft.agent.vanity) {
                draft.agent.agentList = agentLookup.some(
                  (item) => item.value.toLowerCase() === draft.agent.loggedInUser.value.toLowerCase()
                );
              }
            } else {
              draft.agent.agentList = [];
              draft.agent.supervisor = [];

              if (draft.agent.vanity) {
                draft.agent.agentList.push(draft.agent.loggedInUser);
              }

              const agentsForSupervisor = agentLookup.filter(
                (agent) => agent.supervisor_Id.toLowerCase() === action.payload.supervisor.id.toLowerCase()
              );

              draft.agent.supervisor = [action.payload.supervisor];
              draft.agent.agentList = draft.agent.agentList.concat(agentsForSupervisor);
            }
          }

          draft.agent.vanity = vanityCheck(draft.agent.agentList, draft.agent.loggedInUser);

          return;
        }
        default:
          throw new Error();
      }
    },
    {
      agent: {
        ...defaultAgent,
        vanity: false,
        agentList: [
          {
            id: -1,
            value: 'Storybook',
            supervisor: 'Airbnb',
          },
        ],
      },
    }
  );

  return (
    <FilterAgent
      data={{ agentLookup, supervisorLookup }}
      criteria={criteria.agent}
      update={(action) => {
        dispatcher(action);
        args.dispatch(action);
      }}
    />
  );
};
