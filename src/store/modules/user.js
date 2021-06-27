import { login, logout, getInfo, loginByPhone, register } from '@/api/user'
import { getToken, setToken, removeToken, setSessionToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { getMenusById } from '@/api/system/menu'
import user from '@/utils/userStore'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    phone: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  }
}

const actions = {

  /**
   * 账号密码登录
   * @param {*} param0 
   * @param {*} userInfo 
   * @returns 
   */
  loginByPwd({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login({phone: userInfo.phone, password: userInfo.password}).then(response => {
        const data = response.data
        commit('SET_TOKEN', data.token)
        user.setId(data.userInfo.id)
        user.setAvatar(data.userInfo.avatar)
        user.setPhone(data.userInfo.phone)
        user.setName(data.userInfo.username)
        user.setUser(data.userInfo)
        user.setMenu()
        if (userInfo.rememberMe == true) {
          setToken(data.token)
        } else {
          setSessionToken(data.token)
        }
        setTimeout(() => {
          resolve()
        }, 1000)
        // resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 手机号码登录
   * @param {*} param0 
   * @param {*} userInfo 
   * @returns 
   */
  loginByPhone({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      loginByPhone(userInfo).then(response => {
        const data = response.data
        commit('SET_TOKEN', data.token)
        user.setId(data.userInfo.id)
        user.setAvatar(data.userInfo.avatar)
        user.setPhone(data.userInfo.phone)
        user.setName(data.userInfo.username)
        user.setUser(data.userInfo)
        user.setMenu()
        setSessionToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 用户退出登录
   * @param {*} param0 
   * @returns 
   */
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken()
      // resetRouter()
      resolve()
      user.setUser([])
    })
  },

  /**
   * 移除token
   * @param {*} param0 
   * @returns 
   */
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  /**
   * GitHub登录
   * @param {*} param0 
   * @returns 
   */
  loginByGithub({ commit }, data) {
    return new Promise(resolve => {
      commit('SET_TOKEN', data.token)
      user.setId(data.userInfo.id)
      user.setAvatar(data.userInfo.avatar)
      user.setPhone(data.userInfo.phone)
      user.setName(data.userInfo.username)
      user.setUser(data.userInfo)
      user.setMenu()
      setSessionToken(data.token)                                                                                                                 
      resolve()
    })
  }

}



export default {
  namespaced: true,
  state,
  mutations,
  actions
}

