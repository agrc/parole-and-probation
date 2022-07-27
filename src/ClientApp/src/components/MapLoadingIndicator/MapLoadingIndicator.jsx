import { useViewLoading } from '@ugrc/utilities/hooks';
import './MapLoadingIndicator.css';

export default function MapLoadingIndicator({ view }) {
  const isLoading = useViewLoading(view);

  return isLoading ? (
    <div className="map-loading-indicator">
      <div className="progress-bar"></div>
    </div>
  ) : null;
}
