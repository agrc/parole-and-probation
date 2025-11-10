import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import loadVersion from 'vite-plugin-package-version';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globDirectory: './dist',
        globPatterns: ['assets/esri/core/workers/**/*.js', '**/*.ico'],
        globIgnores: ['*.LICENSE.txt', '*.map', 'CalciteWebCoreIcons*.svg', 'sw.js', 'workbox-*.js'],
      },
      manifest: {
        name: 'AP&P Field Map',
        short_name: 'FieldMap',
        description: 'The AP&P Field Map for keeping track of probation parolees',
        theme_color: '#000000',
        start_url: 'https://fieldmap.udc.utah.gov',
        background_color: '#000000',
        id: '/',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '256x256',
            type: 'image/x-icon',
          },
        ],
      },
    }),
    loadVersion(),
  ],
  server: {
    proxy: {
      '/secure': {
        target: 'https://localhost:5001/',
        changeOrigin: true,
        secure: false,
        protocolRewrite: 'https',
        cookieDomainRewrite: 'localhost:5173',
      },
      '/api': {
        target: 'https://localhost:5001/',
        changeOrigin: true,
        secure: false,
        protocolRewrite: 'https',
        cookieDomainRewrite: 'localhost:5173',
      },
      '/mugshot': {
        target: 'https://localhost:5001/',
        changeOrigin: true,
        secure: false,
        protocolRewrite: 'https',
        cookieDomainRewrite: 'localhost:5173',
      },
      '/otrackws': {
        target: 'https://localhost:5001/',
        changeOrigin: true,
        secure: false,
        protocolRewrite: 'https',
        cookieDomainRewrite: 'localhost:5173',
      },
      '/development': {
        target: 'https://localhost:5001/',
        changeOrigin: true,
        secure: false,
        protocolRewrite: 'https',
        cookieDomainRewrite: 'localhost:5173',
      },
    },
  },
  test: {
    environment: 'happy-dom',
    server: {
      deps: {
        inline: ['@esri/calcite-components', '@arcgis/core']
      }
    }
  },
});
