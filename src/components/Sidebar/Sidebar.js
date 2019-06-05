import React from 'react';
import './Sidebar.css';

export default function Sidebar(props) {
  return (
    <div id="sideBar" className="side-bar side-bar--with-border side-bar--open">
      <div className="side-bar__padder">
        {props.children}
      </div>
    </div>
  )
}
