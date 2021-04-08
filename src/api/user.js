import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/api/login',
    method: 'post',
    params,
  })
}

export function loginByPhone(params) {
  return request({
    url: '/api/mobieLoginByVerificationCode',
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
    url: '/api/mobileRegister?role=老师',
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