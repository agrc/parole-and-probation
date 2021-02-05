import clsx from 'clsx';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Alert, Button, Container } from 'reactstrap';
import { fields } from '../../config';
import CloseButton from '../CloseButton';
import { FallbackComponent } from '../ErrorBoundary/ErrorBoundary';
import { GoogleDirectionsLink, TelephoneLink } from '../FancyLinks';
import './Identify.css';
import { GridLabelGroup, IdentifyAddon, LabelGroup } from './Labels';
import Pager from './Pager';

const identifyCache = {};
const controller = new AbortController();
let signal = controller.signal;

const IdentifyInformation = (props) => {
  const [extra, setExtra] = React.useState({});
  const [offline, setOffline] = React.useState(false);

  React.useEffect(() => {
    if (props.offender.offender_id in identifyCache) {
      setExtra(identifyCache[props.offender.offender_id]);

      return;
    }

    console.log('IdentifyInformation::effect fetching');

    setExtra({});
    setOffline(false);

    identifyFetch(props.offender, signal).then(
      (result) => {
        console.log('IdentifyFetch::Promise Resolution::adding extra identify params');

        identifyCache[props.offender.offender_id] = result;

        setExtra(result);
      },
      () => setOffline(true)
    );
  }, [props.offender, props.index]);

  const wrapWithOffline = (value) => {
    if (offline) {
      return 'offline';
    }

    return value;
  };

  return props.offender && Object.keys(props.offender).length > 0 ? (
    <Container className="identify pt-4">
      <Pager features={props.features} index={props.index} update={props.update}></Pager>
      {offline ? <p>You do not appear to have internet connectivity. The results displayed are incomplete.</p> : null}
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <OffenderQuickLook
          age={wrapWithOffline(extra.date_of_birth)}
          gender={props.offender.gender}
          standard_of_supervision={props.offender.standard_of_supervision}
          legal_status={props.offender.legal_status}
          active_warrant={props.offender.active_warrant}
          offender={props.offender.offender}
          race={wrapWithOffline(extra.race)}
          id={props.offender.offender_id}
          agent={wrapWithOffline(extra.agent_name)}
        />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <OffenderAlerts cautions={wrapWithOffline(extra.cautions)} alerts={wrapWithOffline(extra.alerts)} />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <RecentVisitation
          office={props.offender.last_office_contacts}
          successful={props.offender.last_successful_field_contact}
          attempted={props.offender.last_attempted_field_contact}
        />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <OffenderContactInfo
          phone={props.offender.offender_phone}
          address={wrapWithOffline(extra.address)}
          unit={wrapWithOffline(extra.unit)}
          city={props.offender.city}
          zip={props.offender.zip}
          type={wrapWithOffline(extra.address_type)}
          since={wrapWithOffline(extra.address_start_date)}
          employer={props.offender.employer}
          employer_address={wrapWithOffline(extra.employer_address)}
          employer_phone={wrapWithOffline(extra.employer_phone)}
        />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <SpecialSupervision>{extra}</SpecialSupervision>
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <PrimaryOffense
          primary_offense={wrapWithOffline(extra.primary_offense)}
          degree={props.offender.crime_degree}
          description={wrapWithOffline(extra.offense_description)}
        />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <GangInformation gang={props.offender.gang_type} set={wrapWithOffline(extra.gang_name)} />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <OtherInformation
          supervision_start_date={wrapWithOffline(extra.supervision_start_date)}
          ecc={wrapWithOffline(extra.earned_compliance_credit)}
        />
      </ErrorBoundary>
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
  const classes = clsx('identify__container', { 'd-none': !props.visible });

  return (
    <div className={classes}>
      <CloseButton onClick={() => props.show(false)} />
      {props.children}
    </div>
  );
};

const identifyFetch = async (offender, cancellationToken) => {
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

  console.log('identifyFetch::querying extra offender data');

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

const OffenderImage = ({ offenderId }) => {
  const [image, setImage] = React.useState(null);
  const [showError, setShowError] = React.useState(false);

  React.useEffect(() => {
    const getImage = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/mugshot/${offenderId}`);

        if (!response.ok) {
          setShowError(true);

          return;
        }

        const blob = await response.blob();

        setImage(URL.createObjectURL(blob));
      } catch (error) {
        console.error(error);
        setShowError(true);
      }
    };

    setImage(null);
    setShowError(false);

    if (offenderId) {
      getImage();
    }
  }, [offenderId]);

  if (showError) {
    return <span>offline</span>;
  }

  if (!image) {
    return <span>loading image...</span>;
  }

  return <img src={image} alt="offender" />;
};

const OffenderQuickLook = (props) => {
  let race = null;
  if (typeof props.race === 'string') {
    if (props.race.toLowerCase() !== 'unknown') {
      race = props.race.toLowerCase();
    }
  } else {
    race = props.race;
  }

  if (race) {
    race = (
      <small className="text-muted d-block" style={{ fontSize: '1rem' }}>
        {race}
      </small>
    );
  }

  return (
    <>
      <h4>
        {props.offender}
        {race}
      </h4>
      <div className="d-flex justify-content-center identify__row mb-2">
        <OffenderImage offenderId={props.id} />
      </div>
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
