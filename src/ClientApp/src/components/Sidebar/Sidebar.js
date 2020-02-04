import React from 'react';
import './Sidebar.css';
import classNames from 'classnames';

export default function Sidebar(props) {
  const classes = classNames(
    'side-bar',
    { 'side-bar--open': props.showSidebar },
    { 'side-bar--closed': !props.showSidebar }
  );

  return (
    <div id="sideBar" className={classes}>
      {props.children}
    </div>
  );
};
