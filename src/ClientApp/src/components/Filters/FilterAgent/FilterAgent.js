import * as React from 'react';
import { Button, Col, Container, FormGroup, Label } from 'reactstrap';
import { Dropdown, SelectedItems } from '../../Combobox';
import '../Filters.css';
import './FilterAgent.css';

const getAgent = (id, agents) => {
  return agents.filter((item) => item.id === id)[0];
};

export default function FilterAgent(props) {
  const updateAgents = (item, add) => {
    console.info('Filters/FilterAgent:updateAgents');

    if (!item || !item.value) {
      return;
    }

    console.log(`${add ? 'adding' : 'removing'} agent list for ${item.value}`);

    props.update({
      type: 'UPDATE_AGENT_LIST',
      meta: 'agent',
      payload: {
        item,
        add,
      },
    });
  };

  const addAgentsForSupervisor = (supervisorName) => {
    props.update({
      type: 'UPDATE_AGENT_LIST',
      meta: 'supervisor',
      payload: {
        supervisorName,
      },
    });
  };

  return (
    <Container fluid className="filter-agent">
      <Col>
        <FormGroup>
          <Button
            size="sm"
            block
            color={props.criteria.vanity ? 'warning' : 'secondary'}
            onClick={() => updateAgents(props.criteria.loggedInUser, !props.criteria.vanity)}
          >
            Me
          </Button>
        </FormGroup>
        <FormGroup>
          <Label>Agent</Label>
          <Dropdown
            items={props.data.agents}
            itemToString={(item) => (item ? item.value : '')}
            itemToKey={(item) => item.id}
            currentSelectedItems={props.criteria.agentList}
            onSelectItem={(item) => updateAgents(item, true)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Supervisor</Label>
          <Dropdown
            items={props.data.supervisors}
            itemToString={(item) => (item ? item.value : '')}
            itemToKey={(item) => item.value}
            currentSelectedItems={props.criteria.supervisor}
            onSelectItem={(item) => addAgentsForSupervisor(item.value)}
          />
        </FormGroup>
      </Col>
      <Col>
        {props.criteria.agentList.length > 0 ? (
          <>
            <Label>Filtering Offenders For</Label>
            <SelectedItems
              items={props.criteria.agentList}
              itemToString={(item) => item.value}
              itemToKey={(item) => item.id}
              clickHandler={(event) => {
                const agent = getAgent(parseInt(event.target.id), props.criteria.agentList);

                updateAgents(agent, false);
              }}
            />
          </>
        ) : null}
      </Col>
    </Container>
  );
}
