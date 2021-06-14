import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import PageHome from "../pages/PageHome.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "PageHome",
    component: PageHome,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
