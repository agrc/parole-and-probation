import * as React from 'react';
import { Button, ButtonGroup, Col, Container, FormGroup, Label } from 'reactstrap';
import { InputTypeAhead } from '../../Combobox';
import './FilterOffender.css';

const type = 'UPDATE_OFFENDER';

export default function FilterOffender(props) {
  return (
    <Container fluid className="filter-offender">
      <form autoComplete="off">
        <Col>
          <FormGroup autoComplete="off">
            <Label>Name</Label>
            <InputTypeAhead
              featureSet={props.featureSet}
              itemToString={(item) => item?.attributes?.offender || ''}
              itemToKey={(item) => item?.attributes?.offender_id || ''}
              reducerDescriptor={{ type, field: 'name' }}
              dispatch={props.update}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Offender Number</Label>
            <InputTypeAhead
              featureSet={props.featureSet}
              itemToString={(item) => item?.attributes?.offender_id?.toString() || ''}
              itemToKey={(item) => item?.attributes?.offender_id || ''}
              itemToSortValue={(item) => item?.attributes?.offender_id}
              reducerDescriptor={{ type, field: 'number' }}
              dispatch={props.update}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Gender</Label>
            <div className="text-center">
              <ButtonGroup>
                {['Male', 'Female'].map((gender, index) => (
                  <Button
                    key={index}
                    size="sm"
                    color={props.criteria.gender === gender ? 'warning' : 'secondary'}
                    onClick={() => {
                      if (props.criteria.gender === gender) {
                        gender = '';
                      }

                      props.update({
                        type,
                        payload: gender,
                        meta: 'gender',
                      });
                    }}
                  >
                    {gender}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Phone</Label>
            <InputTypeAhead
              featureSet={props.featureSet}
              itemToString={(item) => item?.attributes?.offender_phone || ''}
              itemToKey={(item) => item?.attributes?.offender_id || ''}
              reducerDescriptor={{ type, field: 'tel' }}
              dispatch={props.update}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Employer</Label>
            <InputTypeAhead
              featureSet={props.featureSet}
              itemToString={(item) => item?.attributes?.employer || ''}
              itemToKey={(item) => item?.attributes?.offender_id || ''}
              reducerDescriptor={{ type, field: 'employer' }}
              dispatch={props.update}
            />
          </FormGroup>
        </Col>
      </form>
    </Container>
  );
}
