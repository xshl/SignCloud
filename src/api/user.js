import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/api/login',
    method: 'post',
    params,
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

export function register(data, verificationCode) {
  return request({
    url: '/api/register?role=老师',
    method: 'post',
    data,
    params: { verificationCode }
  })
}

export function getCode(phone) {
  return request({
    url: '/api/getCode',
    method: 'get',
    params: { phone }
  })
}
