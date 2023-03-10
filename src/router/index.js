import { createRouter, createWebHistory } from "vue-router";

//STORE VUEX
import store from "../store";

//COMPONENTS
import DefaultLayout from "../components/DefaultLayout.vue";
import AuthLayout from "../components/AuthLayout.vue"

//VIEWS
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Students from "../views/Students.vue";
import StudentView from "../views/StudentView.vue"

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DefaultLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/students",
        name: "Students",
        component: Students,
      },
      {
        path: '/students/create',
        name: 'StudentCreate',
        component: StudentView
      },
      {
        path: '/students/:id',
        name: 'StudentUpdate',
        component: StudentView
      }
    ],
  },
  {
    path: '/auth',
    redirect: "/login",
    name: "Auth",
    component: AuthLayout ,
    meta: {
        isGuest : true
    },
    children: [
        {
            path: "/login",
            name: "Login",
            component: Login,
          },
          {
            path: "/register",
            name: "Register",
            component: Register,
          },
    ]
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "Login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
