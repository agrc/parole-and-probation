import React, { useReducer } from 'react';
import AccordionPane from '../AccordionPane';
import FilterActions from './FilterActions';
import FilterAgent from './FilterAgent';
import FilterDate from './FilterDate';
import FilterOffender from './FilterOffender';
import FilterLocation from './FilterLocation';
import FilterOther from './FilterOther';
import './Filters.css';
import produce from "immer";

const testData = {
    agents: [
        { value: 'Andrew', supervisor: 'Sarah' },
        { value: 'Steve', supervisor: 'Susan' },
        { value: 'Karl', supervisor: 'Sarah' },
        { value: 'Matt', supervisor: 'Susan' },
        { value: 'Mitt', supervisor: 'Sarah' },
    ],
    supervisors: [
        { value: 'Sarah' },
        { value: 'Susan' },
    ]
};

const loggedInUser = 'logged in user';

const vanityCheck = (agentList) => {
    if (Array.isArray(agentList)) {
        return agentList.indexOf(loggedInUser) > -1;
    }

    return agentList.has(loggedInUser);
};

const filterReducer = produce((draft, action) => {
    console.log(`reducing state for ${action.type}`);
    console.dir(action);

    switch (action.type) {
        case 'UPDATE_AGENT_LIST': {
            if (action.meta === 'agent') {
                if (action.payload.add) {
                    if (draft.agent.agentList.indexOf(action.payload.agentName) > -1) {
                        return draft;
                    }

                    draft.agent.agentList.splice(0, 0, action.payload.agentName);
                } else {
                    const remove = draft.agent.agentList.indexOf(action.payload.agentName);
                    draft.agent.agentList.splice(remove, 1);
                }
            } else if (action.meta === 'supervisor') {
                if (draft.agent.vanity && !vanityCheck(draft.agent.agentList)) {
                    draft.agent.agentList.splice(0, 0, loggedInUser);
                }

                if (!action.payload.supervisorName) {
                    draft.agent.agentList = [];

                    if (draft.agent.vanity) {
                        draft.agent.agentList.splice(0, 0, loggedInUser);
                    }
                } else {
                    draft.agent.agentList = [];

                    if (draft.agent.vanity) {
                        draft.agent.agentList.splice(0, 0, loggedInUser);
                    }

                    const agentsForSupervisor = testData.agents
                        .filter(agent => agent.supervisor.toLowerCase() === action.payload.supervisorName.toLowerCase())
                        .map(item => item.value);

                    draft.agent.agentList = draft.agent.agentList.concat(agentsForSupervisor);
                }
            }

            draft.agent.vanity = vanityCheck(draft.agent.agentList);

            return draft;
        }
        case 'UPDATE_OFFENDER': {
            draft.offender[action.meta] = action.payload;

            return draft;
        }
        case 'UPDATE_OTHER': {
            draft.other[action.meta] = action.payload;

            return draft;
        }
        case 'UPDATE_LOCATION': {
            draft.location[action.meta] = action.payload;

            return draft;
        }
        case 'RESET': {
            return emptyState;
        }
        case 'APPLY': {
            const ignoreKeys = ['vanity', 'loggedInUser']
            alert(JSON.stringify(draft, (key, value) => {
                if (value === '' || ignoreKeys.indexOf(key) > -1 || value.length === 0 || (!Array.isArray(value) && value instanceof Object && Object.keys(value).length === 0)) {
                    return undefined;
                }

                return value;
            }, 2));

            return draft;
        }
        default:
            return draft;
    }
});

const initialState = {
    agent: {
        loggedInUser,
        agentList: [loggedInUser],
        vanity: true
    },
    date: {},
    location: {
        buffer: '',
        region: [],
        zip: '',
        city: '',
        county: '',
        extent: {}, // TODO: implement
        point: {} // TODO: implement
    },
    offender: {
        gender: '',
        name: '',
        number: '',
        tel: '',
        employer: ''
    },
    other: {
        warrant: '',
        status: '',
        sos: [],
        supervision: '',
        gang: '',
        offense: ''
    }
};

const emptyState = {
    agent: {
        loggedInUser,
        agentList: [loggedInUser],
        vanity: true
    },
    date: {},
    location: {
        buffer: '',
        region: [],
        zip: '',
        city: '',
        county: '',
        extent: {}, // TODO: implement
        point: {} // TODO: implement
    },
    offender: {
        gender: '',
        name: '',
        number: '',
        tel: '',
        employer: ''
    },
    other: {
        warrant: '',
        status: '',
        sos: [],
        supervision: '',
        gang: '',
        offense: ''
    }
};

export default function Filters(props) {
    const [criteria, dispatcher] = useReducer(filterReducer, initialState);

    return (
        <>
            <AccordionPane title="Agent" open>
                <FilterAgent
                    data={testData}
                    criteria={criteria.agent}
                    update={dispatcher} />
            </AccordionPane>
            <AccordionPane title="Offender">
                <FilterOffender
                    criteria={criteria.offender}
                    update={dispatcher} />
            </AccordionPane>
            <AccordionPane title="Location">
                <FilterLocation
                    criteria={criteria.location}
                    update={dispatcher}
                    dispatcher={props.mapDispatcher} />
            </AccordionPane>
            <AccordionPane title="Supervision Contact">
                <FilterDate update={dispatcher} />
            </AccordionPane>
            <AccordionPane title="Other">
                <FilterOther
                    criteria={criteria.other}
                    update={dispatcher} />
            </AccordionPane>
            <FilterActions
                apply={() => dispatcher({ type: 'APPLY' })}
                reset={() => dispatcher({ type: 'RESET' })} />
        </>
    )
}
