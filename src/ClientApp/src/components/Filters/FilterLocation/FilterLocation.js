import * as React from 'react';
import { Button, ButtonGroup, Col, Container, FormGroup, Input, Label } from 'reactstrap';
import { MultiSelect, SelectedItems } from '../../Combobox';
import { counties } from '../lookupData';
import useFilterReducer from '../useFilterReducer';
import './FilterLocation.css';

const type = 'UPDATE_LOCATION';

export default function FilterLocation(props) {
  const [zip, setZip] = useFilterReducer(props, type, 'zip');
  const [city, setCity] = useFilterReducer(props, type, 'city');
  const updateCounties = (item, add) => {
    if (!item) {
      return;
    }

    props.update({
      type,
      payload: { item, add },
      meta: 'counties',
    });
  };

  return (
    <Container fluid className="filter-location">
      <form autoComplete="off">
        <Col>
          <FormGroup>
            <Label>City</Label>
            <Input type="text" value={city} onChange={setCity} />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Zip</Label>
            <Input type="number" value={zip} onChange={setZip} />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>County</Label>
            <MultiSelect
              items={counties}
              currentSelectedItems={props.criteria.counties}
              onSelectItem={(item) => updateCounties(item, true)}
            />
          </FormGroup>
          {props.criteria.counties.length > 0 ? (
            <FormGroup>
              <SelectedItems
                items={props.criteria.counties}
                clickHandler={(event) => {
                  updateCounties(event.target.id, false);
                }}
              />
            </FormGroup>
          ) : null}
        </Col>
        <Col>
          <FormGroup>
            <Label>Region</Label>
            <div className="text-center">
              <ButtonGroup>
                {[1, 3, 4, 5, 6].map((region) => (
                  <Button
                    key={region}
                    value={region}
                    size="sm"
                    color={props.criteria.region.indexOf(region) > -1 ? 'warning' : 'secondary'}
                    onClick={() => props.update({ type, payload: region, meta: 'region' })}
                  >
                    {region}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          </FormGroup>
        </Col>
      </form>
    </Container>
  );
}
