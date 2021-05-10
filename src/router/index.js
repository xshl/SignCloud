import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("@/views/login/login.vue")
      },
      {
        path: "register",
        name: "Register",
        component: () => import("@/views/login/register.vue")
      },
      {
        path: "forgetPassword",
        name: "ForgetPassword",
        component: () => import("@/views/login/forgetPassword.vue")
      }
    ]
  },
  {
    path: '/additional',
    component: () => import('@/views/login/additional.vue')
  },
  {
    path: '/callback',
    component: () => import('@/views/login/callback.vue')
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: (resolve) => require(['@/views/redirect'], resolve)
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home'),
      meta: { title: '首页', icon: 'el-icon-stopwatch', affix: true }
    }]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: (resolve) => require(['@/views/userConfig/center'], resolve),
        name: '个人中心',
        meta: { title: '个人中心' }
      }
    ]
  },
  {
    path: '/error',
    // component: Layout,
    component: () => import('@/views/error'),
    name: 'error',
    hidden: true,
    meta: { title: '异常页', icon: 'el-icon-monitor' },
    children: [
      {
        path: '404',
        name: '404',
        component: () => import('@/views/error/404.vue'),
        meta: { title: '找不到页面', icon: 'el-icon-news' }
      },
      {
        path: '403',
        name: '403',
        component: () => import('@/views/error/403.vue'),
        meta: { title: '无权访问', icon: 'el-icon-news' }
      },
      {
        path: '500',
        name: '500',
        component: () => import('@/views/error/500.vue'),
        meta: { title: '服务器出错', icon: 'el-icon-news' }
      }
    ]
  },
  {
    path: '/aboutMe',
    component: Layout,
    redirect: '/aboutMe',
    children: [{
      path: 'aboutMe',
      name: 'AboutMe',
      component: () => import('@/views/aboutMe'),
      meta: { title: '关于我们', icon: 'el-icon-warning-outline' }
    }]
  },
]

export default new Router({
  // mode: 'hash',
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
