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
    path: "/",
    component: () => import("layouts/Register-layout.vue"),
    children: [
      {
        path: "home", // Altere para evitar duplicidade
        component: () => import("src/pages/HomePage.vue"),
      },
      {
        path: "favorites",
        component: () => import("src/pages/Favorites.vue"),
        path: "/admin/users",
        component: () => import("src/pages/AdminPages/ManageUsers.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
