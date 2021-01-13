import React from 'react';
import { storiesOf } from '@storybook/react';
import Geolocation from './Geolocation';

storiesOf('MapTools/Geolocation', module)
  .addDecorator(story => (
    <div className="esri-ui-top-left esri-ui-corner">
      <div className="esri-component">{story()}</div>
    </div>
  ))
  .add('normal', () => (
    <Geolocation />
  ))
  .add('busy', () => (
    <Geolocation spin={true}/>
  ))
  .add('success', () => (
    <Geolocation status={true} />
  ))
  .add('fail', () => (
    <Geolocation status={false} />
  ));
