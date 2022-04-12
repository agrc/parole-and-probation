import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/mapserver': {
        target: 'https://localhost:5001/',
        changeOrigin: true,
        secure: false,
        protocolRewrite: 'https',
        cookieDomainRewrite: 'localhost:3000',
      },
    },
  },
});
