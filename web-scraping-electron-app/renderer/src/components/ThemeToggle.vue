<template>
  <div class="theme-toggle">
    <label for="theme-select" class="form-label">Choose Theme:</label>
    <select id="theme-select" class="form-select" v-model="selectedTheme" @change="changeTheme">
      <option value="light-theme">Light Theme</option>
      <option value="dark-theme">Dark Theme</option>
      <option value="blue-theme">Blue Theme</option>
      <option value="disco-theme">Disco Theme</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "ThemeToggle",
  data() {
    return {
      selectedTheme: localStorage.getItem("selectedTheme") || "light-theme", // Default to light theme
    };
  },
  mounted() {
    // Apply the saved theme or the default theme on component load
    this.applyTheme(this.selectedTheme);
  },
  methods: {
    changeTheme() {
      this.applyTheme(this.selectedTheme);
    },
    applyTheme(theme) {
      document.documentElement.className = theme; // Apply the theme to the <html> tag
      localStorage.setItem("selectedTheme", theme); // Save the theme to localStorage
    },
  },
};
</script>

<style scoped>
.theme-toggle {
  margin-bottom: 1rem;
}
</style>
