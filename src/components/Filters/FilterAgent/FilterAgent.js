import React from 'react';
import { FormGroup, Container, Col, Button, ButtonGroup } from 'reactstrap'
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
            </Container>
            : null
    )
}
