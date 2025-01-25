<template>
  <div id="log-container" class="my-5 container">
    <div id="header-container">
      <h1 class="display-4">Log Viewer</h1>
      <button id="clearLogsBtn" class="btn btn-outline-danger" @click="clearLogs" :disabled="logs.length === 0">
        Clear Logs
      </button>
    </div>

    <!-- Filter Dropdown -->
    <div class="mb-3">
      <label for="log-filter" class="form-label">Filter by Type:</label>
      <select id="log-filter" class="form-select" v-model="typeFilter" @change="applyFilters">
        <option value="ALL">All</option>
        <option value="info">Info</option>
        <option value="debug">Debug</option>
        <option value="warn">Warn</option>
        <option value="error">Error</option>
      </select>
    </div>

    <!-- Date Filter Section -->
    <div class="mb-3">
      <label for="date-filter" class="form-label">Filter by Date:</label>
      <input
        type="date"
        id="date-filter"
        class="form-control"
        v-model="dateFilter"
        @change="applyFilters"
      />
    </div>

    <!-- Log Output Section -->
    <pre id="log-output" class="bg-dark text-white p-3 rounded" style="max-height: 400px; overflow-y: auto;">
      <div id="log-wrapper">
        <div v-if="filteredLogs.length === 0" class="text-center text-muted">
          No logs found for the selected filters.
        </div>
        <div v-for="log in filteredLogs" :key="log.rawLogStr" class="log-entry">
          {{ log.rawLogStr }}
        </div>
      </div>
    </pre>
  </div>
</template>

<script>
export default {
  name: "LogPage",
  data() {
    return {
      logs: [], // All log entries
      typeFilter: "ALL", // Type filter (default to ALL)
      dateFilter: "", // Date filter
      electronAPI: window.electronAPI, // Electron API
      logger: window.log, // Logger API
    };
  },
  computed: {
    filteredLogs() {
      return this.logs.filter((log) => {
        const matchesType =
          this.typeFilter === "ALL" || log.logType === this.typeFilter;
        const matchesDate =
          !this.dateFilter ||
          new Date(log.logDateTime).toISOString().slice(0, 10) ===
            this.dateFilter;
        return matchesType && matchesDate;
      });
    },
  },
  methods: {
    async loadLogs() {
      try {
        const logs = await this.logger.requestLogs();
        if (logs) {
          this.logs = logs;
        }
      } catch (error) {
        this.logger.error(`Error loading logs: ${error}`);
      }
    },
    clearLogs() {
      if (confirm("Are you sure you want to clear all logs?")) {
        this.logger.clearLogs();
        this.logs = [];
      }
    },
    applyFilters() {
      // Recompute filtered logs
    },
  },
  async mounted() {
    await this.loadLogs();

    this.logger.logUpdate((newLogs) => {
      this.logs.push(...newLogs);
    });

    this.logger.logsClearedUpdate(() => {
      this.logs = [];
    });

    this.logger.logClearError((error) => {
      alert("Failed to clear logs: " + error);
    });
  },
};
</script>

<style scoped>
#log-container {
  background-color: var(--content-bg);
  padding: 20px;
  border: var(--body-border-style);
  color: var(--text-color);
}

.log-entry {
  padding: 5px 0;
}

.text-muted {
  opacity: 0.7;
}
</style>
