import { Button, Spinner } from '@ugrc/utah-design-system';
import clsx from 'clsx';
import ky from 'ky';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Console from '../../Console';
import { fields } from '../../config';
import { FallbackComponent } from '../ErrorBoundary';
import { GoogleDirectionsLink, TelephoneLink } from '../FancyLinks';
import { GridLabelGroup, IdentifyAddon, LabelGroup } from './Labels';
import Pager from './Pager';

const identifyCache = {};
const controller = new AbortController();
let signal = controller.signal;

const IdentifyInformation = (props) => {
  const [extra, setExtra] = useState({});
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    if (!props.offender?.offender_id) {
      return;
    }

    if (props.offender.offender_id in identifyCache) {
      setExtra(identifyCache[props.offender.offender_id]);

      return;
    }

    setExtra({});
    setOffline(false);

    identifyFetch(props.offender, signal).then(
      (result) => {
        Console('IdentifyFetch:loading extra identify information');

        identifyCache[props.offender.offender_id] = result;

        setExtra(result);
      },
      () => setOffline(true),
    );
  }, [props.offender, props.index]);

  const wrapWithOffline = (value) => {
    if (offline) {
      return 'offline';
    }

    return value;
  };

  return props.offender && Object.keys(props.offender).length > 0 ? (
    <div className="mx-auto w-full px-2 identify pt-4">
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
      <div className="flex justify-center pt-5 pb-3">
        <Button color="primary" onClick={() => props.show(false)}>
          Close
        </Button>
      </div>
    </div>
  ) : (
    <div className="mx-auto px-2 w-full identify py-4">No offenders at click location</div>
  );
};
IdentifyInformation.propTypes = {
  features: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  offender: PropTypes.object,
  show: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

const IdentifyContainer = (props) => {
  const classes = clsx('identify__container', { hidden: !props.visible });

  return (
    <div className={classes}>
      <Button
        aria-label="Close"
        className="rounded-full absolute -right-2 -top-2 px-3 min-h-0 text-black dark:text-white"
        variant="icon"
        onPress={() => props.show(false)}
      >
        <span aria-hidden="true" className="text-secondary-950 text-2xl">
          &times;
        </span>
      </Button>
      {props.children}
    </div>
  );
};
IdentifyContainer.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool.isRequired,
  show: PropTypes.func.isRequired,
};

const identifyFetch = async (offender, cancellationToken) => {
  if (!offender.offender_id) {
    return null;
  }

  const base = `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ''
  }`;
  const url = new URL('/secure/0/query', base);
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

  Console(`identifyFetch:querying extra offender data ${offender.offender_id}`);

  const response = await ky.get(url, {
    signal: cancellationToken,
    credentials: 'include',
  });

  if (!response.ok) {
    return offender;
  }

  const data = await response.json();

  if (data.error) {
    console.error(data.error);

    return offender;
  }

  Console(`identifyFetch:found ${data.features.length} offenders`);

  if (data.features.length !== 1) {
    return offender;
  }

  return {
    ...offender,
    ...data.features[0].attributes,
  };
};

const OffenderImage = ({ offenderId }) => {
  const [image, setImage] = useState(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const getImage = async () => {
      try {
        const response = await Spinner.minDelay(ky(`/mugshot/${offenderId}`));

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
    return (
      <span className="max-w-full h-48 aspect-[3/4] border flex items-center justify-center bg-gray-200 dark:bg-gray-900 dark:border-gray-700 border-primary-900">
        offline
      </span>
    );
  }

  if (!image) {
    return (
      <span className="max-w-full h-48 aspect-[3/4] border flex items-center justify-center bg-gray-200 dark:bg-gray-900 dark:border-gray-700 border-primary-900">
        <div className="size-8">
          <Spinner />
        </div>
      </span>
    );
  }

  return <img src={image} alt="" className="max-w-full max-h-48 border border-primary-900" />;
};
OffenderImage.propTypes = {
  offenderId: PropTypes.string.isRequired,
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
    race = <small className="text-gray-500 block text-base font-normal">{race}</small>;
  }

  return (
    <>
      <h4>
        {props.offender}
        {race}
      </h4>
      <div className="flex justify-center mb-2">
        <OffenderImage offenderId={props.id} />
      </div>
      <div className="border-b mb-2 pb-2">
        <div className="grid gap-x-2 gap-y-1 grid-cols-[1fr_2.5fr]">
          <GridLabelGroup label="Number">{props.id}</GridLabelGroup>
          <GridLabelGroup label="Agent">{props.agent}</GridLabelGroup>
        </div>
        <div className="grid gap-x-2 gap-y-1 grid-rows-2 grid-cols-2 mt-2">
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
OffenderQuickLook.propTypes = {
  age: PropTypes.string,
  agent: PropTypes.string,
  gender: PropTypes.string,
  standard_of_supervision: PropTypes.string,
  legal_status: PropTypes.string,
  active_warrant: PropTypes.bool,
  offender: PropTypes.string,
  race: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  id: PropTypes.string.isRequired,
};

const OffenderAlerts = (props) => {
  return (
    <>
      {props.cautions ? (
        <>
          <h5 className="mt-2">Cautions</h5>
          <div className="p-2 text-warning-900 rounded-none mb-0 w-full bg-warning-100 border border-rose-800">
            {props.cautions}
          </div>
        </>
      ) : null}
      {props.alerts ? (
        <>
          <h5 className="mt-2">Alerts</h5>
          <div className="p-2 text-warning-900 rounded-none mb-0 w-full bg-warning-100 border border-rose-800">
            {props.alerts}
          </div>
        </>
      ) : null}
    </>
  );
};
OffenderAlerts.propTypes = {
  cautions: PropTypes.string,
  alerts: PropTypes.string,
};

const RecentVisitation = (props) => {
  return (
    <>
      <h5 className="mt-2">
        Recent Contact
        <small className="text-gray-500 font-normal text-base"> (days since)</small>
      </h5>
      <div className="grid gap-4 border-b grid-cols-3 flex-auto">
        <div>
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
RecentVisitation.propTypes = {
  successful: PropTypes.string,
  attempted: PropTypes.string,
  office: PropTypes.string,
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
        <div className="grid gap-2 grid-cols-[1fr_2.5fr]">
          <GridLabelGroup label={<TelephoneLink phone={props.phone}>Phone</TelephoneLink>}>
            {props.phone}
          </GridLabelGroup>
        </div>
      ) : null}
      <div className="grid gap-2 grid-cols-[1fr_2.5fr]">
        <GridLabelGroup label={<GoogleDirectionsLink address={fullAddress}>Address</GoogleDirectionsLink>}>
          {fullAddress}
        </GridLabelGroup>
      </div>
      {props.type ? (
        <div className="grid gap-2 grid-cols-[1fr_2.5fr]">
          <GridLabelGroup label="Type">{props.type}</GridLabelGroup>
        </div>
      ) : null}
      <div className="grid gap-2 grid-cols-[1fr_2.5fr]">
        <GridLabelGroup date label="Since" defaultValue="unknown">
          {props.since}
        </GridLabelGroup>
      </div>
      <div className="grid gap-2 grid-cols-[1fr_2.5fr] border-b">
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
OffenderContactInfo.propTypes = {
  phone: PropTypes.string,
  address: PropTypes.string,
  unit: PropTypes.string,
  city: PropTypes.string,
  zip: PropTypes.string,
  type: PropTypes.string,
  since: PropTypes.string,
  employer: PropTypes.string,
  employer_address: PropTypes.string,
  employer_phone: PropTypes.string,
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
      <div className="grid grid-cols-3 flex-auto gap-4 relative shadow-sm border-b">
        {actives.map((item, i) => (
          <label className="" key={item + i}>
            {item.toLocaleUpperCase()}
          </label>
        ))}
      </div>
    </>
  );
};
SpecialSupervision.propTypes = {
  children: PropTypes.object,
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
      <div className="border-b">
        {value ? <label className="">{value}</label> : null}
        {props.description ? <p className="pl-3">{props.description}</p> : null}
      </div>
    </>
  );
};
PrimaryOffense.propTypes = {
  primary_offense: PropTypes.string,
  degree: PropTypes.string,
  description: PropTypes.string,
};

const GangInformation = (props) => {
  if (!props.gang) {
    return null;
  }

  return (
    <>
      <h5 className="mt-2">STG</h5>
      <div className="grid gap-2 grid-cols-[1fr_2.5fr] border-b">
        <GridLabelGroup label="Gang">{props.gang}</GridLabelGroup>
        <GridLabelGroup label="Set">{props.set}</GridLabelGroup>
      </div>
    </>
  );
};
GangInformation.propTypes = {
  gang: PropTypes.string,
  set: PropTypes.string,
};

const OtherInformation = (props) => {
  return (
    <div className="flex flex-wrap justify-between mt-3">
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
OtherInformation.propTypes = {
  supervision_start_date: PropTypes.string,
  ecc: PropTypes.string,
};

export {
  GangInformation,
  IdentifyContainer,
  IdentifyInformation,
  OffenderAlerts,
  OffenderContactInfo,
  OffenderQuickLook,
  OtherInformation,
  PrimaryOffense,
  RecentVisitation,
  SpecialSupervision,
};
