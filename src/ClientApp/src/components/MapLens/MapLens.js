import React from 'react';
import './MapLens.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';

export default function MapLens(props) {
  return (
    <div id="centerContainer" className={'map-lens map-lens--with-border' + (props.showSidebar ? ' map-lens--side-bar-open' : '')}>
      <Button size="sm" color="info" className="map-lens__sidebar btn btn-default btn-xs" onClick={props.toggleSidebar}>
        {props.showSidebar ? <FontAwesomeIcon icon={faChevronLeft} size='xs' /> : <FontAwesomeIcon icon={faChevronLeft} size='xs' flip='horizontal' />}
      </Button>
      {props.children}
    </div>
  );
}