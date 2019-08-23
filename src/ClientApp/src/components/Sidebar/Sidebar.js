import React from 'react';
import './Sidebar.css';

export default function Sidebar(props) {
  return (
    <div id="sideBar" className="side-bar side-bar--open">
      {props.children}
    </div>
  );
};
