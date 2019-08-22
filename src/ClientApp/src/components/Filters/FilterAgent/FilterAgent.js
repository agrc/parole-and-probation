import React from 'react';
import { Card, CardBody, FormGroup, Container, Col, Button, Input, Label, InputGroup, InputGroupAddon } from 'reactstrap';
import Downshift from 'downshift'
import { startCase } from 'lodash/string';
import './FilterAgent.css';


export default function FilterAgent(props) {
    const getAgent = (id, agents) => {
        return agents.filter(item => item.id === id)[0];
    }

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
                    <Downshift
                        stateReducer={(_, changes) => {
                            console.log(`reducing ${changes.type}`);

                            switch (changes.type) {
                                case Downshift.stateChangeTypes.changeInput: {
                                    return {
                                        ...changes,
                                        selectedItem: null
                                    }
                                }
                                default: {
                                    return changes
                                }
                            }
                        }}
                        itemToString={item => (item ? startCase(item.value.toLowerCase()) : '')}>
                        {({
                            clearSelection,
                            getInputProps,
                            getItemProps,
                            getMenuProps,
                            highlightedIndex,
                            inputValue,
                            isOpen,
                            selectedItem,
                            setState,
                        }) => {
                            if (highlightedIndex === null) {
                                highlightedIndex = 0;
                            }

                            return (
                                <div>
                                    <InputGroup>
                                        <Input {...getInputProps({
                                            onKeyDown: event => {
                                                switch (event.key) {
                                                    case 'Tab': {
                                                        highlightedIndex = highlightedIndex || 0;

                                                        const value = props.data.agents
                                                            .filter(item => inputValue && props.criteria.agentList.indexOf(item.value) === -1 && item.value.toLowerCase().includes(inputValue.toLowerCase()))[highlightedIndex];

                                                        if (value) {
                                                            setState({
                                                                selectedItem: value,
                                                                inputValue: value.value,
                                                                isOpen: false
                                                            });
                                                        }

                                                        break;
                                                    }
                                                    case 'Enter': {
                                                        if (selectedItem) {
                                                            updateAgents(selectedItem, true);
                                                            clearSelection();

                                                            break;
                                                        }

                                                        highlightedIndex = highlightedIndex || 0;

                                                        const value = props.data.agents
                                                            .filter(item => inputValue && props.criteria.agentList.indexOf(item.value) === -1 && item.value.toLowerCase().includes(inputValue.toLowerCase()))[highlightedIndex];

                                                        if (value) {
                                                            setState({
                                                                selectedItem: value,
                                                                inputValue: value.value
                                                            }, () => clearSelection());

                                                            updateAgents(value, true);
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
                                                    clearSelection();
                                                }
                                            }}>Add</Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <div className="downshift__match-dropdown" {...getMenuProps()}>
                                        <ul className="downshift__matches">
                                            {isOpen
                                                ?
                                                props.data.agents
                                                    .filter(item => inputValue && props.criteria.agentList.indexOf(item.value) === -1 && item.value.toLowerCase().includes(inputValue.toLowerCase()))
                                                    .map((item, index) => (
                                                        <li {...getItemProps({
                                                            key: item.value,
                                                            index,
                                                            item,
                                                            className: 'downshift__match-item' + (highlightedIndex === index ? ' downshift__match-item--selected' : '')
                                                        })}>
                                                            {startCase(item.value.toLowerCase())}
                                                        </li>
                                                    ))
                                                : null}
                                        </ul>
                                    </div>
                                </div>
                            )
                        }}
                    </Downshift>
                </FormGroup>
                <FormGroup>
                    <Label>Supervisor</Label>
                    <Downshift
                        stateReducer={(_, changes) => {
                            console.log(`reducing ${changes.type}`);

                            switch (changes.type) {
                                case Downshift.stateChangeTypes.changeInput: {
                                    return {
                                        ...changes,
                                        selectedItem: null
                                    }
                                }
                                default: {
                                    return changes
                                }
                            }
                        }}
                        itemToString={item => (item ? startCase(item.value.toLowerCase()) : '')}>
                        {({
                            getInputProps,
                            getMenuProps,
                            getItemProps,
                            isOpen,
                            clearSelection,
                            inputValue,
                            highlightedIndex,
                            selectedItem,
                            setState
                        }) => {
                            if (highlightedIndex === null) {
                                highlightedIndex = 0;
                            }

                            return (
                                <div>
                                    <InputGroup>
                                        <Input {...getInputProps({
                                            onKeyDown: event => {
                                                switch (event.key) {
                                                    case 'Tab': {
                                                        highlightedIndex = highlightedIndex || 0;

                                                        const value = props.data.supervisors
                                                            .filter(item => inputValue && item.value.toLowerCase().includes(inputValue.toLowerCase()))[highlightedIndex];

                                                        if (value) {
                                                            setState({
                                                                selectedItem: value,
                                                                inputValue: value.value,
                                                                isOpen: false
                                                            });
                                                        }

                                                        break;
                                                    }
                                                    case 'Enter': {
                                                        if (selectedItem) {
                                                            addAgentsForSupervisor(selectedItem.value);
                                                            clearSelection();

                                                            break;
                                                        }

                                                        highlightedIndex = highlightedIndex || 0;

                                                        let value = props.data.supervisors
                                                            .filter(item => inputValue && props.criteria.agentList.indexOf(item.value) === -1 && item.value.toLowerCase().includes(inputValue.toLowerCase()))[highlightedIndex];

                                                        if (value) {
                                                            setState({
                                                                selectedItem: value,
                                                                inputValue: value.value
                                                            }, () => clearSelection());

                                                            value = value.value;
                                                        }

                                                        addAgentsForSupervisor(value);

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
                                                    clearSelection();
                                                } else {
                                                    addAgentsForSupervisor()
                                                }
                                            }}>Set</Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <div className="downshift__match-dropdown" {...getMenuProps()}>
                                        <ul className="downshift__matches">
                                            {isOpen
                                                ? props.data.supervisors
                                                    .filter(item => !inputValue || item.value.toLowerCase().includes(inputValue.toLowerCase()))
                                                    .map((item, index) => (
                                                        <li {...getItemProps({
                                                            key: item.value,
                                                            index,
                                                            item,
                                                            className: 'downshift__match-item' + (highlightedIndex === index ? ' downshift__match-item--selected' : '')
                                                        })}>
                                                            {startCase(item.value.toLowerCase())}
                                                        </li>
                                                    ))
                                                : null}
                                        </ul>
                                    </div>
                                </div>
                            )
                        }}
                    </Downshift>
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
                                    {item.value}
                                </Button>
                            ))}
                        </CardBody>
                    </Card>
                </> : null}
            </Col>
        </Container>
    )
}
