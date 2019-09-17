import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownloadAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

export default function CsvDownload(props) {
  const [disabled, setDisabled] = useState(props.disabled || false);
  const [status, setStatus] = useState(props.status);

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
