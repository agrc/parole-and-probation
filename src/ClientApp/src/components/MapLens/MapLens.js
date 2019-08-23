import React from 'react';
import './MapLens.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import classNames from 'classnames'

export default function MapLens(props) {
  const classes = classNames(
    'map-lens',
    'map-lens--with-border',
    props.showSidebar ? ' map-lens--side-bar-open' : false
  );

  return (
    <div id="centerContainer" className={classes}>
      <Button color="info" className="map-lens__sidebar btn btn-default" onClick={props.toggleSidebar}>
        {props.showSidebar ? <FontAwesomeIcon icon={faChevronLeft} size='xs' /> : <FontAwesomeIcon icon={faChevronLeft} size='xs' flip='horizontal' />}
      </Button>
      {props.children}
    </div>
  );
}
