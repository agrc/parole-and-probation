import React from 'react';
import ReactDOM from 'react-dom';
import { GridLabelGroup, IdentifyAddon, LabelHeading, Label } from './Labels';

describe('renders without crashing', () => {
  it('Label', () => {
    const div = document.createElement('div');
    ReactDOM.render((<Label />), div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('LabelHeading', () => {
    const div = document.createElement('div');
    ReactDOM.render((<LabelHeading />), div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('IdentifyAddon', () => {
    const div = document.createElement('div');
    ReactDOM.render((<IdentifyAddon />), div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('GridLabelGroup', () => {
    const div = document.createElement('div');
    ReactDOM.render((<GridLabelGroup />), div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
