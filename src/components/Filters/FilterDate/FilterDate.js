import React, { useState } from 'react';
import { Button, ButtonGroup, Container, Col, Collapse, Label, FormGroup } from 'reactstrap'
import Calendar from 'react-calendar'
import './FilterDate.css';

export default function FilterDate(props) {
    const [dateAttempted, setDateAttempted] = useState();
    const [dateSuccessful, setDateSuccessful] = useState();
    const [dateOffice, setDateOffice] = useState();
    const [attempted, toggleAttempted] = useState(false);
    const [successful, toggleSuccessful] = useState(false);
    const [office, toggleOffice] = useState(false);
    const [visit, setVisit] = useState(false);

    return (
        props.active === 'Date' ?
            <Container fluid className="filter-date">
                <Col>
                    <FormGroup>
                        <Label>No Field Visit</Label>
                        <div className="text-center">
                            <ButtonGroup>
                                {['No Visits'].map((binary, index) =>
                                    <Button
                                        key={index}
                                        size="sm"
                                        color={visit ? 'warning' : 'secondary'}
                                        onClick={() => { setVisit(!visit) }}>
                                        {binary}
                                    </Button>
                                )}
                            </ButtonGroup>
                        </div>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label onClick={() => toggleAttempted(!attempted)}>Last Attempted Field Contact</Label>
                        <Collapse isOpen={attempted}>
                            <Calendar
                                selectRange
                                maxDetail="month"
                                minDetail="year"
                                onChange={setDateAttempted}
                                value={dateAttempted}
                            />
                        </Collapse>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label onClick={() => toggleSuccessful(!successful)}>Last Successful Field Contact</Label>
                        <Collapse isOpen={successful}>
                            <Calendar
                                selectRange
                                maxDetail="month"
                                minDetail="year"
                                onChange={setDateSuccessful}
                                value={dateSuccessful}
                            />
                        </Collapse>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label onClick={() => toggleOffice(!office)}>Last Office Contact</Label>
                        <Collapse isOpen={office}>
                            <Calendar
                                selectRange
                                maxDetail="month"
                                minDetail="year"
                                onChange={setDateOffice}
                                value={dateOffice}
                            />
                        </Collapse>
                    </FormGroup>
                </Col>
            </Container>
            : null
    )
}
