import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    // drop: ['console'],
  },
  server: {
    host: true,
    port: 3000,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: assetInfo => {
          if (assetInfo.name.endsWith('.woff2')) {
            return `assets/fonts/[name].[ext]`;
          }
          return `assets/[name].[ext]`;
        },
      },
    },
  },
});
