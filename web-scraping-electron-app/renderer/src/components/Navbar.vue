<template>
  <header>
    <nav class="navbar">
      <ul class="navbar-nav">
        <li>
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li>
          <router-link to="/about" class="nav-link">About</router-link>
        </li>
        <li>
          <router-link to="/scrape" class="nav-link">Scrape</router-link>
        </li>
        <li>
          <router-link to="/logs" class="nav-link">Logs</router-link>
        </li>
      </ul>
      <ThemeToggle />
    </nav>
  </header>
</template>

<script>
import ThemeToggle from "@/components/ThemeToggle.vue";

export default {
  name: "Navbar",
  components: {
    ThemeToggle,
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between; /* Space between nav links and theme toggle */
  align-items: center; /* Vertically align items */
  background-color: var(--navbar-bg);
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for better aesthetics */
}

.navbar-nav {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: var(--navbar-link-color);
  text-decoration: none;
  margin-right: 15px;
  font-weight: 500;
  transition: color 0.3s ease; /* Smooth hover effect */
}

.nav-link:hover {
  color: var(--hover-color);
}

.nav-link:last-child {
  margin-right: 0; /* Remove margin for the last link */
}
</style>
