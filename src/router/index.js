import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login'
import Shop from '../pages/Shop'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },
]

const router = new VueRouter({
  routes
})



export default router
