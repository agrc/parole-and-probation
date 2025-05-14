import PropTypes from 'prop-types';

const generateDirectionsUrl = (address) => {
  const baseUrl = 'https://www.google.com/maps/dir/?';
  const options = [
    ['api', 1],
    ['travelmode', 'driving'],
    ['dir_action', 'navigate'],
    ['destination', address],
  ];

  const params = new URLSearchParams(options);

  return `${baseUrl}${params.toString()}`;
};

export function GoogleDirectionsLink(props) {
  if (!props.address || props?.address === 'offline' || props?.address.startsWith('offline')) {
    return props.children;
  }

  return (
    <a
      className="text-secondary-900 decoration-secondary-900/50 hover:decoration-secondary-900 dark:text-secondary-500 dark:decoration-secondary-500/60 dark:hover:decoration-secondary-500 rounded underline transition disabled:cursor-default disabled:no-underline"
      href={generateDirectionsUrl(props.address)}
      rel="noopener noreferrer"
      target="_blank"
    >
      {props.children}
    </a>
  );
}
GoogleDirectionsLink.propTypes = {
  address: PropTypes.string,
  children: PropTypes.node,
};

export function TelephoneLink(props) {
  if (!props.phone || props?.phone === 'offline') {
    return props.children;
  }

  return (
    <a
      className="text-secondary-900 decoration-secondary-900/50 hover:decoration-secondary-900 dark:text-secondary-500 dark:decoration-secondary-500/60 dark:hover:decoration-secondary-500 rounded underline transition disabled:cursor-default disabled:no-underline"
      href={`tel: ${props.phone}`}
    >
      {props.children}
    </a>
  );
}
TelephoneLink.propTypes = {
  phone: PropTypes.string,
  children: PropTypes.node,
};
