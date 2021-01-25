import { startCase } from 'lodash/string';
import * as React from 'react';
import { Button, Card, CardBody, Col, Container, FormGroup, Label } from 'reactstrap';
import Dropdown from '../../Combobox';
import '../Filters.css';
import './FilterAgent.css';


const getAgent = (id, agents) => {
  return agents.filter(item => item.id === id)[0];
};

const SelectedItems = ({ items, clickHandler }) => (
  <Card className="mb-3 p-3">
    <CardBody className="filter-other__items-container p-0">
      {items.map(item => (
        <Button className="mb-1" color="secondary" size="sm" outline id={item.id} key={item.id} onClick={clickHandler}>
          {startCase(item.value.toLowerCase())}
        </Button>
      ))}
    </CardBody>
  </Card>
);

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
        add
      }
    });
  };

  const addAgentsForSupervisor = supervisorName => {
    props.update({
      type: 'UPDATE_AGENT_LIST',
      meta: 'supervisor',
      payload: {
        supervisorName
      }
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
          >Me</Button>
        </FormGroup>
        <FormGroup>
          <Label>Agent</Label>
          <Dropdown
            items={props.data.agents}
            itemPropName="id"
            isEmpty={props.criteria.agentList.length < 1}
            alreadySelected={props.criteria.agentList.map(x => x.id)}
            onSelectItem={item => updateAgents(item, true)}
            ></Dropdown>
        </FormGroup>
        <FormGroup>
          <Label>Supervisor</Label>
          <Dropdown
            items={props.data.supervisors}
            itemPropName="value"
            isEmpty={props.criteria.supervisor === null}
            alreadySelected={props.criteria.supervisor}
            onSelectItem={item => addAgentsForSupervisor(item.value)}
            ></Dropdown>
        </FormGroup>
      </Col>
      <Col>
        {props.criteria.agentList.length > 0 ? <>
          <Label>Filtering Offenders For</Label>
          <SelectedItems items={props.criteria.agentList} clickHandler={event => {
            const agent = getAgent(parseInt(event.target.id), props.criteria.agentList);

            updateAgents(agent, false)
          }} />
        </>
        : null }
      </Col>
    </Container>
  )
}
