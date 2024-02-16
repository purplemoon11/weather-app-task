import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
const $toast = useToast();
const routes = [
  {
    path: "/",
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/home",
    component: () => import("../components/HomePage.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/register",
    component: () => import("../components/Register.vue"),
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("../components/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// const getCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     const removeListener = onAuthStateChanged(
//       getAuth(),
//       (user) => {
//         removeListener();
//         resolve(user);
//       },
//       reject
//     );
//   });
// };

router.beforeEach(async (to, from, next) => {
  const auth = getAuth();
  await new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      resolve(user);
      unsubscribe();
    });
  });

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (auth.currentUser) {
      next();
    } else {
      $toast.error("You don't have access !!!");
      next("/");
    }
  } else {
    next();
  }
});
export default router;
