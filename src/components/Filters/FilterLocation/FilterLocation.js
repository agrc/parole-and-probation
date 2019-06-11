import React, { useState } from 'react';
import { Button, ButtonGroup, FormGroup, Label, Input, Container, Col } from 'reactstrap'
import './FilterLocation.css';

export default function FilterLocation(props) {
    const [active, setActive] = useState();

    return (
        props.active === 'Location' ?
            <Container fluid className="filter-location">
                <Col>
                    <FormGroup>
                        <Label>Location</Label>
                        <div className="text-center">
                            <ButtonGroup>
                                {['Current', 'Select', 'Input'].map((type, index) =>
                                    <Button
                                        key={index}
                                        size="sm"
                                        color={active === type ? 'warning' : 'secondary'}
                                        onClick={() => setActive(type)}>
                                        {type}
                                    </Button>
                                )}
                            </ButtonGroup>
                        </div>
                        <FormGroup>
                            <Label>Buffer radius (m)</Label>
                            <Input type="number" name="buffer" id="buffer" placeholder="1600" />
                        </FormGroup>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label>City</Label>
                        <Input type="text" name="city" id="city" />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label>Zip</Label>
                        <Input type="number" name="zip" id="zip" />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label>County</Label>
                        <Input type="text" name="county" id="county" />
                    </FormGroup>
                </Col>
            </Container>
            : null
    )
}
