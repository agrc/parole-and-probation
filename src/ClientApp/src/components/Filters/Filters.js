import React, { useReducer } from 'react';
import produce from 'immer';
import AccordionPane from '../AccordionPane';
import FilterActions from './FilterActions';
import FilterAgent from './FilterAgent';
import FilterDate from './FilterDate';
import FilterOffender from './FilterOffender';
import FilterLocation from './FilterLocation';
import FilterOther from './FilterOther';
import { agents, supervisors } from './lookupData';
import './Filters.css';

const vanityCheck = (agentList, loggedInUser) => {
    console.log(`vanity check for ${loggedInUser.value}`);

    const agents = Array.from(agentList);

    return agents.some(item => item.value.toLowerCase() === loggedInUser.value.toLowerCase());
};

const sqlMap = {
    agent: {
        agentList: data => `agent_id in (${data.map(agent => `${agent.id}`).join()})`
    },
    date: {
        compliant: data => `in_compliance=${data === 'in' ? 1 : 0}`,
        attempt: data => `last_attempted_field_contact>${data}`,
        office: data => `last_office_contact>${data}`,
        success: data => `last_successful_field_contact>${data}`
    },
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
        name: data => `offender='${data.toUpperCase()}'`,
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
        supervision: data => `special_supervision='${data.map(item => item.id).join(', ')}'`,
        gang: data => `gang_type in (${data.map(item => `'${item.name.toUpperCase()}'`).join()})`,
        offense: data => `offense_code in (${data.map(item => `'${item.id}'`).join()})`
    }
};

const sqlMapper = (data) => {
    console.log(`Filters:sqlMapper`, data);

    let filterParts = [];
    let definitionExpressionParts = [];

    // agent/data/location/offender/other
    Object.keys(data).forEach(key => {
        const metaKeys = Object.keys(sqlMap[key]);

        const criteria = Object.entries(data[key]);
        const sql = criteria.map(([subKey, value]) => {
            if (value === null) {
                // skipping because null value

                return undefined;
            }

            if (typeof value === 'string' && !value) {
                // skipping empty string

                return undefined;
            }

            if (Array.isArray(value) && value.length === 0) {
                // skipping empty array

                return undefined;
            }

            if (!metaKeys.includes(subKey)) {
                // skipping because only interested in top level keys

                return undefined;
            }

            return sqlMap[key][subKey](value);
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
                    if (draft.agent.agentList.some(item => item.value.toLowerCase() === action.payload.item.value.toLowerCase())) {
                        return draft;
                    }

                    draft.agent.agentList = [action.payload.item].concat(draft.agent.agentList);
                } else {
                    draft.agent.agentList = draft.agent.agentList.filter(item => item.value.toLowerCase() !== action.payload.item.value.toLowerCase());
                }
            } else if (action.meta === 'supervisor') {
                if (draft.agent.vanity && !vanityCheck(draft.agent.agentList, draft.agent.loggedInUser)) {

                    draft.agent.agentList = agents.some(item => item.value.toLowerCase() === draft.agent.loggedInUser.value.toLowerCase());
                }

                if (!action.payload.supervisorName) {
                    draft.agent.agentList = [];

                    if (draft.agent.vanity) {
                        draft.agent.agentList = agents.some(item => item.value.toLowerCase() === draft.agent.loggedInUser.value.toLowerCase());
                    }
                } else {
                    draft.agent.agentList = [];

                    if (draft.agent.vanity) {
                        draft.agent.agentList.push(draft.agent.loggedInUser);
                    }

                    const agentsForSupervisor = agents
                        .filter(agent => agent.supervisor.toLowerCase() === action.payload.supervisorName.toLowerCase())

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
        compliant: null,
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
        gang: [],
        offense: []
    }
};

const emptyState = {
    agent: {
        loggedInUser: null,
        agentList: [],
        vanity: true
    },
    date: {
        compliant: null,
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
        gang: [],
        offense: []
    }
};

const Filters = props => {
    initialState.agent.loggedInUser = props.loggedInUser;
    initialState.agent.agentList = [props.loggedInUser];

    emptyState.agent.loggedInUser = props.loggedInUser;
    emptyState.agent.agentList = [props.loggedInUser];

    const [criteria, dispatcher] = useReducer(filterReducer, initialState);

    return (
        <>
            <AccordionPane title="Agent" open className="mb-1">
                <FilterAgent
                    data={{ agents, supervisors }}
                    criteria={criteria.agent}
                    update={dispatcher} />
            </AccordionPane>
            <AccordionPane title="Offender" className="mb-1">
                <FilterOffender
                    criteria={criteria.offender}
                    update={dispatcher} />
            </AccordionPane>
            <AccordionPane title="Location" className="mb-1">
                <FilterLocation
                    criteria={criteria.location}
                    update={dispatcher}
                    dispatcher={props.mapDispatcher} />
            </AccordionPane>
            <AccordionPane title="Supervision Contact" className="mb-1">
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
                apply={() => props.mapDispatcher({ type: 'SET_FILTERS', payload: sqlMapper(criteria) })}
                reset={() => dispatcher({ type: 'RESET' })} />
        </>
    )
};

export { Filters, sqlMap, sqlMapper };
