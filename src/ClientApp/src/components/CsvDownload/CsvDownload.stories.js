import React from 'react';
import { storiesOf } from '@storybook/react';
import Item from './CsvDownload';

storiesOf('MapTools.CsvDownload', module)
  .addDecorator(story => (
    <div className="esri-ui-top-left esri-ui-corner">
      <div className="esri-component">{story()}</div>
    </div>
  ))
  .add('normal', () => (
    <Item></Item>
  ))
  .add('busy', () => (
  <Item disabled={true}></Item>
  ))
  .add('success', () => (
    <Item status={true} />
  ))
  .add('fail', () => (
    <Item status={false} />
  ));
