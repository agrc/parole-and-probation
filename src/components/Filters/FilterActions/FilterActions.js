import React from 'react';
import { Col, Button } from 'reactstrap'
import './FilterActions.css';

export default function FilterActions() {
    return (
        <Col className="filter-actions--space-between">
            <Button size="lg" color="primary">Apply</Button>
            <Button size="lg" color="secondary">Reset</Button>
        </Col>
    )
}
