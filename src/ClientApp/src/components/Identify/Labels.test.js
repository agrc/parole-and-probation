import * as React from 'react';
import ReactDOM from 'react-dom';
import { GridLabelGroup, IdentifyAddon, LabelGroup } from './Labels';

describe('renders without crashing', () => {
  it('LabelGroup', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LabelGroup />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('IdentifyAddon', () => {
    const div = document.createElement('div');
    ReactDOM.render(<IdentifyAddon />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('GridLabelGroup', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GridLabelGroup />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
