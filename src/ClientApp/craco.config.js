const ManifestPlugin = require('webpack-manifest-plugin');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

module.exports = {
  webpack: {
    plugins: {
      add: [
        new ManifestPlugin({
          fileName: 'asset-manifest.json',
          publicPath: publicUrlOrPath,
          generate: (seed, files, entrypoints) => {
            const manifestFiles = files.reduce((manifest, file) => {
              if (!file.name.includes('LICENSE.txt')) {
                manifest[file.name] = file.path;
              }

              return manifest;
            }, seed);

            const dir = './public/assets/esri/core/workers/chunks';

            const esriFiles = fs.readdirSync(dir);

            esriFiles.reduce((manifest, file) => {
              manifest[
                `assets/esri/core/workers/chunks/${file}`
              ] = `${publicUrlOrPath}assets/esri/core/workers/chunks/${file}`;

              return manifest;
            }, seed);

            const entrypointFiles = entrypoints.main.filter((fileName) => !fileName.endsWith('.map'));

            return {
              files: manifestFiles,
              entrypoints: entrypointFiles,
            };
          },
        }),
      ],
      remove: ['ManifestPlugin'],
    },
  },
};
