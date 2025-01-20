const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    electronBuilder: {
      // Entry point for the Electron main process
      mainProcessFile: 'background.js',

      // Optional: Specify preload scripts if you have them
      preload: 'src/preload.js',

      // Node.js integration for the renderer process
      nodeIntegration: true,

      // Custom output directory for Electron builds
      builderOptions: {
        appId: 'com.example.webscraper', // Change this to your app's unique ID
        productName: 'Web Scraping App', // Name of your app
        directories: {
          output: 'dist_electron', // Output folder for Electron builds
        },
        // Optional: Configure platform-specific settings
        win: {
          target: ['nsis', 'zip'], // Windows target
        },
        mac: {
          target: ['dmg', 'zip'], // macOS target
        },
        linux: {
          target: ['AppImage', 'deb'], // Linux target
        },
      },
    },
  },
});
