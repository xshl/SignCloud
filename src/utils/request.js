import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Qs from 'qs'
import router from '@/router'

//创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/' : '/', // api 的 base_url
  // baseURL: 'http://81.68.237.122:8080',
  // baseURL: '', // url = base url + request url
  timeout: 5000 // request timeout
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('error', error)
    if (error.response.data instanceof Blob && error.response.data.type.toLowerCase().indexOf('json') !== -1) {
      const reader = new FileReader()
      reader.readAsText(error.response.data, 'utf-8')
      reader.onload = function (e) {
        const errorMsg = JSON.parse(reader.result).message
        Notification.error({
          title: errorMsg,
          duration: 5000
        })
      }
    } else {
      let code = 0
      try {
        code = error.response.data.status
      } catch (e) {
        if (error.toString().includes('Error: timeout') !== -1) {
          Notification.error({
            title: '网络请求超时',
            duration: 5000
          })
          return Promise.reject(error)
        } 
      }
      if (error.toString().includes('403')) {
        router.push({ path: '/error/403' })
      } else if (error.toString().includes('404')) {
        router.push({ path: '/error/404' })
      } else if (error.toString().includes('500')) {
        router.push({ path: '/error/500' })
      }
      if (code) {
        if (code === 401) {
          store.dispatch('LogOut').then(() => {
            // 用户登录界面提示
            localStorage.setItem('point', 401)
            // Cookies.set('point', 401)
            location.reload()
          })
        } else if (code === 403) {
          console.log('403')
          router.push({ path: '/error/403' })
        } else if (code === 500) {
          router.push({ path: '/error/500' })
        } {
          const errorMsg = error.response.data.message
          if (errorMsg !== undefined) {
            Notification.error({
              title: errorMsg,
              duration: 5000
            })
          }
        }
      } else {
        Notification.error({
          title: '接口请求失败',
          duration: 5000
        })
      }
    }
    return Promise.reject(error)
  }
)

export default service
