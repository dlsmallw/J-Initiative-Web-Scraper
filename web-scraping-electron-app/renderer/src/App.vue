<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/label-studio">Label Studio</router-link></li>
        <li><router-link to="/database">Database</router-link></li>
        <li><router-link to="/log-viewer">Log Viewer</router-link></li>
        <li><router-link to="/scraper">Scraper</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
nav ul {
  list-style: none;
  display: flex;
  gap: 10px;
  padding: 0;
}

nav ul li {
  display: inline;
}

router-link {
  text-decoration: none;
  color: blue;
}

router-link-active {
  font-weight: bold;
  color: darkblue;
}
</style>
