import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
});
