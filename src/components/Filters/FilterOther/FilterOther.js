import React, { useState } from 'react';
import { Button, ButtonGroup, FormGroup, Label, Input, Container, Col } from 'reactstrap'
import './FilterOther.css';

export default function FilterOther() {
    const [warrant, setWarrant] = useState();

    return (
        <Container fluid className="filter-other">
            <Col>
                <FormGroup>
                    <Label>Legal Status</Label>
                    <Input type="text" name="status" id="status" />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>Standard of Supervision</Label>
                    <Input type="text" name="sos" id="sos" />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>Special Supervision</Label>
                    <Input type="text" name="supervision" id="supervision" />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>STG</Label>
                    <Input type="text" name="stg" id="stg" />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>Offense Type</Label>
                    <Input type="text" name="offense" id="offense" />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>Active Warrant</Label>
                    <div className="text-center">
                        <ButtonGroup>
                            {['Yes', 'No'].map((binary, index) =>
                                <Button
                                    key={index}
                                    size="sm"
                                    color={warrant === binary ? 'warning' : 'secondary'}
                                    onClick={() => setWarrant(binary)}>
                                    {binary}
                                </Button>
                            )}
                        </ButtonGroup>
                    </div>
                </FormGroup>
            </Col>
        </Container>
    )
}
