import * as React from 'react';
import HomeButton from './DefaultExtent';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'MapTools/DefaultExtent',
  component: HomeButton,
  decorators: [(Story) => <div className="esri-ui-top-left esri-ui-corner">{Story()}</div>],
  argTypes: {
    goTo: { action: 'goTo' },
  },
};

export const normal = (args) => <HomeButton view={{ goTo: args.goTo, ui: { add: () => {} } }} extent={{}}></HomeButton>;
