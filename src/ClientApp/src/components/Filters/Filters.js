import React, { useReducer } from 'react';
import produce from 'immer';
import AccordionPane from '../AccordionPane';
import FilterActions from './FilterActions';
import FilterAgent from './FilterAgent';
import FilterDate from './FilterDate';
import FilterOffender from './FilterOffender';
import FilterLocation from './FilterLocation';
import FilterOther from './FilterOther';
import './Filters.css';

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

const vanityCheck = (agentList, loggedInUser) => {
    if (Array.isArray(agentList)) {
        return agentList.indexOf(loggedInUser) > -1;
    }

    return agentList.has(loggedInUser);
};

const filterMeta = {
    agent: {
        agentList: data => `agent_name in (${data.map(agent => `'${agent}'`).join()})`
    },
    date: {},
    location: {
        buffer: data => undefined,
        region: data => `region in (${data.join()})`,
        zip: data => `zip=${data}`,
        city: data => `city='${data.toUpperCase()}'`,
        county: data => `county='${data.toUpperCase()}'`,
        extent: data => undefined,
        point: data => undefined
    },
    offender: {
        gender: data => `gender='${data.slice(0, 1)}'`,
        name: data => `offender like '%${data.toUpperCase()}%'`,
        number: data => `offender_id=${data}`,
        tel: data => `offender_phone='${data}'`,
        employer: data => `employer='${data}'`
    },
    other: {
        warrant: data => `active_warrant=${data === 'Yes' ? 1 : 0}`,
        status: data => `legal_status='${data.toUpperCase()}'`,
        sos: data => {
            const query = ['standard_of_supervision is null'];

            data = data.filter(item => item !== 'no std');

            if (data.length > 0) {
                query.push(`standard_of_supervision in (${data.map(item => `'${item.toUpperCase()}'`).join()})`);
            }

            return query.join(' OR ');
        },
        supervision: data => `standard_of_supervision='${data}'`,
        gang: data => `gang_name='${data}'`,
        offense: data => `offense_code='${data}'`
    }
};

const formatForEsriFilter = (data) => {
    console.log(`Filters:formatForEsriFilter`, data);

    let filterParts = [];
    let definitionExpressionParts = [];

    // agent/data/location/offender/other
    Object.keys(data).forEach(key => {
        const metaKeys = Object.keys(filterMeta[key]);

        const criteria = Object.entries(data[key]);
        const sql = criteria.map(([subKey, value]) => {
            if (!metaKeys.includes(subKey) || Object.keys(value).length === 0 || !value) {
                return undefined;
            }

            return filterMeta[key][subKey](value);
        }).filter(x => !!x);

        if (key === 'agent' && sql) {
            sql.forEach(item => definitionExpressionParts.push(item));

            return;
        }

        if (sql) {
            sql.forEach(item => filterParts.push(item));
        }
    });

    return { definitionExpression: definitionExpressionParts, filter: filterParts };
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
                if (draft.agent.vanity && !vanityCheck(draft.agent.agentList, draft.agent.loggedInUser)) {
                    draft.agent.agentList.splice(0, 0, draft.agent.loggedInUser);
                }

                if (!action.payload.supervisorName) {
                    draft.agent.agentList = [];

                    if (draft.agent.vanity) {
                        draft.agent.agentList.splice(0, 0, draft.agent.loggedInUser);
                    }
                } else {
                    draft.agent.agentList = [];

                    if (draft.agent.vanity) {
                        draft.agent.agentList.splice(0, 0, draft.agent.loggedInUser);
                    }

                    const agentsForSupervisor = testData.agents
                        .filter(agent => agent.supervisor.toLowerCase() === action.payload.supervisorName.toLowerCase())
                        .map(item => item.value);

                    draft.agent.agentList = draft.agent.agentList.concat(agentsForSupervisor);
                }
            }

            draft.agent.vanity = vanityCheck(draft.agent.agentList, draft.agent.loggedInUser);

            return draft;
        }
        case 'UPDATE_OFFENDER': {
            draft.offender[action.meta] = action.payload;

            return draft;
        }
        case 'UPDATE_DATE': {
            draft.date[action.meta] = action.payload;

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
        default:
            throw new Error();
    }
});

const initialState = {
    agent: {
        loggedInUser: null,
        agentList: [],
        vanity: true
    },
    date: {
        outOfCompliance: false,
        office: null,
        attempt: null,
        success: null
    },
    location: {
        buffer: '',
        region: [],
        zip: '',
        city: '',
        county: '',
        extent: '', // TODO: implement
        point: '' // TODO: implement
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
        supervision: [],
        gang: '',
        offense: ''
    }
};

const emptyState = {
    agent: {
        loggedInUser: null,
        agentList: [],
        vanity: true
    },
    date: {
        outOfCompliance: false,
        office: null,
        attempt: null,
        success: null
    },
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
        supervision: [],
        gang: '',
        offense: ''
    }
};

export default function Filters(props) {
    initialState.agent.loggedInUser = props.loggedInUser;
    initialState.agent.agentList = [props.loggedInUser];

    emptyState.agent.loggedInUser = props.loggedInUser;
    emptyState.agent.agentList = [props.loggedInUser];

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
                <FilterDate
                    criteria={criteria.date}
                    update={dispatcher}
                    dispatcher={props.mapDispatcher} />
            </AccordionPane>
            <AccordionPane title="Other">
                <FilterOther
                    criteria={criteria.other}
                    update={dispatcher} />
            </AccordionPane>
            <FilterActions
                apply={() => props.mapDispatcher({ type: 'SET_FILTERS', payload: formatForEsriFilter(criteria) })}
                reset={() => dispatcher({ type: 'RESET' })} />
        </>
    )
}
