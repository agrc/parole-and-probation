import { Button, ButtonGroup, Col, Container, FormGroup, Label } from 'reactstrap';
import { MultiSelect, SelectedItems } from '../../Combobox/Combobox';
import { mainGangs, offenseTypes, supervisionItems } from '../lookupData';
import './FilterOther.css';

const type = 'UPDATE_OTHER';

const itemToString = (item) => (item ? item.name : '');
const itemToKey = (item) => (item ? item.id : '');

export default function FilterOther(props) {
  const update = (meta, value, add) => {
    if (!value) {
      return;
    }

    props.update({
      type,
      meta,
      payload: {
        value,
        add,
      },
    });
  };

  return (
    <Container fluid className="filter-other">
      <Col>
        <FormGroup>
          <Label>Legal Status</Label>
          <div className="text-center">
            <ButtonGroup>
              {['probation', 'parole'].map((payload, index) => (
                <Button
                  key={index}
                  size="sm"
                  color={props.criteria.status === payload ? 'warning' : 'secondary'}
                  onClick={() => {
                    if (props.criteria.status === payload) {
                      payload = null;
                    }

                    props.update({ type, payload, meta: 'status' });
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
          <Label>Standard of Supervision</Label>
          <div className="text-center">
            <ButtonGroup>
              {['no std', 'low', 'mod', 'hi', 'int'].map((sos, index) => (
                <Button
                  key={index}
                  size="sm"
                  color={props.criteria.sos.indexOf(sos) > -1 ? 'warning' : 'secondary'}
                  onClick={() => props.update({ type, payload: sos, meta: 'sos' })}
                >
                  {sos}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Label>Special Supervision</Label>
          <MultiSelect
            items={supervisionItems}
            currentSelectedItems={props.criteria.supervision}
            itemToString={itemToString}
            itemToKey={itemToKey}
            titleCaseItem={false}
            onSelectItem={(item) => update('supervision', item, true)}
          />
        </FormGroup>
        {props.criteria.supervision.length > 0 ? (
          <FormGroup>
            <SelectedItems
              titleCaseItem={false}
              itemToKey={itemToKey}
              itemToString={itemToString}
              items={props.criteria.supervision}
              clickHandler={(event) => update('supervision', event.target.id, false)}
            />
          </FormGroup>
        ) : null}
      </Col>
      <Col>
        <FormGroup>
          <Label>Gang Name</Label>
          <MultiSelect
            items={mainGangs}
            currentSelectedItems={props.criteria.gang}
            itemToString={itemToString}
            itemToKey={itemToKey}
            onSelectItem={(item) => update('gang', item, true)}
          />
        </FormGroup>
        {props.criteria.gang.length > 0 ? (
          <FormGroup>
            <SelectedItems
              items={props.criteria.gang}
              itemToKey={itemToKey}
              itemToString={itemToString}
              clickHandler={(event) => update('gang', event.target.id, false)}
            />
          </FormGroup>
        ) : null}
      </Col>
      <Col>
        <FormGroup>
          <Label>Offense Type</Label>
          <MultiSelect
            items={offenseTypes}
            currentSelectedItems={props.criteria.offense}
            itemToString={itemToString}
            itemToKey={itemToKey}
            titleCaseItem={false}
            onSelectItem={(item) => update('offense', item, true)}
          />
        </FormGroup>
        {props.criteria.offense.length > 0 ? (
          <FormGroup>
            <SelectedItems
              items={props.criteria.offense}
              titleCaseItem={false}
              itemToKey={itemToKey}
              itemToString={itemToString}
              clickHandler={(event) => update('offense', event.target.id, false)}
            />
          </FormGroup>
        ) : null}
      </Col>
      <Col>
        <FormGroup>
          <Label>Active Warrant</Label>
          <div className="text-center">
            <ButtonGroup>
              {['Yes', 'No'].map((payload, index) => (
                <Button
                  key={index}
                  size="sm"
                  color={props.criteria.warrant === payload ? 'warning' : 'secondary'}
                  onClick={() => {
                    if (props.criteria.warrant === payload) {
                      payload = null;
                    }

                    props.update({ type, payload, meta: 'warrant' });
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
