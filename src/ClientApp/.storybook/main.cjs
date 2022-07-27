module.exports = {
  addons: ['@storybook/addon-essentials'],
  stories: ['../src/**/*/*.stories.{js,jsx}'],
  features: {
    storyStoreV7: true,
  },
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
}
