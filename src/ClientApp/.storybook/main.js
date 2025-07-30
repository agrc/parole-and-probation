export default {
  addons: ['@chromatic-com/storybook', '@storybook/addon-docs'],
  stories: ['../src/**/*/*.stories.{js,jsx}'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};
