import { faCloudDownloadAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useViewUiPosition } from '@ugrc/utilities/hooks';
import classNames from 'clsx';
import { useEffect, useState } from 'react';
import Console from '../../Console';

export default function CsvDownload(props) {
  const [disabled, setDisabled] = useState(props.disabled || false);
  const [status, setStatus] = useState(props.status);
  const me = useViewUiPosition(props.view, props.position);

  useEffect(() => {
    if (status === undefined) {
      return;
    }

    const timeout = setTimeout(() => {
      Console('CsvDownload:resetting button');
      setStatus(undefined);
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [status, setStatus]);

  const classes = classNames(
    'esri-widget--button',
    'esri-widget',
    'esri-component',
    disabled ? 'esri-button--disabled' : false,
    status === undefined ? false : status ? 'text-primary' : 'text-danger',
  );

  const exportToCsv = async () => {
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
  };

  return (
    <div
      ref={me}
      className={classes}
      role="button"
      aria-label="Export features to CSV"
      title="Export features to CSV"
      onKeyUp={exportToCsv}
      onClick={exportToCsv}
      tabIndex={0}
    >
      <FontAwesomeIcon spin={disabled} icon={status ? faPaperPlane : faCloudDownloadAlt} className="esri-icon" />
    </div>
  );
}
