import Graphic from '@arcgis/core/Graphic';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useViewUiPosition } from '@ugrc/utilities/hooks';
import classNames from 'clsx';
import { useEffect, useState } from 'react';
import Console from '../../Console';

const supportsGeolocation = () => {
  if (!navigator.geolocation) {
    return false;
  }

  if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
    return false;
  }

  return true;
};

const options = {
  enableHighAccuracy: true,
  timeout: 30000,
  maximumAge: 0,
};

const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        reject(error);
      },
      options,
    );
  });
};

const geolocate = async (props) => {
  props.setProgress(true);
  props.setStatus(undefined);

  let position = {};
  try {
    position = await getCurrentPosition();
  } catch (error) {
    console.error(error);
    props.setProgress(false);
    props.setStatus(false);
    return;
  }

  props.setProgress(false);
  props.setStatus(true);

  var point = {
    type: 'point',
    longitude: position.coords.longitude,
    latitude: position.coords.latitude,
    spatialReference: {
      wkid: 4326,
    },
  };

  const graphic = new Graphic({
    geometry: point,
    symbol: {
      type: 'simple-marker',
      outline: { width: 1.5, color: [255, 255, 255, 1] },
      size: 11,
      color: [0, 116, 217, 0.75],
    },
  });

  props.dispatch({ type: 'ZOOM_TO_GRAPHIC', payload: graphic });
};

export default function Geolocation(props) {
  const [spin, setProgress] = useState(props.spin || false);
  const [status, setStatus] = useState(props.status);
  const me = useViewUiPosition(props.view, props.position);

  useEffect(() => {
    if (status === undefined) {
      return;
    }

    const timeout = setTimeout(() => {
      Console('Geolocation:resetting geolocation');
      setStatus(undefined);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [status, setStatus]);

  const classes = classNames(
    'esri-widget--button',
    'esri-widget',
    'esri-component',
    spin ? 'esri-button--disabled' : false,
    status === undefined ? false : status ? 'text-primary' : 'text-danger',
  );

  return supportsGeolocation() ? (
    <div
      ref={me}
      className={classes}
      role="button"
      aria-label="Zoom to current location"
      title="Geolocate"
      onClick={() => geolocate({ setProgress, setStatus, dispatch: props.dispatcher })}
      onKeyUp={() => geolocate({ setProgress, setStatus, dispatch: props.dispatcher })}
      tabIndex={0}
    >
      <FontAwesomeIcon spin={spin} icon={faCrosshairs} className="esri-icon" />
    </div>
  ) : null;
}
