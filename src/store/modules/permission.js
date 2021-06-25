import { constantRouterMap } from '@/router'
import Layout from '@/layout/index'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    sidebarRouters: [],
    init: false
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      if (state.init == false) {
        state.init = true
        state.addRouters = routers
        state.routers = constantRouterMap.concat(routers)
      }
    },
    SET_SIDEBAR_ROUTERS: (state, routers) => {
      state.sidebarRouters = constantRouterMap.concat(routers)
    },
  },
  actions: {
    GenerateRoutes({ commit }, asyncRouter) {
      commit('SET_ROUTERS', asyncRouter)
    },
    SetSidebarRouters({ commit }, sidebarRouter) {
      commit('SET_SIDEBAR_ROUTERS', sidebarRouter)
    }
  }
}

export const filterAsyncRouter = (routers, isRewrite = false) => { // 遍历后台传来的路由字符串，转换为组件对象
  return routers.filter(router => {
    router.meta = {
      title: router.nameZh,
      icon: router.icon
    }
    if (router.enabled == 0) {
      router.hidden = true
    }
    if (router.children) {
      router.children = filterChildren(router.children)
    }
    if (router.component) {
      if (router.component === 'Layout') { // Layout组件特殊处理
        router.component = Layout
      } else {
        const component = router.component
        router.component = loadView(component)
      }
    }
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children, router, isRewrite)
    }
    return true
  })
}

function filterChildren(childrenMap) {
  var children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      const flag = false
      el.children.forEach(c => {
        if(c.type != 2 ) {
          flag = true
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        }
      })
      if (flag) {
        return
      }
    }
    if (el.type != 2) {
      children = children.concat(el)
    }
  })
  return children
}

export const loadView = (view) => {
  return (resolve) => require([`@/views/${view}`], resolve)
}

export default permission
