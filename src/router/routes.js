const routes = [
  {
    path: "/register",
    component: () => import("layouts/Register-layout.vue"),
    children: [
      {
        path: "/",
        component: () => import("pages/SignUp.vue"),
      },
      {
        path: "/login",
        component: () => import("pages/LogIn.vue"),
      },
    ],
  },
  {
    path: "/profile",
    component: () => import("layouts/Register-layout.vue"),
    children: [
      {
        path: "/user",
        component: () => import("src/pages/UserPage.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
