import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";

import store from "./store/index";

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
      meta: { keepAlive: true },
    },
    {
      path: "/reserve-date",
      component: () => import("./pages/ReserveDate.vue"),
      meta: { keepAlive: true },
    },
    {
      path: "/reserve/:facilityId",
      component: () => import("./pages/ReserveInfo.vue"),
      props: true,
      // meta: { keepAlive: true },
    },
    {
      path: "/reserve/:facilityId/confirm",
      component: () => import("./pages/ReserveConfirmation.vue"),
      props: true,
      meta: { keepAlive: true },
    },
    {
      path: "/reserve/completed",
      component: () => import("./pages/ReserveCompleted.vue"),
    },
    {
      path: "/login",
      component: () => import("./pages/auth/Login.vue"),
      meta: { unAuth: true },
    },
    {
      path: "/signup",
      component: () => import("./pages/auth/Signup.vue"),
      meta: { unAuth: true },
    },
    {
      path: "/setting",
      component: () => import("./pages/user/Setting.vue"),
      meta: { auth: true },
    },
    {
      path: "/info",
      component: () => import("./pages/Info.vue"),
    },
    {
      path: "/info/:newsId",
      component: () => import("./pages/InfoDetail.vue"),
      props: true,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return {
      left: 0,
      top: 0,
    };
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.unAuth && store.getters.isLoggedIn) {
    router.push("/");
  } else if (to.meta.auth && !store.getters.isLoggedIn) {
    router.push("/login");
  } else {
    store.dispatch("clearNotification");
    next();
  }
});
