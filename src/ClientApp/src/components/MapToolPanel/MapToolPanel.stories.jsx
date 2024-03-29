import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import DartBoard from '@ugrc/dart-board';
import MapToolPanel from './MapToolPanel';

export default {
  title: 'MapTools/MapToolPanel',
  component: MapToolPanel,
  decorators: [(Story) => <div className="esri-ui-top-left esri-ui-corner">{Story()}</div>],
};

export const Closed = () => (
  <MapToolPanel icon={faMapMarkedAlt}>
    <div>Hello!</div>
  </MapToolPanel>
);
export const Open = () => (
  <MapToolPanel icon={faMapMarkedAlt} expanded={true}>
    <div>Hello!</div>
  </MapToolPanel>
);
export const WithComponentChild = () => (
  <MapToolPanel icon={faMapMarkedAlt}>
    <DartBoard
      className="pt-2 px-3"
      apiKey={import.meta.env.VITE_WEB_API}
      onFindAddress={(result) => console.log({ type: 'ZOOM_TO_GRAPHIC', payload: result })}
      pointSymbol={{
        type: 'simple-marker',
        style: 'diamond',
        color: [130, 65, 47, 0.5],
        size: '18px',
        outline: {
          color: [230, 126, 21, 0.7],
          width: 1,
        },
      }}
    />
  </MapToolPanel>
);
