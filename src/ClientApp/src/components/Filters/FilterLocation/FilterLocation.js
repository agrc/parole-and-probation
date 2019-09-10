import React from 'react';
import { Button, ButtonGroup, FormGroup, Label, Input, Container, Col } from 'reactstrap';
import useFilterReducer from '../useFilterReducer';
import produce from 'immer';
import './FilterLocation.css';

const type = 'UPDATE_LOCATION';

export default function FilterLocation(props) {
    const [zip, setZip] = useFilterReducer(props, type, 'zip');
    const [city, setCity] = useFilterReducer(props, type, 'city');
    const [county, setCounty] = useFilterReducer(props, type, 'county');

    return (
        <Container fluid className="filter-location">
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
