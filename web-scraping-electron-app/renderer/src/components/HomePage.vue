<template>
  <div id="home-container" class="my-5 container">
    <h1 class="display-4">Home</h1>
    <p>Welcome to our modern, elegant web scraping application!</p>
  </div>
</template>

<script>
export default {
  name: "HomePage", // Vue requires components to have names
  methods: {
    /**
     * Initializes page-specific event listeners.
     */
    initPageListeners() {
      // Add event listeners if needed
      console.log("Listeners initialized for HomePage");
    },
  },
  mounted() {
    // Called when the component is mounted to the DOM
    this.initPageListeners();
  },
};
</script>

<style scoped>
/* Add specific styles for the HomePage component here */
</style>
