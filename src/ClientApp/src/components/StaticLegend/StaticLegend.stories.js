import { storiesOf } from '@storybook/react';
import React from 'react';
import StaticLegend from './StaticLegend';

storiesOf('Legend/StaticLegend', module)
  .add('No Legend', () => (
    <StaticLegend />
  ))
  .add('basic', () => (
    <StaticLegend legend={[{
      label: 'test',
      color: '#2ecc40'
    }]} />)
  )
  .add('Four Colors', () => (
    <StaticLegend legend={[{
      label: 'test',
      color: '#001f3f'
    }, {
      label: 'test2',
      color: '#0074d9'
    }, {
      label: 'test3',
      color: '#7fdbff'
    }, {
      label: 'test4',
      color: '#39cccc'
    }]} />
  ))
  .add('Text Overflow', () => (
    <StaticLegend legend={[{
      label: 'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      color: '#001f3f'
    }, {
      label: 'test2',
      color: '#0074d9'
    }, {
      label: 'test3',
      color: '#7fdbff',
      inverse: true
    }, {
      label: 'test4',
      color: '#39cccc'
    }]} />
  ))
  .add('Invert Text', () => (
    <StaticLegend legend={[{
      label: 'test3',
      color: '#39cccc',
      invert: true
    }]} />
  ));
