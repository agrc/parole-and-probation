import classNames from 'clsx';
import * as React from 'react';
import './Sidebar.css';

export default function Sidebar(props) {
  const classes = classNames('side-bar', { 'side-bar--open': props.showSidebar });

  return (
    <aside id="sideBar" className={classes}>
      {props.children}
    </aside>
  );
}
