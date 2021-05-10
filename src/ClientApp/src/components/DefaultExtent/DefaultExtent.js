import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import Console from '../../Console';
import useViewUiPosition from '../../useViewUiPosition';

const goHome = (view, extent) => {
  Console('DefaultExtent:zooming to default extent');

  return view.goTo(extent);
};

export default function DefaultExtent(props) {
  const me = useViewUiPosition(props.view, props.position);

  return (
    <div
      ref={me}
      className="esri-home esri-widget--button esri-widget"
      role="button"
      aria-label="Default map view"
      title="Default map view"
      onClick={() => goHome(props.view, props.extent)}
    >
      <FontAwesomeIcon icon={faGlobeAmericas} className="esri-icon esri-icon-home" />
    </div>
  );
}
