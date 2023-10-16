import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useViewUiPosition } from '@ugrc/utilities/hooks';
import Console from '../../Console';

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
      <FontAwesomeIcon icon={faGlobeAmericas} className="esri-icon esri-icon-home" />
    </div>
  );
}
