import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/privacy",
      component: () => import("./pages/static/Privacy.vue"),
    },
    {
      path: "/about",
      component: () => import("./pages/static/About.vue"),
    },
    {
      path: "/disclaimer",
      component: () => import("./pages/static/Disclaimer.vue"),
    },
    {
      path: "/reserve-facility",
      component: () => import("./pages/ReserveFacility.vue"),
    },
    {
      path: "/reserve-date",
      component: () => import("./pages/ReserveDate.vue"),
    },
    {
      path: "/login",
      component: () => import("./pages/Login.vue"),
    },
  ],
});
