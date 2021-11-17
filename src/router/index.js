import { createRouter, createWebHistory } from "vue-router";
import Overview from "../views/Overview.vue";

const routes = [
  {
    // redirect / to /dashboard
    path: "/",
    redirect: "/overview",
  },
  {
    path: "/overview",
    name: "Overview",
    component: Overview,
  },
  {
    path: `/:team_id`,
    name: "TeamView",
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/TeamView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
