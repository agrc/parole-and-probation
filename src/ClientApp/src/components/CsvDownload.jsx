import { useViewUiPosition } from '@ugrc/utilities/hooks';
import classNames from 'clsx';
import { CloudDownloadIcon, SendIcon } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Console from '../Console';

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
    } catch {
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
      {status ? <SendIcon className="esri-icon" /> : <CloudDownloadIcon className="esri-icon p-1" />}
    </div>
  );
}
CsvDownload.propTypes = {
  view: PropTypes.object,
  position: PropTypes.string,
  disabled: PropTypes.bool,
  status: PropTypes.bool,
  download: PropTypes.func.isRequired,
};
