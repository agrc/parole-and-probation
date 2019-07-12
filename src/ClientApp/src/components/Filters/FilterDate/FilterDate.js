import React from 'react';
import { Button, ButtonGroup, Container, Col, Label, FormGroup } from 'reactstrap'
import './FilterDate.css';

const type = 'UPDATE_DATE';

export default function FilterDate(props) {
    return (
        <Container fluid className="filter-date">
            <Col>
                <FormGroup>
                    <div className="text-center">
                        <ButtonGroup>
                            {['Out of Compliance'].map((payload, index) =>
                                <Button
                                    key={index}
                                    size="sm"
                                    color={props.criteria.outOfCompliance ? 'warning' : 'secondary'}
                                    onClick={() => { props.update({ type, payload: !props.criteria.outOfCompliance, meta: 'outOfCompliance' }); }}>
                                    {payload}
                                </Button>
                            )}
                        </ButtonGroup>
                    </div>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>No attempted field visit within</Label>
                    <div className="text-center">
                        <ButtonGroup>
                            {[30, 60, 90, 180].map((payload, index) =>
                                <Button
                                    key={index}
                                    size="sm"
                                    color={props.criteria.attempt === payload ? 'warning' : 'secondary'}
                                    onClick={() => {
                                        if (props.criteria.attempt === payload) {
                                            payload = null;
                                        }

                                        props.update({ type, payload, meta: 'attempt' });
                                    }}>
                                    {payload}
                                </Button>
                            )}
                        </ButtonGroup>
                    </div>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>No successful field contact within</Label>
                    <div className="text-center">
                        <ButtonGroup>
                            {[30, 60, 90, 180].map((payload, index) =>
                                <Button
                                    key={index}
                                    size="sm"
                                    color={props.criteria.success === payload ? 'warning' : 'secondary'}
                                    onClick={() => {
                                        if (props.criteria.success === payload) {
                                            payload = null;
                                        }

                                        props.update({ type, payload, meta: 'success' });
                                    }}>
                                    {payload}
                                </Button>
                            )}
                        </ButtonGroup>
                    </div>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>No office contact within</Label>
                    <div className="text-center">
                        <ButtonGroup>
                            {[30, 60, 90, 180].map((payload, index) =>
                                <Button
                                    key={index}
                                    size="sm"
                                    color={props.criteria.office === payload ? 'warning' : 'secondary'}
                                    onClick={() => {
                                        if (props.criteria.office === payload) {
                                            payload = null;
                                        }

                                        props.update({ type, payload, meta: 'office' });
                                    }}>
                                    {payload}
                                </Button>
                            )}
                        </ButtonGroup>
                    </div>
                </FormGroup>
            </Col>
        </Container >
    )
}
