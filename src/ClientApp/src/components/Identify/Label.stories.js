import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { IdentifyAddon } from './Labels';

storiesOf('Labels/IdentifyAddon', module)
  .add('Empty with implicit default', () => (
    <IdentifyAddon></IdentifyAddon>
  ))
  .add('Empty with explicit default', () => (
    <IdentifyAddon defaultValue="empty"></IdentifyAddon>
  ))
  .add('Empty with null', () => (
    <IdentifyAddon defaultValue={null}></IdentifyAddon>
  ))
  .add('Basic', () => (
    <IdentifyAddon>Basic</IdentifyAddon>
  ))
  .add('Danger', () => (
    <IdentifyAddon danger="1">Danger</IdentifyAddon>
  ))
  .add('Border', () => (
    <IdentifyAddon border>Border</IdentifyAddon>
  ))
  .add('lower', () => (
    <IdentifyAddon lower>LOWER</IdentifyAddon>
  ))
  .add('age', () => (
    <IdentifyAddon age="648950400000">years old</IdentifyAddon>
  ))
  .add('date', () => (
    <IdentifyAddon date>648950400000</IdentifyAddon>
  ))
  .add('all', () => (
    <IdentifyAddon age="648950400000" defaultValue="error" danger="1" border lower>YEARS old</IdentifyAddon>
  ));
