import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Api from "../views/Api.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/api',
    name: 'Api',
    component: Api
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
