import { useViewUiPosition } from '@ugrc/utilities/hooks';
import classNames from 'clsx';
import { MapPinHouse } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function MapToolPanel(props) {
  const [expanded, setExpanded] = useState(props.expanded || false);
  const me = useViewUiPosition(props.view, props.position);

  const popOutClasses = classNames(expanded ? false : 'hidden', 'map-tool-panel p-2');
  const iconClasses = classNames(expanded ? 'hidden' : false, 'esri-icon p-1');

  return (
    <div
      ref={me}
      className={classNames(
        props.className,
        'bg-white point-events-auto min-w-8 min-h-8 esri-widget--button esri-widget esri-component',
        expanded ? '!w-auto !h-auto !size-auto' : false,
      )}
      role="dialog"
      aria-label="Zoom to address"
      title="Geocode"
      onFocus={() => setExpanded(true)}
      onBlur={() => {}}
      onMouseOver={() => setExpanded(true)}
      onMouseOut={() => setExpanded(false)}
    >
      <MapPinHouse className={iconClasses} />
      <form className={popOutClasses} autoComplete="new-password">
        {props.children}
      </form>
    </div>
  );
}
MapToolPanel.propTypes = {
  view: PropTypes.object.isRequired,
  position: PropTypes.string,
  expanded: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};
