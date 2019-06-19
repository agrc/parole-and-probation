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

const reducer = (state, action) => {
    console.log(`reducing state for ${action.type}`);
    console.dir(action);

    switch (action.type) {
        case 'UPDATE_AGENT_LIST': {
            const updates = new Set();

            if (action.meta === 'agent') {
                if (action.payload.add) {
                    updates.add(action.payload.agentName);
                    state.agent.agentList.forEach(item => updates.add(item));
                } else {
                    state.agent.agentList.forEach(item => updates.add(item));
                    updates.delete(action.payload.agentName);
                }
            } else if (action.meta === 'supervisor') {
                if (vanityCheck(state.agent.agentList)) {
                    updates.add(loggedInUser);
                }

                if (!action.payload.supervisorName) {
                    updates.clear();

                    if (vanityCheck(state.agent.agentList)) {
                        updates.add(loggedInUser);
                    }
                } else {
                    testData.agents
                        .filter(agent => agent.supervisor.toLowerCase() === action.payload.supervisorName.toLowerCase())
                        .forEach(item => updates.add(item.value));
                }
            }

            return {
                ...state,
                agent: {
                    ...state.agent,
                    agentList: Array.from(updates),
                    vanity: vanityCheck(updates)
                }
            }
        }
        case 'UPDATE_OFFENDER': {
            const nextState = produce(state, draft => {
                draft.offender[action.meta] = action.payload;
            });

            return nextState;
        }
        default:
            throw new Error();
    }
};

export default function Filters(props) {
    const [criteria, dispatcher] = useReducer(reducer, {
        agent: {
            loggedInUser,
            agentList: [loggedInUser],
            vanity: true
        },
        date: {},
        location: {},
        offender: {
            gender: '',
            name: '',
            number: '',
            tel: '',
            employer: ''
        },
        other: {}
    });

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
                <FilterLocation dispatcher={props.mapDispatcher} />
            </AccordionPane>
            <AccordionPane title="Supervision Contact">
                <FilterDate update={dispatcher} />
            </AccordionPane>
            <AccordionPane title="Other">
                <FilterOther update={dispatcher} />
            </AccordionPane>
            <FilterActions criteria={criteria} />
        </>
    )
}
