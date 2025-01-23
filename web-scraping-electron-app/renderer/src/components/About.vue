<template>
  <div id="about-container" class="my-5 container">
    <h1 class="display-4">About</h1>
    <p>Node.js Version: <span id="node-version">{{ nodeVersion }}</span></p>
    <p>Chromium Version: <span id="chrome-version">{{ chromeVersion }}</span></p>
    <p>Electron Version: <span id="electron-version">{{ electronVersion }}</span></p>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  data() {
    return {
      nodeVersion: process.versions.node,
      chromeVersion: process.versions.chrome,
      electronVersion: process.versions.electron,
    };
  },
};
</script>

<style scoped>
/* Add any specific styles for the About component here */
</style>
