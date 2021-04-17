import request from '@/utils/request'

export function getDicts() {
  return request({
    url: 'api/dictionary-types',
    method: 'get'
  })
}

export function edit(data) {
  return request({
    url: 'api/dictionary-types',
    method: 'put',
    data
  })
}

export function add(data) {
  return request({
    url: 'api/dictionary-types',
    method: 'post',
    data
  })
}

export function del(params) {
  return request({
    url: 'api/dictionary-types',
    method: 'delete',
    params
  })
}

export default { add, edit, del }
