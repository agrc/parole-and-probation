import React from 'react';
import { Button, ButtonGroup, FormGroup, Label, Input, Container, Col } from 'reactstrap';
import useFilterReducer from '../useFilterReducer';
import produce from 'immer';
import './FilterOther.css';

const type = 'UPDATE_OTHER';

export default function FilterOther(props) {
    const [supervision, setSupervision] = useFilterReducer(props, type, 'supervision');
    const [gang, setGang] = useFilterReducer(props, type, 'gang');
    const [offense, setOffense] = useFilterReducer(props, type, 'offense');

    return (
        <Container fluid className="filter-other">
            <Col>
                <FormGroup>
                    <Label>Legal Status</Label>
                    <div className="text-center">
                        <ButtonGroup>
                            {['probation', 'parole'].map((payload, index) =>
                                <Button
                                    key={index}
                                    size="sm"
                                    color={props.criteria.status === payload ? 'warning' : 'secondary'}
                                    onClick={() => {
                                        if (props.criteria.status === payload) {
                                            payload = null
                                        }

                                        props.update({ type, payload, meta: 'status' });
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
                    <Label>Standard of Supervision</Label>
                    <div className="text-center">
                        <ButtonGroup>
                            {['no std', 'low', 'mod', 'hi', 'int'].map((sos, index) =>
                                <Button
                                    key={index}
                                    size="sm"
                                    color={props.criteria.sos.indexOf(sos) > -1 ? 'warning' : 'secondary'}
                                    onClick={() => {
                                        const payload = produce(props.criteria.sos, draft => {
                                            const index = draft.indexOf(sos);

                                            if (index === -1) {
                                                draft.splice(0, 0, sos);
                                            } else {
                                                draft.splice(index, 1);
                                            }
                                        });

                                        props.update({ type, payload, meta: 'sos' });
                                    }}>
                                    {sos}
                                </Button>
                            )}
                        </ButtonGroup>
                    </div>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>Special Supervision</Label>
                    <Input type="text" name="supervision" id="supervision" value={supervision} onChange={setSupervision} />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>Gang Name</Label>
                    <Input type="text" name="stg" id="stg" value={gang} onChange={setGang} />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>Offense Type</Label>
                    <Input type="text" name="offense" id="offense" value={offense} onChange={setOffense} />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>Active Warrant</Label>
                    <div className="text-center">
                        <ButtonGroup>
                            {['Yes', 'No'].map((payload, index) =>
                                <Button
                                    key={index}
                                    size="sm"
                                    color={props.criteria.warrant === payload ? 'warning' : 'secondary'}
                                    onClick={() => {
                                        if (props.criteria.warrant === payload) {
                                            payload = null;
                                        }

                                        props.update({ type, payload, meta: 'warrant' });
                                    }}>
                                    {payload}
                                </Button>
                            )}
                        </ButtonGroup>
                    </div>
                </FormGroup>
            </Col>
        </Container>
    )
}
