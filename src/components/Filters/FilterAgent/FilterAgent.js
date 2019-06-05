import React from 'react';
import { FormGroup, Label, Input, Container, Col, Button, ButtonGroup } from 'reactstrap'
import './FilterAgent.css';

export default function FilterAgent(props) {
    return (
        props.active === 'Agent' ?
            <Container fluid className="filter-agent">
                <Col>
                    <FormGroup>
                        <ButtonGroup>
                            <Button outline color="secondary">My</Button>
                            <Button outline color="secondary">Agent</Button>
                            <Button outline color="secondary">Supervisor</Button>
                        </ButtonGroup>
                    </FormGroup>
                </Col>
                <Col>
                    <h3>OR</h3>
                </Col>
                <Col>
                    <FormGroup>
                        <Label>My offenders</Label>
                        <Input type="select" name="my-offenders" id="my-offenders">
                            <option disabled defaultValue>Choose</option>
                            <option>Offender Name</option>
                            <option>Offender Name 2</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label>Agent offenders</Label>
                        <Input type="select" name="agent-offenders" id="agent-offenders">
                            <option disabled defaultValue>Choose</option>
                            <option>Agent Name</option>
                            <option>Agent Name 2</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label>Supervisor offenders</Label>
                        <Input type="select" name="supervisor-offenders" id="supervisor-offenders">
                            <option disabled defaultValue>Choose</option>
                            <option>Supervisor Name</option>
                            <option>Supervisor Name 2</option>
                        </Input>
                    </FormGroup>
                </Col>
            </Container>
            : null
    )
}
