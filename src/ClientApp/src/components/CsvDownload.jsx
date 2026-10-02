import '@esri/calcite-components/components/calcite-action';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Console from '../Console';

export default function CsvDownload(props) {
  const [disabled, setDisabled] = useState(props.disabled || false);
  const [status, setStatus] = useState(props.status);

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
    <calcite-action
      className="rounded-none bg-(--calcite-color-foreground-1) shadow-(--arcgis-internal-box-shadow)"
      slot={props.slot}
      disabled={disabled}
      icon={status === undefined ? 'download-to' : status ? 'check-circle' : 'exclamation-mark-triangle'}
      label="Export features to CSV"
      loading={disabled}
      onClick={exportToCsv}
    ></calcite-action>
  );
}
CsvDownload.propTypes = {
  slot: PropTypes.string,
  disabled: PropTypes.bool,
  status: PropTypes.bool,
  download: PropTypes.func.isRequired,
};
