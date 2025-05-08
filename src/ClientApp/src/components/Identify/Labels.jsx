import classNames from 'clsx';
import PropTypes from 'prop-types';

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
      <label className="font-bold">{props.label}</label>
      <label className="block">{value}</label>
    </>
  );
};
LabelGroup.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lower: PropTypes.bool,
  defaultValue: PropTypes.string,
};

const IdentifyAddon = (props) => {
  let { danger, className, border } = props;

  const value = getValue(props);

  const classes = classNames(
    className,
    danger === 1 ? 'px-2 text-warning-900 rounded-none mb-0 w-full bg-warning-100 border border-rose-800' : false,
    border ? 'border-b border-blue-300' : false,
    'flex',
    'items-center',
    'pl-1',
  );

  return <div className={classes}>{value}</div>;
};
IdentifyAddon.propTypes = {
  danger: PropTypes.number,
  className: PropTypes.string,
  border: PropTypes.bool,
};

const GridLabelGroup = (props) => {
  let { label } = props;

  const value = getValue(props);

  return (
    <>
      <label className="identify-grid--label-text__label font-bold text-end">{label}</label>
      <label className="identify-grid--label-text__text">{value}</label>
    </>
  );
};
GridLabelGroup.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lower: PropTypes.bool,
  defaultValue: PropTypes.string,
};

export { GridLabelGroup, IdentifyAddon, LabelGroup };
