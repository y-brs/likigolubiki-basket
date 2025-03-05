import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { readdirSync } from 'fs';
import path, { resolve } from 'path';
import { defineConfig } from 'vite';

const ASSET_PATHS = {
  woff2: 'assets/fonts/[name].[ext]',
  woff: 'assets/fonts/[name].[ext]',
  css: 'basket.[ext]',
  js: 'scripts/[name].[ext]',
  default: 'scripts/[name].[ext]',
};

// Automatic generation of HTML files
const fileNames = readdirSync(__dirname)
  .filter(file => file.endsWith('.html'))
  .map(file => file.replace('.html', ''));

const inputPaths = Object.fromEntries(fileNames.map(name => [name, resolve(__dirname, `${name}.html`)]));

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
      input: inputPaths,
      output: {
        entryFileNames: `basket.js`,
        chunkFileNames: `[name].js`,
        assetFileNames: assetInfo => {
          const ext = assetInfo.name.split('.').pop();
          return ASSET_PATHS[ext] || ASSET_PATHS.default;
        },
      },
    },
  },
});
