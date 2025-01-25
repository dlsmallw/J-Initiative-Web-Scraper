<template>
  <div id="annotation-container" class="my-5">
    <h1 class="display-4">Label Studio</h1>
    <div id="ls-embedded">
      <!-- Form for entering an LS Project URL if none is linked -->
      <div id="ls-not-set" v-show="!lsLinked">
        <div id="ls-form" class="form-group my-4">
          <label for="ls-link-input" class="form-label">URL of Label Studio Project</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="ls-link-input"
              v-model="lsUrlInput"
              placeholder="Enter the URL to the Label Studio Project"
            />
            <button class="btn btn-outline-secondary" type="button" @click="submitLSURL">Submit</button>
          </div>
        </div>
      </div>

      <!-- The embedded LS app -->
      <div id="ls-set" class="position-relative" v-show="lsLinked">
        <webview
          id="annotation-webview"
          :src="lsUrl">
        </webview>
        <!-- A button for opening the LS app in an external window -->
        <svg
          class="position-absolute bottom-0 end-0"
          id="ext-win-btn"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="openExternal">
          <path d="M21 3L15 3M21 3L12 12M21 3V9" stroke="currentColor"  stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H11" stroke="currentColor"  stroke-linecap="round"/>
        </svg>
      </div>
    </div>
    <div id="ls-external" class="embedded-content shadow rounded" v-show="externalWindow">
      <span id="ls-external-text">Label Studio Open Externally</span>
    </div>

    <!-- Config menu for updating LS URL/API Token -->
    <div class="accordion-item accordion" id="ls-config-accordion" v-show="lsLinked">
      <h2 class="accordion-header">
        <button
          class="accordion-button collapsed"
          id="config-accordion"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#ls-config"
          aria-expanded="false"
          aria-controls="ls-config">
          Label Studio Configuration
        </button>
      </h2>
      <div id="ls-config" class="accordion-collapse collapse">
        <div class="accordion-body" id="ls-config-container">
          <label for="ls-link-option" class="form-label">URL of Label Studio Project</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="ls-link-option"
              v-model="lsUrl"
              @change="updateLSURL"
              placeholder="Enter the URL to the Label Studio Project"
            />
          </div>
          <label for="ls-api-token-option" class="form-label">Label Studio Project API Token</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="ls-api-token-option"
              v-model="apiToken"
              @change="updateLSAPIToken"
              placeholder="Enter the API Token for the linked Label Studio Project"
            />
          </div>
          <button class="btn btn-outline-secondary btn-sm" @click="clearLinkedProject">Clear Linked Project</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnnotationPage",
  data() {
    return {
      lsUrl: localStorage.getItem("lsURL") || "",
      lsUrlInput: "",
      apiToken: localStorage.getItem("apiToken") || "",
      lsLinked: !!localStorage.getItem("lsURL"),
      externalWindow: false,
    };
  },
  methods: {
    submitLSURL() {
      if (this.validateURL(this.lsUrlInput)) {
        this.lsUrl = this.lsUrlInput;
        this.lsLinked = true;
        localStorage.setItem("lsURL", this.lsUrl);
      } else {
        alert("Invalid URL. Please enter a valid Label Studio URL.");
      }
    },
    updateLSURL() {
      if (this.validateURL(this.lsUrl)) {
        localStorage.setItem("lsURL", this.lsUrl);
      } else {
        alert("Invalid URL. Restoring the previous valid URL.");
        this.lsUrl = localStorage.getItem("lsURL");
      }
    },
    updateLSAPIToken() {
      if (/^[A-Za-z0-9]+$/g.test(this.apiToken)) {
        localStorage.setItem("apiToken", this.apiToken);
      } else {
        alert("Invalid API Token. Restoring the previous valid token.");
        this.apiToken = localStorage.getItem("apiToken");
      }
    },
    clearLinkedProject() {
      this.lsUrl = "";
      this.apiToken = "";
      this.lsLinked = false;
      localStorage.removeItem("lsURL");
      localStorage.removeItem("apiToken");
    },
    validateURL(url) {
      try {
        new URL(url);
        return true;
      } catch (err) {
        return false;
      }
    },
    openExternal() {
      this.externalWindow = true;
      window.electronAPI?.openExternal(this.lsUrl);
    },
  },
};
</script>

<style scoped>
#annotation-container {
  background-color: var(--content-bg);
  padding: 20px;
  border: var(--body-border-style);
}
</style>
