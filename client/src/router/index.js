import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Api from "../views/Api.vue";
import Test from "../views/Test.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/api-test',
    name: 'Api',
    component: Api
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
