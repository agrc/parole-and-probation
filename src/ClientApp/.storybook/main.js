export default {
  addons: ['@storybook/addon-essentials'],
  stories: ['../src/**/*/*.stories.{js,jsx}'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
