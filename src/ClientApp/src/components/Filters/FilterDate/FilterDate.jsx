import { Button, ButtonGroup, Col, Container, FormGroup, Label } from 'reactstrap';
import { supervisionContactDays } from '../lookupData';
import './FilterDate.css';

const type = 'UPDATE_DATE';

export default function FilterDate(props) {
  return (
    <Container fluid className="filter-date">
      <Col>
        <FormGroup>
          <Label>Compliance</Label>
          <div className="text-center">
            <ButtonGroup>
              {['in', 'out'].map((payload, index) => (
                <Button
                  key={index}
                  size="sm"
                  color={props.criteria.compliant === payload ? 'warning' : 'secondary'}
                  onClick={() => {
                    if (props.criteria.compliant === payload) {
                      payload = null;
                    }

                    props.update({ type, payload, meta: 'compliant' });
                  }}
                >
                  {payload}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Label>No attempted field contact within</Label>
          <div className="text-center">
            <ButtonGroup>
              {supervisionContactDays.map((payload, index) => (
                <Button
                  key={index}
                  size="sm"
                  color={props.criteria.attempt === payload ? 'warning' : 'secondary'}
                  onClick={() => {
                    if (props.criteria.attempt === payload) {
                      payload = null;
                    }

                    props.update({ type, payload, meta: 'attempt' });
                  }}
                >
                  {payload}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Label>No successful field contact within</Label>
          <div className="text-center">
            <ButtonGroup>
              {supervisionContactDays.map((payload, index) => (
                <Button
                  key={index}
                  size="sm"
                  color={props.criteria.success === payload ? 'warning' : 'secondary'}
                  onClick={() => {
                    if (props.criteria.success === payload) {
                      payload = null;
                    }

                    props.update({ type, payload, meta: 'success' });
                  }}
                >
                  {payload}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Label>No office contact within</Label>
          <div className="text-center">
            <ButtonGroup>
              {supervisionContactDays.map((payload, index) => (
                <Button
                  key={index}
                  size="sm"
                  color={props.criteria.office === payload ? 'warning' : 'secondary'}
                  onClick={() => {
                    if (props.criteria.office === payload) {
                      payload = null;
                    }

                    props.update({ type, payload, meta: 'office' });
                  }}
                >
                  {payload}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </FormGroup>
      </Col>
    </Container>
  );
}
