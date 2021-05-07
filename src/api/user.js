import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/api/users/login/passwords',
    method: 'post',
    params,
  })
}

export function loginByPhone(params) {
  return request({
    url: '/api/users/login/codes',
    method: 'post',
    params
  })
}

export function register(params) {
  return request({
    url: '/api/users/register',
    method: 'post',
    params,
  })
}

export function getCode(phone) {
  return request({
    url: '/api/users/getCodes',
    method: 'get',
    params: { phone }
  })
}

export function forgetPassword(params) {
  return request({
    url: '/api/users/forgetPasswords',
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
    url: '/api/github/bind-user',
    method: 'put',
    params
  })
}