import classNames from 'clsx';
import * as React from 'react';
import './CloseButton.css';

export default function CloseButton(props) {
  const classes = classNames(
    'close-button',
    props.className
  );

  return (
    <button className={classes} aria-label="Close" type="button" onClick={() => props.onClick(false)}>
      <span aria-hidden="true">&times;</span>
    </button>
  );
};
