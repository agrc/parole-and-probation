import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globStrict: true,
        globDirectory: './wwwroot',
        globPatterns: ['assets/esri/core/workers/chunks/*.js', 'assets/*.{js,css,png,jpg,gif,svg}'],
        globIgnores: ['*.LICENSE.txt', '*.map', 'CalciteWebCoreIcons*.svg'],
      },
      manifest: {
        name: 'AP&P Field Map',
        short_name: 'FieldMap',
        description: 'The AP&P Field Map for keeping track of probation parolees',
        theme_color: '#000000',
        start_url: 'https://fieldmap.dev.utah.gov',
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
  },
  build: {
    outDir: 'wwwroot',
  },
});
