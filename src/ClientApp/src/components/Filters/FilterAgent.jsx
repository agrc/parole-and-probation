import { ToggleButton } from '@ugrc/utah-design-system';
import PropTypes from 'prop-types';
import Console from '../../Console';
import { MultiSelect, SelectedItems } from '../Combobox/Combobox';

const getAgent = (id, agents) => {
  return agents.filter((item) => item.id === id)[0];
};

export default function FilterAgent(props) {
  const updateAgents = (item, add) => {
    if (!item || !item.value) {
      return;
    }

    Console(`Filters/FilterAgent:${add ? 'adding' : 'removing'} agent list for ${item.value}`);

    props.update({
      type: 'UPDATE_AGENT_LIST',
      meta: 'agent',
      payload: {
        item,
        add,
      },
    });
  };

  const addAgentsForSupervisor = (item) => {
    props.update({
      type: 'UPDATE_AGENT_LIST',
      meta: 'supervisor',
      payload: {
        supervisor: item,
      },
    });
  };

  return (
    <div className="w-full">
      <div className="grid gap-2">
        <ToggleButton
          className="w-full"
          isSelected={props.criteria.vanity}
          onChange={() => updateAgents(props.criteria.loggedInUser, !props.criteria.vanity)}
        >
          Me
        </ToggleButton>
        <MultiSelect
          label="Agent"
          items={props.data.agents}
          itemToString={(item) => (item ? item.value : '')}
          itemToKey={(item) => item.id}
          currentSelectedItems={props.criteria.agentList}
          onSelectItem={(item) => updateAgents(item, true)}
        />
        <MultiSelect
          label="Supervisor"
          items={props.data.supervisors}
          itemToString={(item) => (item ? item.value : '')}
          itemToKey={(item) => item.id}
          currentSelectedItems={props.criteria.supervisor}
          onSelectItem={(item) => addAgentsForSupervisor(item)}
        />
      </div>
      <div className="mt-2">
        {props.criteria.agentList.length > 0 ? (
          <>
            <SelectedItems
              label="Filtering Offenders For"
              items={props.criteria.agentList}
              itemToString={(item) => item.value}
              itemToKey={(item) => item.id}
              clickHandler={(keys) => {
                const agent = getAgent(parseInt([...keys][0]), props.criteria.agentList);
                updateAgents(agent, false);
              }}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
FilterAgent.propTypes = {
  criteria: PropTypes.shape({
    vanity: PropTypes.bool.isRequired,
    loggedInUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    agentList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ).isRequired,
    supervisor: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  data: PropTypes.shape({
    agents: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ).isRequired,
    supervisors: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  update: PropTypes.func.isRequired,
};
