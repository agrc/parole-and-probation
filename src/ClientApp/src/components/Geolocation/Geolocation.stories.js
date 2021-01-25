import * as React from 'react';
import Geolocation from './Geolocation';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'MapTools/Geolocation',
  component: Geolocation,
  decorators: [(Story) => <div className="esri-ui-top-left esri-ui-corner">{Story()}</div>],
  argTypes: {
    dispatch: { action: 'dispatched' },
  },
};

export const normal = (args) => <Geolocation dispatcher={args.dispatch} />;
export const busy = (args) => <Geolocation spin={true} dispatcher={args.dispatch} />;
export const success = (args) => <Geolocation status={true} dispatcher={args.dispatch} />;
export const fail = (args) => <Geolocation status={false} dispatcher={args.dispatch} />;
