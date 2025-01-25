<template>
  <div id="scrape-container" class="my-5 container position-relative">
    <h1 class="display-4">Web Scraper</h1>
    <button
      class="btn btn-outline-secondary btn-sm position-absolute top-0 end-0"
      id="scrape-mode-toggle"
      @click="toggleMode"
    >
      Manual Mode
    </button>

    <!-- URL Scrape Container -->
    <div v-show="isURLMode" id="url-scrape-container">
      <h4>URL Mode</h4>
      <!-- Scraper Form -->
      <div id="scrape-form-container" class="my-4">
        <form @submit.prevent="submitURL">
          <div class="mb-3">
            <label for="url-input" class="form-label">URL of Web Page</label>
            <div class="input-group mb-3">
              <input
                id="url-input"
                type="text"
                class="form-control"
                v-model="urlInput"
                placeholder="Enter the URL here"
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="submitURLBtn"
                @click="submitURL"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Results Container -->
      <div id="results-container" v-show="scrapedData.length" class="mt-5">
        <div id="results-list-header" class="list-header">
          <span id="results-list-lbl" class="hdr-lbl">Scraped Data</span>
          <div id="results-list-btns" class="list-btn-container">
            <button
              id="rmv-all-btn"
              type="button"
              class="btn btn-secondary scrape-data-btn"
              @click="clearAllData"
            >
              Clear All
            </button>
            <button
              id="rmv-sel-btn"
              type="button"
              class="btn btn-secondary scrape-data-btn"
              @click="removeSelectedItems"
              :disabled="!selectedItems.length"
            >
              Clear Selected
            </button>
          </div>
        </div>
        <div id="results-list" class="list-group scraped-list">
          <div
            v-for="(data, index) in scrapedData"
            :key="index"
            :class="['list-group-item scrape-item', { active: data.selected }]"
            @click="toggleSelection(index)"
          >
            {{ data.text }}
          </div>
        </div>
      </div>
    </div>

    <!-- Manual Scrape Container -->
    <div v-show="!isURLMode" id="manual-scrape-container">
      <h4>Manual Mode</h4>
      <div class="form">
        <textarea
          class="form-control mb-3"
          id="manual-scrape-textarea"
          rows="3"
          v-model="manualInput"
          placeholder="Enter manual data here"
        ></textarea>
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="man-exportBtn"
          @click="exportManualData"
        >
          Export
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScrapePage",
  data() {
    return {
      isURLMode: true, // Determines if the current mode is URL Mode or Manual Mode
      urlInput: "", // URL input for scraping
      manualInput: "", // Input for manual data entry
      scrapedData: [], // Holds scraped data objects
    };
  },
  methods: {
    toggleMode() {
      this.isURLMode = !this.isURLMode;
    },
    async submitURL() {
      if (!this.urlInput.trim()) {
        alert("Please enter a URL.");
        return;
      }

      const url = this.urlInput.startsWith("http")
        ? this.urlInput
        : `https://${this.urlInput}`;

      try {
        const response = await this.$electronAPI.openExternal(url); // Replace with the actual function to scrape
        if (response && response.data) {
          this.scrapedData = response.data.map((item) => ({
            text: item.text,
            selected: false,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch URL:", error);
        alert("Error: Unable to fetch the URL.");
      }
    },
    toggleSelection(index) {
      this.scrapedData[index].selected = !this.scrapedData[index].selected;
    },
    clearAllData() {
      this.scrapedData = [];
    },
    removeSelectedItems() {
      this.scrapedData = this.scrapedData.filter((item) => !item.selected);
    },
    exportManualData() {
      if (!this.manualInput.trim()) {
        alert("Manual input cannot be empty.");
        return;
      }

      // Replace this with actual export logic
      console.log("Exporting manual data:", this.manualInput);
      this.manualInput = "";
    },
  },
};
</script>

<style scoped>
.scrape-item {
  cursor: pointer;
  user-select: none;
}
.scrape-item.active {
  background-color: var(--accent-bg);
  color: var(--primary-color);
}
</style>
