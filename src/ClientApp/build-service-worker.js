const workboxBuild = require('workbox-build');
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

workboxBuild
  .generateSW({
    swDest: './dist/service-worker.js',
    skipWaiting: true,
    clientsClaim: true,
    globDirectory: './dist',
    globPatterns: ['assets/esri/core/workers/chunks/*.js', 'assets/*.{js,css,png,jpg,gif,svg}'],
    globStrict: true,
    globIgnores: ['*.LICENSE.txt', '*.map', 'CalciteWebCoreIcons*.svg'],
    modifyURLPrefix: {
      assets: `${publicUrlOrPath}assets`,
      static: `${publicUrlOrPath}static`,
    },
    maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
    dontCacheBustURLsMatching: /\.?[0-9a-f]{8}\.?/,
    inlineWorkboxRuntime: true,
    sourcemap: false,
  })
  .then(({ count, size }) => {
    console.log(`Generated new service worker ${count} files, totaling ${size} bytes`);
  })
  .catch((err) => {
    console.error(`Unable to generate a new service worker.`, err);
  });
