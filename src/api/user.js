import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/api/loginByPwd',
    method: 'post',
    params,
  })
}

export function loginByPhone(params) {
  return request({
    url: '/api/loginByVerificationCode',
    method: 'post',
    params
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function register(params) {
  return request({
    url: '/api/register',
    method: 'post',
    params,
  })
}

export function getCode(phone) {
  return request({
    url: '/api/getCode',
    method: 'get',
    params: { phone }
  })
}

export function forgetPassword(params) {
  return request({
    url: '/api/forgetPassword',
    method: 'post',
    params
  })
}

export function loginByGithub(params) {
  return request({
    url: '/api/github/callback',
    method: 'get',
    params
  })
}

export function additional(params) {
  return request({
    url: '/api/password-phone',
    method: 'put',
    params
  })
}