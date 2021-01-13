import * as React from 'react';
import './Header.css';
import logo from './udc_logo.png';

export default function Header(props) {
  return (
    <div className="app__header">
      <h1 className="header__heading">
        <span>{props.title}</span>
        <a className="heading__version" href="https://github.com/agrc/parole-and-probation/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer">{props.version}</a>
      </h1>
      <img src={logo} className="heading__img" alt="agrc logo" />
    </div>
  );
};
