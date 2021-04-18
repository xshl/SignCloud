import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  if (Cookies.get(TokenKey)) {
    return Cookies.get(TokenKey)
  } else {
    return sessionStorage.getItem('token')
  }
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  sessionStorage.removeItem('token')
  return Cookies.remove(TokenKey)
}

export function getSessionToken() {
  return sessionStorage.getItem('token')
}

export function setSessionToken(token) {
  sessionStorage.setItem('token', token)
}

export function removeSessionToken() {
  sessionStorage.removeItem('token')
}