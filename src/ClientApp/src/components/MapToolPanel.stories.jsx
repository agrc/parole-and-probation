import { Geocode } from '@ugrc/utah-design-system';
import MapToolPanel from './MapToolPanel';

export default {
  title: 'MapTools/MapToolPanel',
  component: MapToolPanel,
  decorators: [(Story) => <div className="esri-ui-top-left esri-ui-corner">{Story()}</div>],
};

export const Closed = () => (
  <MapToolPanel>
    <div>Hello!</div>
  </MapToolPanel>
);
export const Open = () => (
  <MapToolPanel expanded={true}>
    <div>Hello!</div>
  </MapToolPanel>
);
export const WithComponentChild = () => (
  <MapToolPanel>
    <Geocode
      className="px-3 pt-2"
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
