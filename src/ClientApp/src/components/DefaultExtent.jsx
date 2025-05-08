import { useViewUiPosition } from '@ugrc/utilities/hooks';
import { HouseIcon } from 'lucide-react';
import PropTypes from 'prop-types';
import Console from '../Console';

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
      onKeyUp={() => goHome(props.view, props.extent)}
      tabIndex={0}
    >
      <HouseIcon className="esri-icon esri-icon-home p-1" />
    </div>
  );
}
DefaultExtent.propTypes = {
  view: PropTypes.object.isRequired,
  extent: PropTypes.object.isRequired,
  position: PropTypes.string,
};
