import { faCloudDownloadAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'clsx';
import React, { useEffect, useState } from 'react';
import useViewUiPosition from '../../useViewUiPosition';

export default function CsvDownload(props) {
  const [disabled, setDisabled] = useState(props.disabled || false);
  const [status, setStatus] = useState(props.status);
  const me = useViewUiPosition(props.view, props.position);

  useEffect(() => {
    if (status === undefined) {
      return;
    }

    const timeout = setTimeout(() => {
      console.log('resetting button')
      setStatus(undefined);
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [status, setStatus]);

  const classes = classNames(
    'esri-widget--button',
    'esri-widget',
    disabled ? 'esri-button--disabled' : false,
    status === undefined ? false : status ? 'text-primary' : 'text-danger'
  );

  return (
    <div
      ref={me}
      className={classes}
      role="button"
      aria-label="Export features to CSV"
      title="Export features to CSV"
      onClick={async () => {
        if (disabled) {
          return;
        }

        setDisabled(true);

        try {
          const status = await props.download();
          setStatus(status);
        } catch (e) {
          setStatus(false);
        } finally {
          setDisabled(false);
        }
      }}>
      <FontAwesomeIcon spin={disabled} icon={status ? faPaperPlane : faCloudDownloadAlt} className="esri-icon" />
    </div>
  );
};
