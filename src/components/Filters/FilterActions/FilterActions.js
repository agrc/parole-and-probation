import React from 'react';
import { Col, Button } from 'reactstrap'
import './FilterActions.css';

export default function FilterActions(props) {
    return (
        <Col className="filter-actions filter-actions--space-between">
            <Button size="lg" color="secondary" onClick={props.reset}>Reset</Button>
        </Col>
    )
}
