import { configure } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/App.css';

let req;
if (process.env.NODE_ENV === 'test') {
  // fix for when running in jest tests
  const registerRequireContextHook = require('babel-plugin-require-context-hook/register');
  registerRequireContextHook();

  req = global.__requireContext(__dirname, '../src/stories', true, /\.js$/);
} else {
  req = require.context('../src/stories', true, /\.js$/);
}

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
