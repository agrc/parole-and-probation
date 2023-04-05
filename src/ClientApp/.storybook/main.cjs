module.exports = {
  addons: ['@storybook/addon-essentials'],
  stories: ['../src/**/*/*.stories.{js,jsx}'],
  features: {
    storyStoreV7: true
  },
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: true
  }
};