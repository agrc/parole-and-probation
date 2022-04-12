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
    <a href={generateDirectionsUrl(props.address)} rel="noopener noreferrer" target="_blank">
      {props.children}
    </a>
  );
}

export function TelephoneLink(props) {
  if (!props.phone || props?.phone === 'offline') {
    return props.children;
  }

  return <a href={`tel: ${props.phone}`}>{props.children}</a>;
}
