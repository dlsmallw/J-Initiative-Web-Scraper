import { createRouter, createWebHistory } from 'vue-router';
import AboutPage from '../components/AboutPage.vue';
import AnnotationPage from '../components/AnnotationPage.vue';
import DatabasePage from '../components/DatabasePage.vue';
import HomePage from '../components/HomePage.vue';
import LogPage from '../components/LogPage.vue';
import ScrapePage from '../components/ScrapePage.vue';
import ThemeToggle from '../components/ThemeToggle.vue';

const routes = [
   {
    path: "/about",
    name: "About",
    component: AboutPage,
  },
   {
    path: "/annotation",
    name: "Annotation",
    component: AnnotationPage,
  },
   {
    path: "/database",
    name: "Database",
    component: DatabasePage,
  },
   {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
   {
    path: "/logs",
    name: "Logs",
    component: LogPage,
  },
   {
    path: "/scrape",
    name: "Scrape",
    component: ScrapePage,
  },
  {
   path: "/theme",
   name: "Theme",
   component: ThemeToggle,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;



