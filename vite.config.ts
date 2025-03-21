import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  envDir: 'environment',
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@api': '/src/api',
      '@interfaces': '/src/interfaces',
    },
  },
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
    allowedHosts: ['candidatesearch-13.onrender.com'], 
  },
  preview: {
    allowedHosts: ['candidatesearch-13.onrender.com'],
  },
});
