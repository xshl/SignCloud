import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data,
    
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

export function register(data) {
  return request({
    url: '/api/register?role=老师',
    method: 'post',
    data,
    
  })
}

export function getCode() {
  return request({
    url: '/api/getCode',
    method: 'get'
  })
}
