import React, { useState } from 'react';
import { FormGroup, Container, Col, Button, Input, Label, InputGroup, InputGroupAddon } from 'reactstrap';
import useInputState from '../useInputState';
import './FilterAgent.css';

export default function FilterAgent(props) {
    const loggedInUser = 'logged in user';
    const [agents, setAgent] = useState([loggedInUser]);
    const agent = useInputState();
    const supervisor = useInputState();

    const updateAgents = (agentName, add) => {
        if (!agentName) {
            return;
        }

        const updates = new Set();

        if (add) {
            updates.add(agentName);
            agents.forEach((item) => updates.add(item));
        } else {
            agents.forEach((item) => updates.add(item));
            updates.delete(agentName);
        }

        setAgent(Array.from(updates));
        agent.reset()
    };

    const addAgentsForSupervisor = (supervisorName) => {
        const updates = new Set();

        if (vanityCheck()) {
            updates.add(loggedInUser);
        }

        ['sarah', 'george', 'mike'].forEach((item) => updates.add(item));

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
                        <InputGroup>
                            <Input type="text"
                                onChange={agent.onChange}
                                onKeyPress={(event) => {
                                    if (event.key !== 'Enter') {
                                        return;
                                    }

                                    updateAgents(agent.value, true);
                                }}
                                value={agent.value} />
                            <InputGroupAddon addonType="append">
                                <Button onClick={() => updateAgents(agent.value, true)}>Add</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label>Supervisor</Label>
                        <InputGroup>
                            <Input type="text"
                                onChange={supervisor.onChange}
                                onKeyPress={(event) => {
                                    if (event.key !== 'Enter') {
                                        return;
                                    }

                                    addAgentsForSupervisor(supervisor.value);
                                }}
                                value={supervisor.value} />
                            <InputGroupAddon addonType="append">
                                <Button onClick={() => addAgentsForSupervisor(supervisor.value)}>Set</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label>Agent List</Label>
                        <Input type="select" multiple readOnly
                            onDoubleClick={(event) => updateAgents(event.target.value, false)}>
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
