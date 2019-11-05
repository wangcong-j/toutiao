import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Welcome from '../views/welcome'
import NotFound from '@/views/404'
import Article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish' // 发布文章
import Comment from '@/views/comment' // 评论管理
import Fans from '@/views/fans' // 粉丝管理
import Setting from '@/views/setting' // 个人设置

import Login from '../views/login/index.vue'
import SessionStorage from '../utils/sessionStorage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/home',
        component: Welcome
      },
      {
        path: '/article',
        component: Article
      },
      {
        path: '/image',
        component: Image
      },
      {
        path: '/publish',
        component: Publish
      },
      {
        path: '/comment',
        component: Comment
      },
      {
        path: '/fans',
        component: Fans
      },
      {
        path: '/setting',
        component: Setting
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
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
