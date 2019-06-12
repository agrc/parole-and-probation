import React, { useState } from 'react';
import { FormGroup, Container, Col, Button, Input, Label, InputGroup, InputGroupAddon } from 'reactstrap';
import Downshift from 'downshift'
import useDownshiftState from '../useDownshiftState';
import './FilterAgent.css';

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

export default function FilterAgent(props) {
    const loggedInUser = 'logged in user';
    const [agents, setAgent] = useState([loggedInUser]);
    const agent = useDownshiftState();
    const supervisor = useDownshiftState();

    const updateAgents = (agentName, add) => {
        if (!agentName) {
            return;
        }

        const updates = new Set();

        if (add) {
            updates.add(agentName);
            agents.forEach(item => updates.add(item));
        } else {
            agents.forEach(item => updates.add(item));
            updates.delete(agentName);
        }

        setAgent(Array.from(updates));
        agent.reset()
    };

    const addAgentsForSupervisor = supervisorName => {
        const updates = new Set();

        if (vanityCheck()) {
            updates.add(loggedInUser);
        }

        testData.agents
            .filter(agent => agent.supervisor.toLowerCase() === supervisorName.toLowerCase())
            .forEach(item => updates.add(item.value));

        if (!supervisorName) {
            updates.clear();

            if (vanityCheck()) {
                updates.add(loggedInUser);
            }
        }

        setAgent(Array.from(updates));

        supervisor.reset();
    };

    const vanityCheck = () => agents.indexOf(loggedInUser) > -1;

    return (
        props.active === 'Agent' ?
            <Container fluid className="filter-agent">
                <Col>
                    <FormGroup>
                        <Button
                            size="sm"
                            block
                            color={vanityCheck() ? 'warning' : 'secondary'}
                            onClick={() => updateAgents(loggedInUser, !vanityCheck())}>Me</Button>
                    </FormGroup>
                    <FormGroup>
                        <Label>Agent</Label>
                        <Downshift
                            onChange={agent.onChange}
                            stateReducer={(_, changes) => {
                                switch (changes.type) {
                                    case Downshift.stateChangeTypes.blurInput: {
                                        return {
                                            ...changes,
                                            isOpen: false,
                                            inputValue: agent.value
                                        }
                                    }
                                    case Downshift.stateChangeTypes.clickItem: {
                                        return {
                                            ...changes,
                                            isOpen: false,
                                            inputValue: changes.inputValue,
                                            selectedItem: changes.inputValue
                                        }
                                    }
                                    default: {
                                        return changes
                                    }
                                }
                            }}
                            itemToString={item => (item ? item.value : '')}>
                            {({
                                getInputProps,
                                getMenuProps,
                                getItemProps,
                                isOpen,
                                clearSelection,
                                inputValue,
                                highlightedIndex,
                            }) => (
                                    <div>
                                        <InputGroup>
                                            <Input {...getInputProps({
                                                onKeyDown: event => {
                                                    switch (event.key) {
                                                        case 'Tab': {
                                                            const { value } = testData.agents
                                                                .filter(item => inputValue && agents.indexOf(item.value) === -1 && item.value.toLowerCase().includes(inputValue.toLowerCase()))[0];
                                                            agent.onChange(value);
                                                            break;
                                                        }
                                                        case 'Enter': {
                                                            updateAgents(agent.value, true);
                                                            clearSelection();
                                                            break;
                                                        }
                                                        default:
                                                            break;
                                                    }
                                                }
                                            })} />
                                            <InputGroupAddon addonType="append">
                                                <Button onClick={() => {
                                                    updateAgents(agent.value, true);
                                                    clearSelection();
                                                }}>Add</Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        <div className="downshift__match-dropdown" {...getMenuProps()}>
                                            <ul className="downshift__matches">
                                                {isOpen
                                                    ? testData.agents
                                                        .filter(item => inputValue && agents.indexOf(item.value) === -1 && item.value.toLowerCase().includes(inputValue.toLowerCase()))
                                                        .map((item, index) => (
                                                            <li {...getItemProps({
                                                                key: item.value,
                                                                index,
                                                                item,
                                                                className: 'downshift__match-item' + (highlightedIndex === index ? ' downshift__match-item--selected' : '')
                                                            })}>
                                                                {item.value}
                                                            </li>
                                                        ))
                                                    : null}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                        </Downshift>
                    </FormGroup>
                    <FormGroup>
                        <Label>Supervisor</Label>
                        <Downshift
                            onChange={supervisor.onChange}
                            stateReducer={(_, changes) => {
                                switch (changes.type) {
                                    case Downshift.stateChangeTypes.blurInput: {
                                        return {
                                            ...changes,
                                            isOpen: false,
                                            inputValue: supervisor.value
                                        }
                                    }
                                    case Downshift.stateChangeTypes.clickItem: {
                                        return {
                                            ...changes,
                                            isOpen: false,
                                            inputValue: changes.inputValue,
                                            selectedItem: changes.inputValue
                                        }
                                    }
                                    default: {
                                        return changes
                                    }
                                }
                            }}
                            itemToString={item => (item ? item.value : '')}>
                            {({
                                getInputProps,
                                getMenuProps,
                                getItemProps,
                                isOpen,
                                clearSelection,
                                inputValue,
                                highlightedIndex,
                            }) => (
                                    <div>
                                        <InputGroup>
                                            <Input {...getInputProps({
                                                onKeyDown: event => {
                                                    switch (event.key) {
                                                        case 'Tab': {
                                                            const { value } = testData.supervisors
                                                                .filter(item => inputValue && item.value.toLowerCase().includes(inputValue.toLowerCase()))[0];
                                                            supervisor.onChange(value);
                                                            break;
                                                        }
                                                        case 'Enter': {
                                                            addAgentsForSupervisor(supervisor.value);
                                                            clearSelection();
                                                            break;
                                                        }
                                                        default:
                                                            break;
                                                    }
                                                }
                                            })} />
                                            <InputGroupAddon addonType="append">
                                                <Button onClick={() => {
                                                    addAgentsForSupervisor(supervisor.value);
                                                    clearSelection();
                                                }}>Set</Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        <div className="downshift__match-dropdown" {...getMenuProps()}>
                                            <ul className="downshift__matches">
                                                {isOpen
                                                    ? testData.supervisors
                                                        .filter(item => !inputValue || item.value.toLowerCase().includes(inputValue.toLowerCase()))
                                                        .map((item, index) => (
                                                            <li {...getItemProps({
                                                                key: item.value,
                                                                index,
                                                                item,
                                                                className: 'downshift__match-item' + (highlightedIndex === index ? ' downshift__match-item--selected' : '')
                                                            })}>
                                                                {item.value}
                                                            </li>
                                                        ))
                                                    : null}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                        </Downshift>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label>Agent List</Label>
                        <Input type="select" multiple readOnly
                            onDoubleClick={event => updateAgents(event.target.value, false)}>
                            {agents.map((agent, key) => (
                                <option key={key}>{agent}</option>
                            ))}
                        </Input>
                    </FormGroup>
                </Col>
            </Container>
            : null
    )
}
