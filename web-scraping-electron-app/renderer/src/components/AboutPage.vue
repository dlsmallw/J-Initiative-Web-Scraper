<template>
  <div>
    <h1>About Page</h1>
    <p>Node Version: {{ nodeVersion }}</p>
    <p>Chrome Version: {{ chromeVersion }}</p>
    <p>Electron Version: {{ electronVersion }}</p>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  data() {
    return {
      nodeVersion: "",
      chromeVersion: "",
      electronVersion: "",
    };
  },
  methods: {
    loadVersions() {
      if (window.versions) {
        this.nodeVersion = window.versions.node();
        this.chromeVersion = window.versions.chrome();
        this.electronVersion = window.versions.electron();
      } else {
        console.error("Versions API is unavailable.");
      }
    },
  },
  mounted() {
    this.loadVersions();
  },
};
</script>

