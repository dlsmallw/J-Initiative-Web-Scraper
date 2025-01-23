const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  // Ensures that any dependencies requiring transpilation are properly handled.
  transpileDependencies: true,

  // Plugin options for integrating Electron with Vue.
  pluginOptions: {
    electronBuilder: {
      // Entry point for the Electron main process.
      mainProcessFile: 'background.js',

      // Specifies the preload script used for secure communication between main and renderer processes.
      preload: 'src/preload.js',

      // Enables Node.js integration in the renderer process.
      // Set to `false` for better security unless explicitly needed.
      nodeIntegration: false,

      // Configure Electron build settings.
      builderOptions: {
        // Unique application ID (used for system-level identification).
        appId: 'com.example.webscraper',

        // The name of the application displayed in system UI (e.g., app title).
        productName: 'Web Scraping App',

        // Output directory for the built Electron app.
        directories: {
          output: 'dist_electron',
        },

        // Platform-specific build targets.
        win: {
          target: ['nsis', 'zip'], // Generates a Windows installer and a zip package.
          icon: 'src/assets/icons/icon.ico', // Path to the Windows icon.
        },
        mac: {
          target: ['dmg', 'zip'], // Generates a macOS DMG installer and a zip package.
          icon: 'src/assets/icons/icon.icns', // Path to the macOS icon.
        },
        linux: {
          target: ['AppImage', 'deb'], // Generates a Linux AppImage and Debian package.
          icon: 'src/assets/icons/icon.png', // Path to the Linux icon.
        },

        // Custom NSIS (Windows installer) settings.
        nsis: {
          oneClick: false, // Disables one-click installation.
          allowToChangeInstallationDirectory: true, // Lets users choose the installation directory.
        },

        // Enable debugging in development builds.
        extraMetadata: {
          DEBUG_PROD: false,
        },
      },
    },
  },

 configureWebpack: {
    // Define Vue's feature flags
    define: {
      __VUE_OPTIONS_API__: true, // Enable Vue's Options API
      __VUE_PROD_DEVTOOLS__: false, // Disable Vue devtools in production
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true, // Enable detailed hydration mismatch debugging
    },
  },
});

