import React from 'react';
import classNames from 'classnames';
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
