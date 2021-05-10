import Vue from 'vue'
import Router from 'vue-router'
import { getMenusById } from '@/api/system/menu'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
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
    path: '/userConfig',
    component: Layout,
    redirect: '/userConfig/user',
    name: 'UserConfig',
    meta: { title: '用户配置', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/userConfig/user'),
        meta: { title: '用户管理', icon: 'el-icon-user' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/userConfig/role'),
        meta: { title: '角色管理', icon: 'el-icon-user' }
      }
    ]
  },

  {
    path: '/content',
    component: Layout,
    redirect: '/content/course',
    children: [
      {
        path: 'course',
        name: 'Course',
        component: () => import('@/views/content/course'),
        meta: { title: '课程管理', icon: 'el-icon-s-order' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'System',
    meta: { title: '系统管理', icon: 'el-icon-setting' },
    children: [
      {
        path: 'permission',
        name: 'Permission',
        component: () => import('@/views/system/permission'),
        meta: { title: '权限管理', icon: 'el-icon-key' }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/system/menu'),
        meta: { title: '菜单管理', icon: 'el-icon-coin' }
      },
      {
        path: 'dictionary',
        name: 'Dictionary',
        component: () => import('@/views/system/dictionary'),
        meta: { title: '数据字典', icon: 'el-icon-copy-document' }
      },
      {
        path: 'parameter',
        name: 'Parameter',
        component: () => import('@/views/system/parameter'),
        meta: { title: '系统参数', icon: 'el-icon-s-operation' },
      },
      {
        path: 'school',
        name: 'School',
        component: () => import('@/views/system/school'),
        meta: { title: '学校机构', icon: 'el-icon-s-home' }
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

  // 404 page must be placed at the end !!!
  { path: '*', redirect: 'error/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export const loadMenus = (next, to) => {
  getMenusById().then(res => {
    console.log('router', res.data.content)
    const data = res.data.content
    data.forEach(val => {
      console.log('val', val)
    });
  })
}

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
