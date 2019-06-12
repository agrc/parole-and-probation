import React, { useState } from 'react';
import { Button, ButtonGroup, FormGroup, Label, Input, Container, Col } from 'reactstrap'
import DartBoard from '../../DartBoard';
import './FilterLocation.css';

export default function FilterLocation(props) {
    const [activeLocationType, setActive] = useState();
    const [regions, setRegions] = useState([]);

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
                            <Input type="number" name="buffer" id="buffer" placeholder="1600" />
                        </FormGroup>
                    ) : null}
                    {activeLocationType === 'Address' ? (
                        <DartBoard
                            apiKey={process.env.REACT_APP_WEB_API}
                            onFindAddress={result => props.dispatcher({ type: 'zoom', graphic: result })}
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
            <Col>
                <FormGroup>
                    <Label>Region</Label>
                    <div className="text-center">
                        <ButtonGroup>
                            {[...Array(5).keys()].map(type =>
                                <Button
                                    key={type + 1}
                                    value={type + 1}
                                    size="sm"
                                    color={regions.indexOf((type + 1).toString()) > -1 ? 'warning' : 'secondary'}
                                    onClick={(event) => {
                                        if (regions.indexOf((type + 1).toString()) === -1) {
                                            const temp = [...regions, event.target.value];
                                            setRegions(temp);
                                        } else {
                                            const temp = regions.filter(item => item !== event.target.value)
                                            setRegions(temp);
                                        }
                                    }}>
                                    {type + 1}
                                </Button>
                            )}
                        </ButtonGroup>
                    </div>
                </FormGroup>
            </Col>
        </Container>
    )
}
