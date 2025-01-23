<template>
  <div id="annotation-container" class="my-5">
    <h1 class="display-4">Label Studio</h1>
    <div id="ls-embedded">
      <div id="ls-not-set">
        <div id="ls-form" class="form-group my-4">
          <label for="ls-link-input" class="form-label">URL of Label Studio Project</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" id="ls-link-input" placeholder="Enter the URL to the Label Studio Project" />
            <button class="btn btn-outline-secondary" type="button" id="submitLSURLBtn">Submit</button>
          </div>
        </div>
      </div>
      <div id="ls-set" class="position-relative">
        <webview id="annotation-webview" src=""></webview>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LabelStudioPage",
};
</script>

<style scoped>
/* Add specific styles for Label Studio component */
</style>
