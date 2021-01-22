import { useCombobox } from 'downshift';
import { startCase } from 'lodash/string';
import * as React from 'react';
import { Button, Card, CardBody, Col, Container, FormGroup, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap';
import '../Filters.css';
import './FilterAgent.css';


const getAgent = (id, agents) => {
  return agents.filter(item => item.id === id)[0];
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

  const AgentDropdown = ({ items }) => {
    const [inputItems, setInputItems] = React.useState(items);

    const {
      isOpen,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps,
      selectItem,
      selectedItem
    } = useCombobox({
      items: inputItems,
      defaultHighlightedIndex: 0,
      itemToString: item => (item ? startCase(item.value.toLowerCase()) : ''),
      onInputValueChange: ({ inputValue }) => {
        const filteredItems = items.filter(item =>
          item.value.toLowerCase().startsWith(inputValue.toLowerCase())
        );

        if (props.criteria.agentList.length < 1) {
          return setInputItems(filteredItems);
        }

        const alreadySelected = props.criteria.agentList.map(x => x.id);

        const difference = filteredItems.filter(x => !alreadySelected.includes(x.id))

        setInputItems(difference);
      },
    })
    return (
      <div {...getComboboxProps()}>
        <InputGroup>
          <Input {...getInputProps({
            onKeyDown: event => {
              switch (event.key) {
                case 'Enter': {
                  if (selectedItem) {
                    updateAgents(selectedItem, true);
                    selectItem(null);
                  }
                  break;
                }
                default:
                  break;
              }
            }
          })} />
          <InputGroupAddon addonType="append">
            <Button onClick={() => {
              if (selectedItem) {
                updateAgents(selectedItem, true);
                selectItem(null);
              }
            }}>Add</Button>
          </InputGroupAddon>
        </InputGroup>

        <div className="downshift__match-dropdown" {...getMenuProps({
          onClick: () => {
            const selectedItem = inputItems[highlightedIndex];
            updateAgents(selectedItem, true);
            selectItem(null);
          }
        })}>
          <ul className="downshift__matches">
            {isOpen &&
              inputItems
                .map((item, index) => (
                  <li {...getItemProps({
                    item,
                    index,
                    key: item.id,
                    className: 'downshift__match-item' + (highlightedIndex === index ? ' downshift__match-item--selected' : '')
                  })}>
                    {startCase(item.value.toLowerCase())}
                  </li>
                ))}
          </ul>
        </div>
      </div>
    )
  };

  const SupervisorDropdown = ({ items }) => {
    const [inputItems, setInputItems] = React.useState(items);

    const {
      isOpen,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps,
      selectItem,
      selectedItem
    } = useCombobox({
      items: inputItems,
      defaultHighlightedIndex: 0,
      itemToString: item => (item ? startCase(item.value.toLowerCase()) : ''),
      onInputValueChange: ({ inputValue }) => {
        const filteredItems = items.filter(item =>
          item.value.toLowerCase().startsWith(inputValue.toLowerCase())
        );

        if (props.criteria.supervisor === null) {
          return setInputItems(filteredItems);
        }

        const alreadySelected = props.criteria.supervisor;

        const difference = filteredItems.filter(x => !alreadySelected.includes(x.value));

        setInputItems(difference);
      },
    })
    return (
      <div {...getComboboxProps()}>
        <InputGroup>
          <Input {...getInputProps({
            onKeyDown: event => {
              switch (event.key) {
                case 'Enter': {
                  if (selectedItem) {
                    addAgentsForSupervisor(selectedItem.value);
                    selectItem(null);
                  }
                  break;
                }
                default:
                  break;
              }
            }
          })} />
          <InputGroupAddon addonType="append">
            <Button onClick={() => {
              if (selectedItem) {
                addAgentsForSupervisor(selectedItem.value);
                selectItem(null);
              }
            }}>Set</Button>
          </InputGroupAddon>
        </InputGroup>

        <div className="downshift__match-dropdown" {...getMenuProps({
          onClick: () => {
            const selectedItem = inputItems[highlightedIndex];
            addAgentsForSupervisor(selectedItem.value);
            selectItem(null);
          }
        })}>
          <ul className="downshift__matches">
            {isOpen &&
              inputItems
                .map((item, index) => (
                  <li {...getItemProps({
                    item,
                    index,
                    key: item.id,
                    className: 'downshift__match-item' + (highlightedIndex === index ? ' downshift__match-item--selected' : '')
                  })}>
                    {startCase(item.value.toLowerCase())}
                  </li>
                ))}
          </ul>
        </div>
      </div>
    )
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
          <AgentDropdown items={props.data.agents}></AgentDropdown>
        </FormGroup>
        <FormGroup>
          <Label>Supervisor</Label>
          <SupervisorDropdown items={props.data.supervisors}></SupervisorDropdown>
        </FormGroup>
      </Col>
      <Col>
        {props.criteria.agentList.length > 0 ? <>
          <Label>Filtering Offenders For</Label>
          <Card className="mb-3 p-3">
            <CardBody className="filter-other__items-container p-0">
              {props.criteria.agentList.map(item => (
                <Button className="mb-1" color="secondary" size="sm" outline id={item.id} key={item.id} onClick={
                  event => {
                    const agent = getAgent(parseInt(event.target.id), props.criteria.agentList);

                    updateAgents(agent, false)
                  }}>
                  {startCase(item.value.toLowerCase())}
                </Button>
              ))}
            </CardBody>
          </Card>
        </> : null}
      </Col>
    </Container>
  )
}
