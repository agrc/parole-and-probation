import classNames from 'clsx';
import * as React from 'react';

const dateFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });

const calculateAge = (dob) => {
  if (!dob) {
    return '';
  }

  dob = parseInt(dob);

  const elapsed = new Date(new Date() - new Date(dob));

  return Math.abs(elapsed.getUTCFullYear() - 1970);
};

const getValue = (props) => {
  let value = props.children || props.value;

  if (props.age && value) {
    value = `${calculateAge(props.age)} ${value}`;
  }

  if (props.lower && value) {
    value = value.toLowerCase();
  }

  if (props.date && value) {
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
      <label className="font-weight-bolder">{props.label}</label>
      <label className="d-block">{value}</label>
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
      <label className="identify-grid--label-text__label font-weight-bolder text-right">{label}</label>
      <label className="identify-grid--label-text__text">{value}</label>
    </>
  );
};

export { LabelGroup, IdentifyAddon, GridLabelGroup };
