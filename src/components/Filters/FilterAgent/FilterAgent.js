import React, { useState } from 'react';
import { FormGroup, Container, Col, Button, Input, Label, InputGroup, InputGroupAddon } from 'reactstrap';
import Downshift from 'downshift'
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

export default function FilterAgent() {
    const loggedInUser = 'logged in user';
    const [agents, setAgent] = useState([loggedInUser]);

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
    };

    const addAgentsForSupervisor = supervisorName => {

        const updates = new Set();

        if (vanityCheck()) {
            updates.add(loggedInUser);
        }

        if (!supervisorName) {
            updates.clear();

            if (vanityCheck()) {
                updates.add(loggedInUser);
            }
        } else {
            testData.agents
                .filter(agent => agent.supervisor.toLowerCase() === supervisorName.toLowerCase())
                .forEach(item => updates.add(item.value));
        }

        setAgent(Array.from(updates));
    };

    const vanityCheck = () => agents.indexOf(loggedInUser) > -1;

    return (
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
                        itemToString={item => (item ? item.value : '')}>
                        {({
                            getInputProps,
                            getMenuProps,
                            getItemProps,
                            isOpen,
                            clearSelection,
                            inputValue,
                            highlightedIndex,
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

                                                        const value = testData.agents
                                                            .filter(item => inputValue && agents.indexOf(item.value) === -1 && item.value.toLowerCase().includes(inputValue.toLowerCase()))[highlightedIndex];

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
                                                            updateAgents(selectedItem.value, true);
                                                            clearSelection();

                                                            break;
                                                        }

                                                        highlightedIndex = highlightedIndex || 0;

                                                        const value = testData.agents
                                                            .filter(item => inputValue && agents.indexOf(item.value) === -1 && item.value.toLowerCase().includes(inputValue.toLowerCase()))[highlightedIndex];

                                                        if (value) {
                                                            setState({
                                                                selectedItem: value,
                                                                inputValue: value.value
                                                            }, () => clearSelection());

                                                            updateAgents(value.value, true);
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
                                                    updateAgents(selectedItem.value, true);
                                                    clearSelection();
                                                }
                                            }}>Add</Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <div className="downshift__match-dropdown" {...getMenuProps()}>
                                        <ul className="downshift__matches">
                                            {isOpen
                                                ?
                                                testData.agents
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
                        itemToString={item => (item ? item.value : '')}>
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

                                                        const value = testData.supervisors
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

                                                        let value = testData.supervisors
                                                            .filter(item => inputValue && agents.indexOf(item.value) === -1 && item.value.toLowerCase().includes(inputValue.toLowerCase()))[highlightedIndex];

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
                            )
                        }}
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
    )
}
