import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import text from '../views/login/text.vue'

import Login from '../views/login/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/text',
    component: text
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
