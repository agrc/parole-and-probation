import * as React from 'react';
import { Alert, Button, Container } from 'reactstrap';
import { fields } from '../../config';
import CloseButton from '../CloseButton';
import { GoogleDirectionsLink, TelephoneLink } from '../FancyLinks';
import './Identify.css';
import { GridLabelGroup, IdentifyAddon, LabelGroup } from './Labels';
import Pager from './Pager';

const identifyCache = {};
const controller = new AbortController();
let signal = controller.signal;

const IdentifyInformation = (props) => {
  const [extra, setExtra] = React.useState({});

  React.useEffect(() => {
    if (props.offender.offender_id in identifyCache) {
      setExtra(identifyCache[props.offender.offender_id]);

      return;
    }

    console.log('IdentifyInformation::effect fetching');

    setExtra({});

    IdentifyFetch(props.offender, signal).then((result) => {
      console.log('IdentifyFetch::Promise Resolution::adding extra identify params');

      identifyCache[props.offender.offender_id] = result;

      setExtra(result);
    });
  }, [props.offender, props.index]);

  return props.offender && Object.keys(props.offender).length > 0 ? (
    <Container className="identify pt-4">
      <Pager features={props.features} index={props.index} update={props.update}></Pager>
      <OffenderQuickLook
        age={extra.date_of_birth}
        gender={props.offender.gender}
        standard_of_supervision={props.offender.standard_of_supervision}
        legal_status={props.offender.legal_status}
        active_warrant={props.offender.active_warrant}
        offender={props.offender.offender}
        race={extra.race}
        id={props.offender.offender_id}
        agent={extra.agent_name}
      />
      <OffenderAlerts cautions={extra.cautions} alerts={extra.alerts} />
      <RecentVisitation
        office={props.offender.last_office_contacts}
        successful={props.offender.last_successful_field_contact}
        attempted={props.offender.last_attempted_field_contact}
      />
      <OffenderContactInfo
        phone={props.offender.offender_phone}
        address={extra.address}
        unit={extra.unit}
        city={props.offender.city}
        zip={props.offender.zip}
        type={extra.address_type}
        since={extra.address_start_date}
        employer={props.offender.employer}
        employer_address={extra.employer_address}
        employer_phone={extra.employer_phone}
      />
      <SpecialSupervision>{extra}</SpecialSupervision>
      <PrimaryOffense
        primary_offense={extra.primary_offense}
        degree={props.offender.crime_degree}
        description={extra.offense_description}
      />
      <GangInformation gang={props.offender.gang_type} set={extra.gang_name} />
      <OtherInformation supervision_start_date={extra.supervision_start_date} ecc={extra.earned_compliance_credit} />
      <div className="identify__row text-center pt-5 pb-3">
        <Button color="primary" onClick={() => props.show(false)}>
          Close
        </Button>
      </div>
    </Container>
  ) : (
    <Container className="identify pt-4">No offenders at click location</Container>
  );
};

const IdentifyContainer = (props) => {
  return (
    <div className="identify__container side-bar side-bar--with-border side-bar--open">
      <CloseButton className="identify__close" onClick={() => props.show(false)} />
      {props.children}
    </div>
  );
};

const IdentifyFetch = async (offender, cancellationToken) => {
  if (!offender) {
    return null;
  }

  const base = `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ''
  }`;
  const url = new URL(`${process.env.PUBLIC_URL}/mapserver/0/query`, base);
  url.search = new URLSearchParams([
    ['f', 'json'],
    [
      'outFields',
      Object.keys(fields)
        .filter((key) => fields[key].identify === true)
        .join(),
    ],
    ['where', `offender_id=${offender.offender_id}`],
    ['returnGeometry', false],
  ]);

  console.log('IdentifyFetch::querying extra offender data');

  const response = await fetch(url, {
    signal: cancellationToken,
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
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
    ...data.features[0].attributes,
  };
};

const OffenderQuickLook = (props) => {
  return (
    <>
      <h4>
        {props.offender}
        {props.race ? (
          props.race.toLowerCase() === 'unknown' ? null : (
            <small className="text-muted d-block" style={{ fontSize: '1rem' }}>
              {props.race.toLowerCase()}
            </small>
          )
        ) : null}
      </h4>
      <div className="border-bottom mb-2 pb-2 identify__row">
        <div className="d-grid identify-grid--label-text">
          <GridLabelGroup label="Number">{props.id}</GridLabelGroup>
          <GridLabelGroup label="Agent">{props.agent}</GridLabelGroup>
        </div>
        <div className="d-grid identify-addon__subgrid px-3">
          <IdentifyAddon age={props.age}>{props.gender}</IdentifyAddon>
          <IdentifyAddon defaultValue="No STD">{props.standard_of_supervision}</IdentifyAddon>
          <IdentifyAddon defaultValue="unknown" lower>
            {props.legal_status}
          </IdentifyAddon>
          <IdentifyAddon danger={props.active_warrant}>
            {props.active_warrant ? 'active warrant' : 'no active warrant'}
          </IdentifyAddon>
        </div>
      </div>
    </>
  );
};

const OffenderAlerts = (props) => {
  return (
    <>
      {props.cautions ? (
        <>
          <h5 className="mt-2">Cautions</h5>
          <div className="identify__row">
            <Alert className="rounded-0 mb-0 w-100" color="danger">
              {props.cautions}
            </Alert>
          </div>
        </>
      ) : null}
      {props.alerts ? (
        <>
          <h5 className="mt-2">Alerts</h5>
          <div className="identify__row">
            <Alert className="rounded-0 mb-0 w-100" color="danger">
              {props.alerts}
            </Alert>
          </div>
        </>
      ) : null}
    </>
  );
};

const RecentVisitation = (props) => {
  return (
    <>
      <h5 className="mt-2">
        Recent Contact
        <small className="text-muted" style={{ fontSize: '1rem' }}>
          {' '}
          (days since)
        </small>
      </h5>
      <div className="d-grid identify-grid--contacts identify__row border-bottom">
        <div className="identify-grid--contacts__item">
          <LabelGroup label="Successful">{props.successful}</LabelGroup>
        </div>
        <div>
          <LabelGroup label="Attempted">{props.attempted}</LabelGroup>
        </div>
        <div>
          <LabelGroup label="Office">{props.office}</LabelGroup>
        </div>
      </div>
    </>
  );
};

const OffenderContactInfo = (props) => {
  let fullAddress = '';
  if (props.address) {
    fullAddress = props.address;

    if (props.unit) {
      fullAddress += ` ${props.unit}`;
    }
  }

  if (props.city) {
    if (fullAddress) {
      fullAddress += `, ${props.city}`;
    } else {
      fullAddress = props.city;
    }
  }

  if (props.zip) {
    if (fullAddress) {
      fullAddress += ` ${props.zip}`;
    } else {
      fullAddress = props.zip;
    }
  }

  return (
    <>
      <h5 className="mt-2">Contact Information</h5>
      {props.phone ? (
        <div className="d-grid identify-grid--label-text identify__row">
          <GridLabelGroup label={<TelephoneLink phone={props.phone}>Phone</TelephoneLink>}>
            {props.phone}
          </GridLabelGroup>
        </div>
      ) : null}
      <div className="d-grid identify-grid--label-text identify__row">
        <GridLabelGroup label={<GoogleDirectionsLink address={fullAddress}>Address</GoogleDirectionsLink>}>
          {fullAddress}
        </GridLabelGroup>
      </div>
      {props.type ? (
        <div className="d-grid identify-grid--label-text identify__row">
          <GridLabelGroup label="Type">{props.type}</GridLabelGroup>
        </div>
      ) : null}
      <div className="d-grid identify-grid--label-text identify__row">
        <GridLabelGroup date label="Since" defaultValue="unknown">
          {props.since}
        </GridLabelGroup>
      </div>
      <div className="d-grid identify-grid--label-text identify__row border-bottom">
        <GridLabelGroup label="Employer" defaultValue="unemployed or unknown">
          {props.employer}
        </GridLabelGroup>
        {props.employer_address ? (
          <GridLabelGroup label={<GoogleDirectionsLink address={props.employer_address}>Address</GoogleDirectionsLink>}>
            {props.employer_address}
          </GridLabelGroup>
        ) : null}
        {props.employer_phone ? (
          <GridLabelGroup label={<TelephoneLink phone={props.employer_phone}>Phone</TelephoneLink>}>
            {props.employer_phone}
          </GridLabelGroup>
        ) : null}
      </div>
    </>
  );
};

const SpecialSupervision = (props) => {
  const keys = Object.keys(props?.children);
  if (keys.length < 1) {
    return null;
  }

  const specialSupervisions = Object.keys(fields).filter((key) => fields[key].ss === true);
  const ssKeys = keys.filter((key) => specialSupervisions.includes(key));

  const actives = ssKeys.filter((key) => props.children[key] === 1);
  if (actives.length < 1) {
    return null;
  }

  return (
    <>
      <h5 className="mt-2">Special Supervisions</h5>
      <div className="identify-grid--contacts identify__row identify__items-container px-3 border-bottom">
        {actives.map((item, i) => (
          <label key={item + i}>{item.toLocaleUpperCase()}</label>
        ))}
      </div>
    </>
  );
};

const PrimaryOffense = (props) => {
  let value = '';
  if (props.primary_offense) {
    value = props.primary_offense;
  }

  if (props.degree) {
    value += ` (${props.degree})`;
  }

  return (
    <>
      <h5 className="mt-2">Primary Offense</h5>
      <div className="identify__row border-bottom">
        {value ? <label className="identify-grid--contacts__item">{value}</label> : null}
        {props.description ? <p className="pl-3">{props.description}</p> : null}
      </div>
    </>
  );
};

const GangInformation = (props) => {
  if (!props.gang) {
    return null;
  }

  return (
    <>
      <h5 className="mt-2">STG</h5>
      <div className="d-grid identify-grid--label-text identify__row border-bottom">
        <GridLabelGroup label="Gang">{props.gang}</GridLabelGroup>
        <GridLabelGroup label="Set">{props.set}</GridLabelGroup>
      </div>
    </>
  );
};

const OtherInformation = (props) => {
  return (
    <div className="identify-grid--contacts identify__row identify__items-container px-3 mt-3">
      <div>
        <LabelGroup date label="Supervision Start">
          {props.supervision_start_date}
        </LabelGroup>
      </div>
      <div>
        <LabelGroup date label="ECC Date">
          {props.ecc}
        </LabelGroup>
      </div>
    </div>
  );
};

export {
  IdentifyInformation,
  IdentifyContainer,
  OffenderQuickLook,
  OffenderAlerts,
  RecentVisitation,
  OffenderContactInfo,
  SpecialSupervision,
  PrimaryOffense,
  GangInformation,
  OtherInformation,
};
