import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // GitHub Pages serves this project from
  // https://<user>.github.io/F11p80x-Ch4113n93/, not the domain root, so
  // built asset URLs need this repo-name prefix. Harmless for local dev
  // (npm run dev/preview still work from /).
  base: '/F11p80x-Ch4113n93/',
  plugins: [vue()],
});
