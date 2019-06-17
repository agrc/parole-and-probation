import React, { useState } from 'react';
import { Button, ButtonGroup, FormGroup, Label, Input, Container, Col } from 'reactstrap'
import './FilterOffender.css';

export default function FilterOffender() {
    const [active, setActive] = useState();

    return (
        <Container fluid className="filter-offender">
            <Col>
                <FormGroup>
                    <Label>Name</Label>
                    <Input type="text" name="name" id="name" />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>Offender Number</Label>
                    <Input type="number" name="number" id="number" />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>Gender</Label>
                    <div className="text-center">
                        <ButtonGroup>
                            {['Male', 'Female'].map((gender, index) =>
                                <Button
                                    key={index}
                                    size="sm"
                                    color={active === gender ? 'warning' : 'secondary'}
                                    onClick={() => {
                                        if (active === gender) {
                                            gender = null;
                                        }

                                        setActive(gender);
                                    }}>
                                    {gender}
                                </Button>
                            )}
                        </ButtonGroup>
                    </div>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>Phone</Label>
                    <Input type="tel" name="phone" id="phone" />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>Employer</Label>
                    <Input type="text" name="employer" id="employer" />
                </FormGroup>
            </Col>
        </Container>
    )
}
