import React, { useContext, useState, useEffect } from 'react';
import { Alert, Button, Container, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { UserData } from 'react-oidc';
import { GoogleDirectionsLink, TelephoneLink } from '../FancyLinks';
import { fields } from '../../config';
import './Identify.css';

var dateFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });

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
          <Pagination listClassName="justify-content-center">
            <PaginationItem disabled={props.index - 1 < 0} className="justify-content-center">
              <PaginationLink first disabled={props.index - 1 < 0} onClick={() => props.update({ type: 'IDENTIFY_PAGINATE', payload: 0 })} />
            </PaginationItem>
            <PaginationItem disabled={props.index - 1 < 0}>
              <PaginationLink previous disabled={props.index - 1 < 0} onClick={() => props.update({ type: 'IDENTIFY_PAGINATE', payload: props.index - 1 })} />
            </PaginationItem>
            <PaginationItem disabled>
              <PaginationLink disabled>{`${props.index + 1} of ${props.features.length}`}</PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={props.index + 1 >= props.features.length}>
              <PaginationLink next disabled={props.index + 1 >= props.features.length} onClick={() => props.update({ type: 'IDENTIFY_PAGINATE', payload: props.index + 1 })} />
            </PaginationItem>
            <PaginationItem disabled={props.index + 1 >= props.features.length}>
              <PaginationLink last disabled={props.index + 1 >= props.features.length} onClick={() => props.update({ type: 'IDENTIFY_PAGINATE', payload: props.features.length - 1 })} />
            </PaginationItem>
          </Pagination>
        ) : null}
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr' }} className="mb-3 border border-info">
          <div>
            <img alt="200x200"
              src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16b6823d4d9%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16b6823d4d9%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.421875%22%20y%3D%22104.65%22%3E200x200%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
              data-holder-rendered="true" />
          </div>
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr 1fr 1fr' }}>
            <div className="d-flex identify__addon-item pl-1 border-bottom border-info">{calculateAge(extra.date_of_birth)} {props.offender.gender} {extra.race ? extra.race.toLowerCase() === 'unknown' ? null : extra.race.toLowerCase() : null}</div>
            <div className="d-flex identify__addon-item pl-1 border-bottom border-info">{props.offender.standard_of_supervision ? props.offender.standard_of_supervision : 'NO STD'}</div>
            <div className="d-flex identify__addon-item pl-1 border-bottom border-info">{props.offender.legal_status ? props.offender.legal_status.toLowerCase() : null}</div>
            <div className={`d-flex identify__addon-item pl-1${props.offender.active_warrant ? ' identify__addon-item--danger' : ''}`}>{props.offender.active_warrant ? 'active warrant' : 'no active warrant'}</div>
          </div>
        </div>
        <h4>{props.offender.offender}</h4>
        <div className="identify-grid--label-text identify__row border-bottom">
          <label className="identify-grid--label-text__label font-weight-bolder text-right">Number</label>
          <label className="identify-grid--label-text__text">{props.offender.offender_id}</label>
          <label className="identify-grid--label-text__label font-weight-bolder text-right">Agent</label>
          <label className="identify-grid--label-text__text">{extra.agent_name}</label>
        </div>
        {extra.cautions ?
          <>
            <h5 className="mt-2">Cautions</h5>
            <div className="identify__row">
              <Alert className="rounded-0 mb-0 w-100" color="danger">{extra.cautions}</Alert>
            </div>
          </> : null}
        {extra.alerts ?
          <>
            <h5 className="mt-2">Alerts</h5>
            <div className="identify__row">
              <Alert className="rounded-0 mb-0 w-100" color="danger">{extra.alerts}</Alert>
            </div>
          </> : null}
        <h5 className="mt-2">Recent Contact</h5>
        <div className="identify-grid--contacts identify__row border-bottom">
          <div className="identify-grid--contacts__item">
            <label className="font-weight-bolder">Field</label>
            <label className="d-block">{props.offender.last_field_contact ? dateFormatter.format(props.offender.last_field_contact) : '-'}</label>
          </div>
          <div>
            <label className="font-weight-bolder">Result</label>
            <label className="d-block">{extra.field_contact_result ? extra.field_contact_result.toLowerCase() : '-'}</label>
          </div>
          <div>
            <label className="font-weight-bolder">Office</label>
            <label className="d-block">{props.offender.last_office_contact ? props.offender.last_office_contact : '-'}</label>
          </div>
        </div>
        <h5 className="mt-2">Contact Information</h5>
        {
          extra.offender_phone ? (
            <div className="identify-grid--label-text identify__row">
              <label className="identify-grid--label-text__label font-weight-bolder text-right">
                <TelephoneLink phone={props.offender.offender_phone}>Phone</TelephoneLink>
              </label>
              <label className="identify-grid--label-text__text">{props.offender.offender_phone}</label>
            </div>
          ) : null
        }
        <div className="identify-grid--label-text identify__row">
          <label className="identify-grid--label-text__label font-weight-bolder text-right">
            <GoogleDirectionsLink address={`${extra.address} ${extra.unit || ''}, ${props.offender.city || ''} ${props.offender.zip || ''}`}>
              Address
            </GoogleDirectionsLink>
          </label>
          <label className="identify-grid--label-text__text">{extra.address} {extra.unit}<br /> {props.offender.city} {props.offender.zip}</label>
        </div>
        {extra.address_type ?
          <div className="identify-grid--label-text identify__row">
            <label className="identify-grid--label-text__label font-weight-bolder text-right">Type</label>
            <label className="identify-grid--label-text__text">{extra.address_type}</label>
          </div> : null}
        <div className="identify-grid--label-text identify__row">
          <label className="identify-grid--label-text__label font-weight-bolder text-right">Since</label>
          <label className="identify-grid--label-text__text">{dateFormatter.format(extra.address_start_date)}</label>
        </div>
        <div className="identify-grid--label-text identify__row border-bottom">
          <label className="identify-grid--label-text__label font-weight-bolder text-right">Employer</label>
          <label className="identify-grid--label-text__text">{props.offender.employer || 'unemployed or unknown'}</label>
          {extra.employer_address ? (<>
            <label className="identify-grid--label-text__label font-weight-bolder text-right">
              <GoogleDirectionsLink address={extra.employer_address}>Address</GoogleDirectionsLink>
            </label>
            <label className="identify-grid--label-text__text">{extra.employer_address}</label>
          </>) : null}
          {extra.employer_phone ? (<>
            <label className="identify-grid--label-text__label font-weight-bolder text-right">
              <TelephoneLink phone={extra.employer_phone}>Phone</TelephoneLink>
            </label>
            <label className="identify-grid--label-text__text">{extra.employer_phone}</label>
          </>
          ) : null}
        </div>
        {extra.special_supervision && extra.special_supervision.length > 0 ? <>
          <h5 className="mt-2">Special Supervisions</h5>
          <div className="identify-grid--contacts identify__row identify__items-container px-3 border-bottom">
            {extra.special_supervision.split(',').map((item, i) => <label key={item + i}>{item}</label>)}
          </div>
        </> : null}
        <h5 className="mt-2">Primary Offense</h5>
        <div className="identify__row border-bottom">
          <label className="identify-grid--contacts__item">{`${extra.primary_offense} (${props.offender.crime_degree})`}</label>
          <p className="pl-3">{extra.offense_description}</p>
        </div>
        {
          props.offender.gang_type ?
            <>
              <h5 className="mt-2">STG</h5>
              <div className="identify-grid--label-text identify__row border-bottom">
                <label className="identify-grid--label-text__label font-weight-bolder text-right">Gang</label>
                <label className="identify-grid--label-text__text">{props.offender.gang_type}</label>
                <label className="identify-grid--label-text__label font-weight-bolder text-right">Set</label>
                <label className="identify-grid--label-text__text">{extra.gang_name}</label>
              </div>
            </> : null
        }
        <div className="identify-grid--contacts identify__row identify__items-container px-3 mt-3">
          <div>
            <label className="font-weight-bolder">Supervision Start</label>
            <label className="d-block">{dateFormatter.format(extra.supervision_start_date)}</label>
          </div>
          <div>
            <label className="font-weight-bolder">ECC Date</label>
            <label className="d-block">{dateFormatter.format(extra.earned_compliance_credit)}</label>
          </div>
        </div>
        <div className="identify--center-content pt-5 pb-3">
          <Button color="primary" onClick={() => props.show(false)}>Close</Button>
        </div>
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
