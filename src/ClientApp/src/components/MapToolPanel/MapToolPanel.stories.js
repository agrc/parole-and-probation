import DartBoard from '@agrc/dart-board';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import MapToolPanel from './MapToolPanel';

storiesOf('MapTools/MapToolPanel', module)
  .addDecorator(story => (
    <div className="esri-ui-top-left esri-ui-corner">
      <div className="esri-component">{story()}</div>
    </div>
  ))
  .add('closed', () => (
    <MapToolPanel icon={faMapMarkedAlt}>
      <div>Hello!</div>
    </MapToolPanel>
  ))
  .add('open', () => (
    <MapToolPanel icon={faMapMarkedAlt} expanded={true}>
      <div>Hello!</div>
    </MapToolPanel>
  ))
  .add('with component child', () => (
    <MapToolPanel icon={faMapMarkedAlt}>
      <DartBoard
        className="pt-2 px-3"
        apiKey={process.env.REACT_APP_WEB_API}
        onFindAddress={result => console.log({ type: 'ZOOM_TO_GRAPHIC', payload: result })}
        pointSymbol={{
          type: 'simple-marker',
          style: 'diamond',
          color: [130, 65, 47, 0.5],
          size: '18px',
          outline: {
            color: [230, 126, 21, 0.7],
            width: 1
          }
        }}
      />
    </MapToolPanel>
  ));
