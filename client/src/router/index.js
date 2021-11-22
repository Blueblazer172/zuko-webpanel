import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Profile from "../views/loggedin/Profile";
import Admin from "../views/loggedin/Admin";
import User from "../views/loggedin/User";
import UserManagement from "../views/loggedin/UserManagement";
import Rooms from "../views/loggedin/Rooms";
import Roles from "../views/loggedin/Roles";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
  },
  {
    path: "/user/:id/",
    name: "user",
    component: User,
  },
  {
    path: "/user/:id/mgmt",
    name: "userManagement",
    component: UserManagement,
  },
  {
    path: "/roles",
    name: "roleManagement",
    component: Roles,
  },
  {
    path: "/rooms",
    name: "roomManagement",
    component: Rooms,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    next('/home');
  } else {
    next();
  }
});


export default router
