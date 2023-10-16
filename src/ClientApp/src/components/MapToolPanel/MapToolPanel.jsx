import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useViewUiPosition } from '@ugrc/utilities/hooks';
import classNames from 'clsx';
import { useState } from 'react';
import CloseButton from '../CloseButton/CloseButton';
import './MapToolPanel.css';

export default function MapToolPanel(props) {
  const [expanded, setExpanded] = useState(props.expanded || false);
  const me = useViewUiPosition(props.view, props.position);

  const classes = classNames(
    props.className,
    'map-tool-panel',
    'esri-widget--button',
    'esri-widget',
    'esri-component',
    expanded ? 'map-tool-panel--open' : false,
  );

  const popOutClasses = classNames(expanded ? false : 'd-none', 'map-tool-panel');

  const iconClasses = classNames(expanded ? 'd-none' : false, 'esri-icon');

  return (
    <div
      ref={me}
      className={classes}
      role="dialog"
      aria-label="Zoom to address"
      title="Geocode"
      onMouseOver={() => setExpanded(true)}
      onMouseOut={() => setExpanded(false)}
    >
      <FontAwesomeIcon icon={props.icon} className={iconClasses} />
      <form className={popOutClasses} autoComplete="new-password">
        <CloseButton className="close-button--hide-on-lg" onClick={() => setExpanded(false)} />
        {props.children}
      </form>
    </div>
  );
}
