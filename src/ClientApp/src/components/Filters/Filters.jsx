import { useQuery } from '@tanstack/react-query';
import { Disclosure, DisclosureGroup, DisclosureHeader, DisclosurePanel } from '@ugrc/utah-design-system';
import clsx from 'clsx';
import ky from 'ky';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useImmerReducer } from 'use-immer';
import Console from '../../Console';
import { FallbackComponent } from '../ErrorBoundary';
import FilterActions from './FilterActions';
import FilterAgent from './FilterAgent';
import FilterDate from './FilterDate';
import FilterLocation from './FilterLocation';
import FilterOffender from './FilterOffender';
import FilterOther from './FilterOther';
import { agentLookup, supervisorLookup } from './lookupData';

const vanityCheck = (agentList, loggedInUser) => {
  Console(`Filters:vanity check for ${loggedInUser.value}`);

  const agentArray = Array.from(agentList);

  return agentArray.some((item) => item.value.toLowerCase() === loggedInUser.value.toLowerCase());
};

const addOrRemove = (list, value, add) => {
  if (add) {
    list.push(value);
  } else {
    if (typeof list[0] === 'string' || list[0] instanceof String || typeof list[0] === 'number') {
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

const shortCircuitEmpties = (value) => {
  if (value === null) {
    // skipping because null value

    return true;
  }

  if (typeof value === 'string' && !value) {
    // skipping empty string

    return true;
  }

  if (Array.isArray(value) && value.length === 0) {
    // skipping empty array

    return true;
  }

  return false;
};

const countActiveFilters = (filter, state) => {
  const skipKeys = ['loggedInUser', 'vanity', 'supervisor', 'supervisorList', 'buffer', 'extent', 'point'];

  const allKeys = Object.keys(state);
  const filterKeys = allKeys.filter((filter) => !skipKeys.includes(filter));
  let activeFilters = 0;

  activeFilters = filterKeys.filter((filter) => !shortCircuitEmpties(state[filter])).length;

  if (activeFilters > 0) {
    return `${filter} (${activeFilters}/${filterKeys.length} active)`;
  }

  return filter;
};

const escapeQuotes = (value) => {
  return value.replace(/'/gm, "''");
};

const sqlMap = {
  agent: {
    agentList: (data) => `agent_id in (${data.map((agent) => `${agent.id}`).join()})`,
  },
  date: {
    compliant: (data) => `in_compliance=${data === 'in' ? 1 : 0}`,
    attempt: (data) => `last_attempted_field_contact>${data}`,
    office: (data) => `last_office_contact>${data}`,
    success: (data) => `last_successful_field_contact>${data}`,
  },
  location: {
    region: (data) => `region in (${data.join()})`,
    zip: (data) => `zip=${data}`,
    city: (data) => `city='${data.toUpperCase()}'`,
    counties: (data) => `county in (${data.map((item) => `'${item.toUpperCase()}'`).join()})`,
  },
  offender: {
    gender: (data) => `gender='${data.slice(0, 1)}'`,
    name: (data) => `offender='${escapeQuotes(data.toUpperCase())}'`,
    number: (data) => `offender_id=${parseInt(data)}`,
    tel: (data) => `offender_phone='${data}'`,
    employer: (data) => `employer='${escapeQuotes(data.toUpperCase())}'`,
  },
  other: {
    warrant: (data) => `active_warrant=${data === 'Yes' ? 1 : 0}`,
    status: (data) => `legal_status='${data.toUpperCase()}'`,
    sos: (data) => {
      const query = ['standard_of_supervision is null'];

      data = data.filter((item) => item !== 'no std');

      if (data.length > 0) {
        query.push(`standard_of_supervision in (${data.map((item) => `'${item.toUpperCase()}'`).join()})`);
      }

      return `(${query.join(' OR ')})`;
    },
    supervision: (data) => data.map((item) => `${item.id}=1`).join(' AND '),
    gang: (data) => `gang_type in (${data.map((item) => `'${item.id.toUpperCase()}'`).join()})`,
    offense: (data) => `offense_code in (${data.map((item) => `'${item.id}'`).join()})`,
  },
};

const sqlMapper = (data) => {
  Console(`Filters:generating sql`, data);

  let filterParts = [];
  let definitionExpressionParts = [];

  // agent/data/location/offender/other
  Object.keys(data).forEach((key) => {
    const metaKeys = Object.keys(sqlMap[key]);
    const criteria = Object.entries(data[key]);

    const sql = criteria
      .map(([subKey, value]) => {
        if (shortCircuitEmpties(value)) {
          return undefined;
        }

        if (!metaKeys.includes(subKey)) {
          // skipping because only interested in top level keys

          return undefined;
        }

        return sqlMap[key][subKey](value);
      })
      .filter((x) => !!x);

    if (key === 'agent' && sql) {
      sql.forEach((item) => definitionExpressionParts.push(item));

      return;
    }

    if (sql) {
      sql.forEach((item) => filterParts.push(item));
    }
  });

  return { definitionExpression: definitionExpressionParts, filter: filterParts };
};

const defaultState = {
  agent: {
    loggedInUser: null,
    agentList: [],
    supervisor: [],
    vanity: true,
  },
  date: {
    compliant: null,
    office: null,
    attempt: null,
    success: null,
  },
  location: {
    region: [],
    zip: '',
    city: '',
    counties: [],
  },
  offender: {
    gender: '',
    name: '',
    number: '',
    tel: '',
    employer: '',
  },
  other: {
    warrant: '',
    status: '',
    sos: [],
    supervision: [],
    gang: [],
    offense: [],
  },
};

const emptyState = {
  agent: {
    loggedInUser: null,
    agentList: [],
    supervisor: [],
    vanity: true,
  },
  date: {
    compliant: null,
    office: null,
    attempt: null,
    success: null,
  },
  location: {
    region: [],
    zip: '',
    city: '',
    counties: [],
  },
  offender: {
    gender: '',
    name: '',
    number: '',
    tel: '',
    employer: '',
  },
  other: {
    warrant: '',
    status: '',
    sos: [],
    supervision: [],
    gang: [],
    offense: [],
  },
};

const Filters = ({ mapDispatcher, ...props }) => {
  let initialState = { ...defaultState, ...props.initialState };
  if (initialState.agent?.loggedInUser === null) {
    initialState.agent.loggedInUser = props.loggedInUser;
    initialState.agent.agentList = [props.loggedInUser];
  }

  emptyState.agent.loggedInUser = props.loggedInUser;
  emptyState.agent.agentList = [props.loggedInUser];

  const [agents, setAgents] = useState(agentLookup);
  const [supervisors, setSupervisors] = useState(supervisorLookup);

  const filterReducer = (draft, action) => {
    Console(`Filter:reducing state ${action.type}`, action);

    switch (action.type) {
      case 'UPDATE_AGENT_LIST': {
        if (action.meta === 'agent') {
          if (action.payload.add) {
            if (
              draft.agent.agentList.some((item) => item.value.toLowerCase() === action.payload.item.value.toLowerCase())
            ) {
              return;
            }

            draft.agent.agentList = [action.payload.item].concat(draft.agent.agentList);
          } else {
            draft.agent.supervisorList = [];
            draft.agent.agentList = draft.agent.agentList.filter(
              (item) => item.value.toLowerCase() !== action.payload.item.value.toLowerCase(),
            );
          }
        } else if (action.meta === 'supervisor') {
          if (draft.agent.vanity && !vanityCheck(draft.agent.agentList, draft.agent.loggedInUser)) {
            draft.agent.agentList = agents.some(
              (item) => item.value.toLowerCase() === draft.agent.loggedInUser.value.toLowerCase(),
            );
          }

          if (!action.payload.supervisor) {
            draft.agent.agentList = [];

            if (draft.agent.vanity) {
              draft.agent.agentList = agents.some(
                (item) => item.value.toLowerCase() === draft.agent.loggedInUser.value.toLowerCase(),
              );
            }
          } else {
            draft.agent.agentList = [];
            draft.agent.supervisor = [];

            if (draft.agent.vanity) {
              draft.agent.agentList.push(draft.agent.loggedInUser);
            }

            const agentsForSupervisor = agents.filter(
              (agent) => agent.supervisor_Id.toLowerCase() === action.payload.supervisor.id.toLowerCase(),
            );

            draft.agent.supervisor = [action.payload.supervisor];
            draft.agent.agentList = draft.agent.agentList.concat(agentsForSupervisor);
          }
        }

        draft.agent.vanity = vanityCheck(draft.agent.agentList, draft.agent.loggedInUser);

        return;
      }
      case 'UPDATE_OFFENDER': {
        draft.offender[action.meta] = action.payload;

        return;
      }
      case 'UPDATE_DATE': {
        draft.date[action.meta] = action.payload;

        return;
      }
      case 'UPDATE_OTHER': {
        switch (action.meta) {
          case 'supervision':
          case 'gang':
          case 'offense': {
            draft.other[action.meta] = addOrRemove(draft.other[action.meta], action.payload.value, action.payload.add);

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
      case 'UPDATE_LOCATION': {
        switch (action.meta) {
          case 'counties': {
            draft.location[action.meta] = addOrRemove(
              draft.location[action.meta],
              action.payload.item,
              action.payload.add,
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
      case 'RESET': {
        return JSON.parse(JSON.stringify(emptyState));
      }
      default:
        throw new Error();
    }
  };

  const [criteria, dispatcher] = useImmerReducer(filterReducer, initialState);
  const { status, data } = useQuery({
    queryKey: ['lookups'],
    queryFn: () =>
      ky
        .get('/api/lookups', {
          timeout: 5000,
          redirect: 'error',
          throwHttpErrors: false,
          retry: {
            limit: 0,
          },
        })
        .json(),
  });

  const payload = sqlMapper(criteria);
  const classes = clsx({ hidden: !props.visible });

  useEffect(() => {
    if (status === 'success') {
      if ((data?.length ?? 0) > 0) {
        setAgents(data);

        const ids = new Set([]);
        const supers = [];

        data.forEach((item) => {
          if (!ids.has(item.supervisor_Id)) {
            ids.add(item.supervisor_Id);
            supers.push({ value: item.supervisor, id: item.supervisor_Id });
          }
        });

        Console(supers);
        setSupervisors(supers);
      }
    }
  }, [data, status]);

  useEffect(() => {
    mapDispatcher({
      type: 'SET_FILTERS',
      payload: {
        filters: payload,
        criteria: {
          agents: criteria.agent.agentList.map((item) => item.id),
          offender: { ...criteria.offender },
          location: { ...criteria.location },
          date: { ...criteria.date },
          other: { ...criteria.other },
        },
      },
    });
    // React guarantees that dispatch function identity is stable and won’t change on re-renders.
    // This is why it’s safe to omit from the useEffect or useCallback dependency list.
  }, [mapDispatcher, payload, criteria]);

  return (
    <section className={classes}>
      <DisclosureGroup allowsMultipleExpanded={true}>
        <Disclosure defaultExpanded={true}>
          <DisclosureHeader>{countActiveFilters('Agent', criteria.agent)}</DisclosureHeader>
          <DisclosurePanel>
            <ErrorBoundary FallbackComponent={FallbackComponent}>
              <FilterAgent data={{ agents, supervisors }} criteria={criteria.agent} update={dispatcher} />
            </ErrorBoundary>
          </DisclosurePanel>
        </Disclosure>
        <Disclosure>
          <DisclosureHeader>{countActiveFilters('Offender', criteria.offender)}</DisclosureHeader>
          <DisclosurePanel>
            <ErrorBoundary FallbackComponent={FallbackComponent}>
              <FilterOffender featureSet={props.featureSet} criteria={criteria.offender} update={dispatcher} />
            </ErrorBoundary>
          </DisclosurePanel>
        </Disclosure>
        <Disclosure>
          <DisclosureHeader>{countActiveFilters('Location', criteria.location)}</DisclosureHeader>
          <DisclosurePanel>
            <ErrorBoundary FallbackComponent={FallbackComponent}>
              <FilterLocation criteria={criteria.location} update={dispatcher} featureSet={props.featureSet} />
            </ErrorBoundary>
          </DisclosurePanel>
        </Disclosure>
        <Disclosure>
          <DisclosureHeader>{countActiveFilters('Supervision Contact', criteria.date)}</DisclosureHeader>
          <DisclosurePanel>
            <ErrorBoundary FallbackComponent={FallbackComponent}>
              <FilterDate criteria={criteria.date} update={dispatcher} />
            </ErrorBoundary>
          </DisclosurePanel>
        </Disclosure>
        <Disclosure>
          <DisclosureHeader>{countActiveFilters('Other', criteria.other)}</DisclosureHeader>
          <DisclosurePanel>
            <ErrorBoundary FallbackComponent={FallbackComponent}>
              <FilterOther criteria={criteria.other} update={dispatcher} />
            </ErrorBoundary>
          </DisclosurePanel>
        </Disclosure>
        <FilterActions
          reset={() => dispatcher({ type: 'RESET', payload: props.loggedInUser })}
          show={() => mapDispatcher({ type: 'TOGGLE_SIDEBAR', payload: true })}
        />
      </DisclosureGroup>
    </section>
  );
};
Filters.propTypes = {
  mapDispatcher: PropTypes.func.isRequired,
  loggedInUser: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  appliedFilter: PropTypes.string.isRequired,
  featureSet: PropTypes.object.isRequired,
  initialState: PropTypes.object,
};

export { Filters, sqlMap, sqlMapper };
