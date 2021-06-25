import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import user from '@/utils/userStore'
import { getMenusById } from '@/api/system/menu'
import { filterAsyncRouter } from '@/store/modules/permission'
import { constantRouterMap } from '@/router'


NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/login/register', '/login/forgetPassword', '/additional', '/callback', '/error/404', '/error/403', '/error/500'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    // if(0){
    if (to.path === '/login' || to.path == '/login/register' || to.path == '/login/forgetPassword') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (user.getUser().length != 0) {
        loadMenus(next, to)
        next()
      } else {
        try {
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    // if(1) {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

export const loadMenus = (next, to) => {
  getMenusById().then(res => {
      const sdata = JSON.parse(JSON.stringify(res.data.content))
      const rdata = JSON.parse(JSON.stringify(res.data.content))
      const sidebarRoutes = filterAsyncRouter(sdata)
      const rewriteRoutes = filterAsyncRouter(rdata, true)
      rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
      store.dispatch('GenerateRoutes', rewriteRoutes).then(() => { // 存储路由
        router.addRoutes(rewriteRoutes) // 动态添加可访问路由表
        next({ ...to, replace: true })
      })
      store.dispatch('SetSidebarRouters', sidebarRoutes) 
  })
}

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
