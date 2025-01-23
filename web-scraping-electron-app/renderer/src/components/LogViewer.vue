<template>
  <div id="log-container" class="my-5 container">
    <div id="header-container">
      <h1 class="display-4">Log Viewer</h1>
      <button id="clearLogsBtn" class="btn btn-outline-danger">Clear Logs</button>
    </div>

    <div class="mb-3">
      <label for="log-filter" class="form-label">Filter by Type:</label>
      <select id="log-filter" class="form-select">
        <option value="ALL">All</option>
        <option value="info">Info</option>
        <option value="debug">Debug</option>
        <option value="warn">Warn</option>
        <option value="error">Error</option>
      </select>
    </div>

    <div class="mb-3">
      <label for="date-filter" class="form-label">Filter by Date:</label>
      <input type="date" id="date-filter" class="form-control" />
    </div>

    <pre id="log-output" class="bg-dark text-white p-3 rounded">
      <div id="log-wrapper"></div>
    </pre>
  </div>
</template>

<script>
export default {
  name: "LogViewerPage",
};
</script>

<style scoped>
/* Add specific styles for the Log Viewer component */
</style>
