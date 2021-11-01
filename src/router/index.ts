import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/testa",
    name: "TestA",
    component: () => import("../views/TestA.vue"),
  },
  {
    path: "/testb",
    name: "TestB",
    component: () => import("../views/TestB.vue"),
  },
  {
    path: "/testc",
    name: "TestC",
    component: () => import("../views/TestC.vue"),
  },
  {
    path: "/testd",
    name: "TestD",
    component: () => import("../views/TestD.vue"),
  },
  {
    path: "/teste",
    name: "TestE",
    component: () => import("../views/TestE.vue"),
  },
  {
    path: "/testf",
    name: "TestF",
    component: () => import("../views/TestF.vue"),
  },
  {
    path: "/testg",
    name: "TestG",
    component: () => import("../views/TestG.vue"),
  },
  {
    path: "/testh",
    name: "TestH",
    component: () => import("../views/TestH.vue"),
  },
  {
    path: "/testi",
    name: "TestI",
    component: () => import("../views/TestI.vue"),
  },
  {
    path: "/testj",
    name: "TestJ",
    component: () => import("../views/TestJ.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
