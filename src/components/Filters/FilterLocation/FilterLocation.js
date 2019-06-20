import React, { useState } from 'react';
import { Button, ButtonGroup, FormGroup, Label, Input, Container, Col } from 'reactstrap';
import useFilterReducer from '../useFilterReducer';
import DartBoard from '../../DartBoard';
import produce from 'immer';
import './FilterLocation.css';

const type = 'UPDATE_LOCATION';

export default function FilterLocation(props) {
    const [activeLocationType, setActive] = useState();
    const [buffer, setBuffer] = useFilterReducer(props, type, 'buffer');
    const [zip, setZip] = useFilterReducer(props, type, 'zip');
    const [city, setCity] = useFilterReducer(props, type, 'city');
    const [county, setCounty] = useFilterReducer(props, type, 'county');

    return (
        <Container fluid className="filter-location">
            <Col>
                <FormGroup>
                    <Label>Location</Label>
                    <div className="text-center">
                        <ButtonGroup>
                            {['Current', 'Select', 'Address'].map((type, index) =>
                                <Button
                                    key={index}
                                    size="sm"
                                    color={activeLocationType === type ? 'warning' : 'secondary'}
                                    onClick={() => {
                                        if (activeLocationType === type) {
                                            type = null;
                                        }

                                        setActive(type);
                                    }}>
                                    {type}
                                </Button>
                            )}
                        </ButtonGroup>
                    </div>
                    {['Current', 'Select'].indexOf(activeLocationType) > -1 ? (
                        <FormGroup>
                            <Label>Buffer radius (m)</Label>
                            <Input type="number" name="buffer" id="buffer" placeholder="meters" value={buffer} onChange={setBuffer} />
                        </FormGroup>
                    ) : null}
                    {activeLocationType === 'Address' ? (
                        <DartBoard
                            apiKey={process.env.REACT_APP_WEB_API}
                            onFindAddress={result => props.dispatcher({ type: 'ZOOM_TO_GRAPHIC', payload: result })}
                            pointSymbol={{
                                type: 'simple-marker',
                                style: 'diamond',
                                color: [130, 65, 47, 0.5],
                                size: '18px',
                                outline: {
                                    color: [230, 126, 21, 0.7],
                                    width: 1
                                }
                            }}
                        />
                    ) : null}
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>City</Label>
                    <Input type="text" name="city" id="city" value={city} onChange={setCity} />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>Zip</Label>
                    <Input type="number" name="zip" id="zip" value={zip} onChange={setZip} />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>County</Label>
                    <Input type="text" name="county" id="county" value={county} onChange={setCounty} />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>Region</Label>
                    <div className="text-center">
                        <ButtonGroup>
                            {[1, 3, 4, 5, 6].map(region =>
                                <Button
                                    key={region}
                                    value={region}
                                    size="sm"
                                    color={props.criteria.region.indexOf(region) > -1 ? 'warning' : 'secondary'}
                                    onClick={() => {
                                        const payload = produce(props.criteria.region, draft => {
                                            const index = draft.indexOf(region);

                                            if (index === -1) {
                                                draft.splice(0, 0, region);
                                            } else {
                                                draft.splice(index, 1);
                                            }
                                        });

                                        props.update({ type, payload, meta: 'region' });
                                    }}>
                                    {region}
                                </Button>
                            )}
                        </ButtonGroup>
                    </div>
                </FormGroup>
            </Col>
        </Container>
    )
}
