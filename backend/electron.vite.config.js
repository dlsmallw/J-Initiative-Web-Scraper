// electron.vite.config.js
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// Simulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// We no longer need fs-extra because we are NOT copying files

export default defineConfig({
  main: {
    entry: 'main.js', // The main process file that imports label-studio-api.js
    build: {
      outDir: 'out/main',
      lib: {
        // Absolute path for the main process entry
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
        external: ['electron', 'fs', 'path'], // Exclude built-in modules
      },
    },
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
        },
      },
    },
  },

  renderer: {
    plugins: [react()],
    root: path.resolve(__dirname, '../frontend'),       // Points to the frontend folder
    build: {
      outDir: path.resolve(__dirname, '../frontend/dist'), // Vite's output folder
      emptyOutDir: true,
      rollupOptions: {
        input: path.resolve(__dirname, '../frontend/index.html'), // Frontend entry
      },
    },
    server: {
      port: 5173,
      strictPort: true,
    },
  },
})


