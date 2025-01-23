import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/Home.vue";
import AboutPage from "../components/About.vue";
import LabelStudioPage from "../components/LabelStudio.vue";
import DatabaseInfo from "../components/Database.vue";
import LogViewerPage from "../components/LogViewer.vue";
import ScraperPage from "../components/Scraper.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/about",
    name: "AboutPage",
    component: AboutPage,
  },
  {
    path: "/label-studio",
    name: "LabelStudioPage",
    component: LabelStudioPage,
  },
  {
    path: "/database",
    name: "DatabaseInfo",
    component: DatabaseInfo,
  },
  {
    path: "/log-viewer",
    name: "LogViewerPage",
    component: LogViewerPage,
  },
  {
    path: "/scraper",
    name: "ScraperPage",
    component: ScraperPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
