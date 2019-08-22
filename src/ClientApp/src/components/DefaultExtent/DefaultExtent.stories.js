import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import HomeButton from './DefaultExtent';


export const props = {
  view: action('goTo')
};

storiesOf('MapTools.DefaultExtent', module)
  .addDecorator(story => (
    <div className="esri-ui-top-left esri-ui-corner">
      <div className="esri-component">{story()}</div>
    </div>
  ))
  .add('normal', () => (
    <HomeButton {...props}></HomeButton>
  ));
