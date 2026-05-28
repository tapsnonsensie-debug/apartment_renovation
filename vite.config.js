import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: '/apartment_renovation/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'legal/privacy.html'),
        offer: resolve(__dirname, 'legal/offer.html'),
        cookies: resolve(__dirname, 'legal/cookies.html'),
      },
    },
  },
});
