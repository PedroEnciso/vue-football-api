import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/overview/:idType/:id",
    name: "Overview",
    params: true,
    component: () => import("../views/Overview.vue"),
  },
  {
    path: `/table/:idType/:id`,
    name: "Table",
    params: true,
    component: () => import("../views/Table.vue"),
  },
  {
    path: `/matches/:idType/:id`,
    name: "Matches",
    params: true,
    component: () => import("../views/Matches.vue"),
  },
  {
    path: `/stats/:idType/:id`,
    name: "Stats",
    params: true,
    component: () => import("../views/Stats.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
