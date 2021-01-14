import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'clsx';
import React from 'react';
import { Button } from 'reactstrap';
import StaticLegend from '../StaticLegend';
import './MapLens.css';

export default function MapLens(props) {
  const classes = classNames(
    'map-lens',
    'map-lens--with-border',
    props.showSidebar ? 'map-lens--side-bar-open' : false
  );

  const buttonClasses = classNames(
    { 'map-lens__toggle--mobile-open': props.showSidebar },
    'map-lens__toggle',
    'btn',
    'btn-default'
  )

  return (
    <div className={classes}>
      {props.children}
      <Button color="info" className={buttonClasses} onClick={props.toggleSidebar}>
        {props.showSidebar ? <FontAwesomeIcon icon={faChevronLeft} size='xs' /> : <FontAwesomeIcon icon={faChevronLeft} size='xs' flip='horizontal' />}
      </Button>
      <StaticLegend legend={[
        {
          label: 'probation',
          color: '#53C3F9',
          invert: true
        }, {
          label: 'parole',
          color: '#DAFC86',
          invert: true
        }, {
          label: 'fugitive',
          color: '#F08683',
          invert: true
        }]
      } />
    </div>
  );
}
