module.exports = {
  addons: ['@storybook/addon-essentials'],
  stories: ['../src/**/*/*.stories.js'],
  staticDirs: ['../public'],
  features: {
    storyStoreV7: true,
  },
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
}
