import { Button, Col } from 'reactstrap';
import './FilterActions.css';

export default function FilterActions(props) {
  return (
    <Col className="filter-actions filter-actions--space-evenly pb-3">
      <Button size="lg" color="warning" onClick={props.reset}>
        Reset
      </Button>
      <Button size="lg" color="secondary" onClick={props.show}>
        Close
      </Button>
    </Col>
  );
}
