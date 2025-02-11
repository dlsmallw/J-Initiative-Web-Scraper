// electron.vite.config.js
const { defineConfig } = require('electron-vite');
const react = require('@vitejs/plugin-react');
const path = require('path');

// We no longer need fs-extra because we are NOT copying files

module.exports = defineConfig({
  main: {
    entry: 'main.js', // The main process file that imports `label-studio-api.js`
    build: {
      outDir: 'out/main',
      lib: {
        // Use an absolute path for the main process entry
        entry: path.resolve(__dirname, 'main.js'),
        formats: ['cjs'], // CommonJS format for Electron
      },
      rollupOptions: {
        input: 'main.js',
        output: {
          dir: path.resolve(__dirname, 'out/main'),
          entryFileNames: 'index.js',
          format: 'cjs',
        },
        // Only keep built-in modules external if desired
        // Make sure NOT to list './label-studio-api.js'
        // or other local modules here.
        external: ["electron", "fs", "path"],
      }
    }
  },
  preload: {
    entry: 'preload.js',
    build: {
      outDir: 'out/preload',
      lib: {
        entry: path.resolve(__dirname, 'preload.js'),
        formats: ['cjs'],
      },
      rollupOptions: {
        input: 'preload.js',
        output: {
          dir: path.resolve(__dirname, 'out/preload'),
          entryFileNames: 'index.js',
          format: 'cjs',
        }
      }
    }
  },
  renderer: {
    plugins: [react()],
    // The root of renderer (Vite + React) project
    root: 'frontend/vite-demo',
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        // The HTML entry for React app
        input: 'frontend/vite-demo/index.html',
      }
    },
    server: {
      port: 5173,
      strictPort: true,
    },
  }
});


