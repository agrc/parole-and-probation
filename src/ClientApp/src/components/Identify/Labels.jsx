import classNames from 'clsx';

const dateFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });

const calculateAge = (dob) => {
  if (dob === 'offline') {
    return dob;
  }

  if (!dob) {
    return '';
  }

  dob = parseInt(dob);

  const elapsed = new Date(new Date() - new Date(dob));

  return Math.abs(elapsed.getUTCFullYear() - 1970);
};

const getValue = (props) => {
  let value = props.children || props.value;

  if (value === 'offline') {
    return 'offline';
  }

  if (props.age && value) {
    value = `${calculateAge(props.age)} ${value}`;
  }

  if (props.lower && props.lower !== 'offline' && value) {
    value = value.toLowerCase();
  }

  if (props.date && props.date !== 'offline' && value) {
    value = dateFormatter.format(value);
  }

  if (!value) {
    value = '-';
    if (props.defaultValue !== undefined) {
      value = props.defaultValue;
    }
  }

  return value;
};

const LabelGroup = (props) => {
  const value = getValue(props);

  return (
    <>
      <label className="form-label fw-bolder">{props.label}</label>
      <label className="form-label d-block">{value}</label>
    </>
  );
};

const IdentifyAddon = (props) => {
  let { danger, className, border } = props;

  const value = getValue(props);

  const classes = classNames(
    className,
    danger === 1 ? 'identify__addon-item--danger' : false,
    border ? 'border-bottom border-info' : false,
    'd-flex',
    'identify__addon-item',
    'pl-1'
  );

  return <div className={classes}>{value}</div>;
};

const GridLabelGroup = (props) => {
  let { label } = props;

  const value = getValue(props);

  return (
    <>
      <label className="form-label identify-grid--label-text__label fw-bolder text-end">{label}</label>
      <label className="form-label identify-grid--label-text__text">{value}</label>
    </>
  );
};

export { LabelGroup, IdentifyAddon, GridLabelGroup };
