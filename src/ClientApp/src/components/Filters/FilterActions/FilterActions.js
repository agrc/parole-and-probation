import * as React from 'react';
import { Button, Col } from 'reactstrap';
import './FilterActions.css';

export default function FilterActions(props) {
  return (
    <Col className="filter-actions filter-actions--space-between">
      <Button size="lg" color="secondary" onClick={props.reset}>Reset</Button>
    </Col>
  )
}
