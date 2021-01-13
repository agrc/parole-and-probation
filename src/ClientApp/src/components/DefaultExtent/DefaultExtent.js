import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const goHome = (view, extent) => {
  console.log('zooming to default extent');

  return view.goTo(extent);
};

export default function DefaultExtent(props) {
  return (
    <div
      className="esri-home esri-widget--button esri-widget"
      role="button"
      aria-label="Default map view"
      title="Default map view"
      onClick={() => goHome(props.view, props.extent)}
    >
      <FontAwesomeIcon icon={faGlobeAmericas} className="esri-icon esri-icon-home" />
    </div>
  );
};
