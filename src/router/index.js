import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Article from '../views/welcome'
import NotFound from '@/views/404'

import Login from '../views/login/index.vue'
import SessionStorage from '../utils/sessionStorage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/home',
        component: Article
      }
    ]
  }, {
    path: '/login',
    component: Login
  }, {
    path: '*',
    component: NotFound
  }
]
const router = new VueRouter({
  routes
})
// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 在跳转前判断  是否登录（是否携带token）
  const user = SessionStorage.getSession()
  if (to.path !== '/login' && !user) return next('/login')
  next()
})
export default router

// export default router
