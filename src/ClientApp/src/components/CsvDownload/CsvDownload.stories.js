import * as React from 'react';
import Item from './CsvDownload';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'MapTools/CsvDownload',
  component: Item,
  decorators: [(Story) => <div className="esri-ui-top-left esri-ui-corner">{Story()}</div>],
};

export const normal = () => <Item></Item>;
export const busy = () => <Item disabled={true}></Item>;
export const success = () => <Item status={true} />;
export const fail = () => <Item status={false} />;
