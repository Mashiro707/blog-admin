/* eslint-disable no-undef */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    name: 'Article',
    meta: { title: '文章管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'create',
        name: 'CreateArticle',
        component: () => import('@/views/article/article.vue'),
        meta: { title: '新建文章', icon: 'el-icon-s-help' }
      },
      {
        path: 'list',
        name: 'ArticleList',
        component: () => import('@/views/article/articleList.vue'),
        meta: { title: '文章列表', icon: 'el-icon-s-help' }
      }
    ]
  }
]
const createRouter = () => new Router({
  mode: 'history',
  routes
})

const router = createRouter()

// Routing Interception
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    // get token
    const tokenStr = window.localStorage.getItem('token')
    if (!tokenStr) return next('/login')
  }
  next()
})

export default router
