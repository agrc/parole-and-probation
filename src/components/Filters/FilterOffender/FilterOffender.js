import React from 'react';
import { Button, ButtonGroup, FormGroup, Label, Input, Container, Col } from 'reactstrap'
import './FilterOffender.css';
import useFilterReducer from '../useFilterReducer';

const type = 'UPDATE_OFFENDER';

export default function FilterOffender(props) {
    const [name, setName] = useFilterReducer(props, type, 'name');
    const [number, setNumber] = useFilterReducer(props, type, 'number');
    const [phone, setPhone] = useFilterReducer(props, type, 'tel');
    const [employer, setEmployer] = useFilterReducer(props, type, 'employer');

    return (
        <Container fluid className="filter-offender">
            <Col>
                <FormGroup>
                    <Label>Name</Label>
                    <Input type="text" name="name" id="name" value={name} onChange={setName} autoComplete="none" />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>Offender Number</Label>
                    <Input type="number" name="number" id="number" value={number} onChange={setNumber} autoComplete="nope" />
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
                                    color={props.criteria.gender === gender ? 'warning' : 'secondary'}
                                    onClick={() => {
                                        if (props.criteria.gender === gender) {
                                            gender = '';
                                        }

                                        props.update({
                                            type,
                                            payload: gender,
                                            meta: 'gender'
                                        });
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
                    <Input type="tel" name="phone" id="phone" value={phone} onChange={setPhone} autoComplete="nope" />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>Employer</Label>
                    <Input type="text" name="employer" id="employer" value={employer} onChange={setEmployer} autoComplete="nope" />
                </FormGroup>
            </Col>
        </Container>
    )
}
