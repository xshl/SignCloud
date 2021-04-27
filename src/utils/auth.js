// import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'

export function getToken() {
  if (localStorage.getItem('token')) {
  // if (Cookies.get(TokenKey)) {
    return localStorage.getItem('token')
    // return Cookies.get(TokenKey)
  } else {
    return sessionStorage.getItem('token')
  }
}

export function setToken(token) {
  return localStorage.setItem('token', token)
  // return Cookies.set(TokenKey, token)
}

export function removeToken() {
  sessionStorage.removeItem('token')
  return localStorage.removeItem("token")
  // return Cookies.remove(TokenKey)
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