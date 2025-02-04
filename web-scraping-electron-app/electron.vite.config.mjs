import { defineConfig } from 'electron-vite';
import path from 'path';

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        input: 'main.js'
      }
    }
  },
  preload: {
    build: {
      rollupOptions: {
        input: 'preload.js'
      }
    }
  },
  renderer: {
    build: {
      rollupOptions: {
        input: 'renderer/index.html', // ✅ Fix path!
        external: ['jquery', 'bootstrap']  // Prevents jQuery from being bundled
      }
    },
    server: {
      port: 5173,
      host: true
    }
  }
});
