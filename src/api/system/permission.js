import request from '@/utils/request'

export function getPerm() {
  return request({
    url: '/api/perm/all',
    method: 'get'
  })
}

export function edit(data) {
  return request({
    url: '/api/perm',
    method: 'put',
    data
  })
}

export function add(data) {
  return request({
    url: '/api/perm',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/api/perm/batch',
    method: 'delete',
    data
  })
}

export function search(params) {
    return request({
        url: '/api/perm/search',
        method: 'get',
        params
    })
}

export default { add, edit, del, search }
