import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles.css'; // Import your global styles
import router from './router'; // Import router

createApp(App).use(router).mount('#app'); // Use the router
