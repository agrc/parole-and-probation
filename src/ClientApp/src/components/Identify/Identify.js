import React, { useContext, useState, useEffect } from 'react';
import { Alert, Button, Container, Col, Label, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';
import { UserData } from 'react-oidc';
import { GoogleDirectionsLink, TelephoneLink } from '../FancyLinks';
import { fields } from '../../config';
import './Identify.css';

var dateFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
const labelSize = 3;

const calculateAge = dob => {
  if (!dob) {
    return '';
  }

  const elapsed = new Date(new Date() - new Date(dob));

  return Math.abs(elapsed.getUTCFullYear() - 1970);
}

const identifyCache = {};
const controller = new AbortController();
let signal = controller.signal;

const IdentifyInformation = props => {
  const [extra, setExtra] = useState({});
  const oidc = useContext(UserData);

  useEffect(() => {
    if (props.offender.offender_id in identifyCache) {
      setExtra(identifyCache[props.offender.offender_id]);

      return;
    }

    console.log('effect fetching');

    setExtra({});

    IdentifyFetch(props.offender, oidc, signal).then((result) => {
      console.log('adding extra identify params');

      identifyCache[props.offender.offender_id] = result;

      setExtra(result);
    });
  }, [props.offender, props.index, oidc]);

  return (
    props.offender ?
      <Container className="identify pt-4">
        {props.features.length > 1 ? (
          <Pagination>
            {props.features.map((_, i) =>
              (
                <PaginationItem active={props.index === i} key={i + 1}>
                  <PaginationLink onClick={() => props.update({ type: 'IDENTIFY_PAGINATE', payload: i })}>{i + 1}</PaginationLink>
                </PaginationItem>
              )
            )}
          </Pagination>
        ) : null}
        <figure className="mb-1 pt-1 figured-flex identify__figure identify--center-content">
          <div className="d-flex f-row border border-info">
            <img alt="200x200"
              src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16b6823d4d9%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16b6823d4d9%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.421875%22%20y%3D%22104.65%22%3E200x200%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
              data-holder-rendered="true" />
            <div className="d-flex border border-left-0 identify__image-addon f-column text-center">
              <div className="d-flex pl-1 border-bottom border-info identify__addon-item">{calculateAge(extra.date_of_birth)} {props.offender.gender}</div>
              <div className="d-flex pl-1 border-bottom border-info identify__addon-item">{props.offender.standard_of_supervision ? props.offender.standard_of_supervision : 'NO STD'}</div>
              <div className="d-flex pl-1 border-bottom border-info identify__addon-item">{props.offender.legal_status}</div>
              <div className={`d-flex pl-1 identify__addon-item${props.offender.active_warrant ? ' identify__addon-item--danger' : ''}`}>{props.offender.active_warrant ? 'active warrant' : 'no active warrant'}</div>
            </div>
          </div>
        </figure>
        <h4>{props.offender.offender}</h4>
        <Row className="border-bottom">
          <Label className={`py-0 pr-0 font-weight-bolder text-right col-form-label col-sm-${labelSize}`}>Number</Label>
          <Col className={`pl-0 col-sm-${12 - labelSize}`}>
            <Label className="pt-0 pb-0 pl-3 col-form-label">{props.offender.offender_id}</Label>
          </Col>
          <Label className={`pr-0 font-weight-bolder text-right col-form-label col-sm-${labelSize}`}>Agent</Label>
          <Col className={`pl-0 mb-1 col-sm-${12 - labelSize}`}>
            <Label className="pl-3 col-form-label">{extra.agent_name}</Label>
          </Col>
        </Row>
        {extra.cautions ?
          <>
            <h5 className="mt-2">Cautions</h5>
            <Row>
              <Alert className="rounded-0 mb-0 w-100" color="danger">{extra.cautions}</Alert>
            </Row>
          </> : null}
        {extra.alerts ?
          <>
            <h5 className="mt-2">Alerts</h5>
            <Row>
              <Alert className="rounded-0 mb-0 w-100" color="danger">{extra.alerts}</Alert>
            </Row>
          </> : null}
        <h5 className="mt-2">Recent Contact</h5>
        <Row className="j-between border-bottom">
          <Col>
            <Label className="font-weight-bolder">Field</Label>
            <Label className="d-block">{props.offender.last_field_contact ? dateFormatter.format(props.offender.last_field_contact) : '-'}</Label>
          </Col>
          <Col>
            <Label className="font-weight-bolder">Result</Label>
            <Label className="d-block">{extra.field_contact_result ? extra.field_contact_result : '-'}</Label>
          </Col>
          <Col>
            <Label className="font-weight-bolder">Office</Label>
            <Label className="d-block">{props.offender.last_office_contact ? props.offender.last_office_contact : '-'}</Label>
          </Col>
        </Row>
        <h5 className="mt-2">Contact Information</h5>
        {
          extra.offender_phone ? (
            <Row>
              <Label className={`pr-0 pb-0 font-weight-bolder text-right col-form-label col-sm-${labelSize}`}>
                <TelephoneLink phone={props.offender.offender_phone}>Phone</TelephoneLink>
              </Label>
              <Col className={`pl-0 col-sm-${12 - labelSize}`}>
                <Label className="pl-3 pb-0 col-form-label">{props.offender.offender_phone}</Label>
              </Col>
            </Row>
          ) : null
        }
        <Row>
          <Label className={`pr-0 pb-0 font-weight-bolder text-right col-form-label col-sm-${labelSize}`}>
            <GoogleDirectionsLink address={`${extra.address} ${extra.unit || ''}, ${props.offender.city || ''} ${props.offender.zip || ''}`}>
              Address
            </GoogleDirectionsLink>
          </Label>
          <Col className={`pl-0 col-sm-${12 - labelSize}`}>
            <Label className="pl-3 pb-0 col-form-label">{extra.address} {extra.unit}</Label>
          </Col>
        </Row>
        <Row>
          <Col className={`offset-${labelSize} pl-0 col-sm-10`}>
            <Label className="pl-3 col-form-label">{props.offender.city} {props.offender.zip}</Label>
          </Col>
        </Row>
        {extra.address_type ?
          <Row>
            <Label className={`pr-0 font-weight-bolder text-right col-form-label col-sm-${labelSize}`}>Type</Label>
            <Col className={`pl-0 col-sm-${12 - labelSize}`}>
              <Label className="pl-3 pb-0 col-form-label">{extra.address_type}</Label>
            </Col>
          </Row> : null}
        <Row>
          <Label className={`pr-0 pb-0 font-weight-bolder text-right col-form-label col-sm-${labelSize}`}>Since</Label>
          <Col className={`pl-0 col-sm-${12 - labelSize}`}>
            <Label className="pl-3 pb-0 col-form-label">{dateFormatter.format(extra.address_start_date)}</Label>
          </Col>
        </Row>
        {props.offender.employer ?
        <Row className={ extra.employer_phone ? null : 'border-bottom'}>
          <Label className={`pr-0 font-weight-bolder text-right col-form-label col-sm-${labelSize}`}>
            <GoogleDirectionsLink address={extra.employer_address}>Employer</GoogleDirectionsLink>
          </Label>
          <Col className={`pl-0 col-sm-${12 - labelSize}`}>
            <Label className="pl-3 col-form-label">{props.offender.employer || 'unemployed or unknown'}</Label>
          </Col>
        </Row>
        {
          extra.employer_phone ? (
            <Row className="border-bottom">
              <Label className={`pr-0 pb-0 font-weight-bolder text-right col-form-label col-sm-${labelSize}`}>
                <TelephoneLink phone={extra.employer_phone}>Phone</TelephoneLink>
              </Label>
              <Col className={`pl-0 col-sm-${12 - labelSize}`}>
                <Label className="pl-3 pb-0 col-form-label">{extra.employer_phone}</Label>
              </Col>
            </Row>
          ) : null
        } : null}
        {extra.special_supervision && extra.special_supervision.length > 0 ? <>
          <h5 className="mt-2">Special Supervisions</h5>
          <Row className="border-bottom identify__items-container px-3 pb-3">
            {extra.special_supervision.split(',').map(item => <span key={item}>{item}</span>)}
          </Row>
        </> : null}
        <h5 className="mt-2">Primary Offense</h5>
        <Row className="border-bottom">
          <Col className={`pl-0 col-sm-${12 - labelSize}`}>
            <Label className="pl-3 col-form-label">{`${extra.primary_offense} (${props.offender.crime_degree})`}</Label>
          </Col>
          <Col className={`pl-0`}>
            <p className="pl-3">{extra.offense_description}</p>
          </Col>
        </Row>
        {
          props.offender.gang_type ?
            <>
              <h5 className="mt-2">STG</h5>
              <Row className="border-bottom">
                <Label className={`pb-0 pr-0 font-weight-bolder text-right col-form-label col-sm-${labelSize}`}>Gang</Label>
                <Col className={`pl-0 mb-1 col-sm-${12 - labelSize}`}>
                  <Label className="pb-0 pl-3 col-form-label">{props.offender.gang_type}</Label>
                </Col>
                <Label className={`pb-0 pr-0 font-weight-bolder text-right col-form-label col-sm-${labelSize}`}>Set</Label>
                <Col className={`pl-0 mb-1 col-sm-${12 - labelSize}`}>
                  <Label className="pl-3 col-form-label">{extra.gang_name}</Label>
                </Col>
              </Row>
            </> : null
        }
        <Row className="mt-3 j-between">
          <Col>
            <Label className="font-weight-bolder">Supervision Start</Label>
            <Label className="d-block">{dateFormatter.format(extra.supervision_start_date)}</Label>
          </Col>
          <Col>
            <Label className="font-weight-bolder">ECC Date</Label>
            <Label className="d-block">{dateFormatter.format(extra.earned_compliance_credit)}</Label>
          </Col>
        </Row>
        <Row className="identify--center-content pt-5 pb-3">
          <Button color="primary" onClick={() => props.show(false)}>Close</Button>
        </Row>
      </Container>
      : <Container className="identify pt-4">No offenders at click location</Container>
  );
}

const IdentifyContainer = props => {
  return (
    <div className="identify__container side-bar side-bar--with-border side-bar--open">
      <button type="button" className="identify__close" aria-label="Close" onClick={() => props.show(false)}>
        <span aria-hidden="true">&times;</span>
      </button>
      {props.children}
    </div>
  );
}

const IdentifyFetch = async (offender, oidc, cancellationToken) => {
  if (!offender) {
    return null;
  }

  const base = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
  const url = new URL(`${process.env.REACT_APP_BASENAME}/mapserver/0/query`, base);
  url.search = new URLSearchParams([
    ['f', 'json'],
    ['outFields', Object.keys(fields).filter(key => fields[key].identify === true).join()],
    ['where', `offender_id=${offender.offender_id}`],
    ['returnGeometry', false]
  ]);

  console.log('querying extra offender data');

  const response = await fetch(url, {
    signal: cancellationToken,
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${oidc.user.access_token}`
    }
  });

  if (!response.ok) {
    return offender;
  }

  const data = await response.json();

  if (data.error) {
    console.error(data.error);

    return offender;
  }

  console.log(`found ${data.features.length} offenders`);

  if (data.features.length !== 1) {
    return offender;
  }

  return {
    ...offender,
    ...data.features[0].attributes
  };
}

export { IdentifyInformation, IdentifyContainer };
