import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import HomeButton from './DefaultExtent';

storiesOf('MapTools/DefaultExtent', module)
  .addDecorator((story) => (
    <div className="esri-ui-top-left esri-ui-corner">
      <div className="esri-component">{story()}</div>
    </div>
  ))
  .add('normal', () => <HomeButton view={{ goTo: action('goTo') }} extent={{}}></HomeButton>);
