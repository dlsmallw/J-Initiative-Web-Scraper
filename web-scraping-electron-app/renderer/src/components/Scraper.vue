<template>
  <div id="scrape-container" class="my-5 container position-relative">
    <h1 class="display-4">Web Scraper</h1>
    <button class="btn btn-outline-secondary btn-sm position-absolute top-0 end-0" type="button" id="scrape-mode-toggle">Manual Mode</button>
    <div id="url-scrape-container">
      <h4>URL Mode</h4>
      <form>
        <div class="mb-3">
          <label for="url-input" class="form-label">URL of Web Page</label>
          <div class="input-group mb-3">
            <input id="url-input" type="text" class="form-control" placeholder="Enter the URL here" />
            <button class="btn btn-outline-secondary" type="button" id="submitURLBtn">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScraperPage",
};
</script>

<style scoped>
/* Add specific styles for the Scraper component */
</style>
