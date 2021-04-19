import request from '@/utils/request'

export function getDicts() {
  return request({
    url: '/api/dictionary-types',
    method: 'get'
  })
}

export function edit(params) {
  return request({
    url: '/api/dictionary-types',
    method: 'put',
    params
  })
}

export function add(params) {
  return request({
    url: '/api/dictionary-types',
    method: 'post',
    params
  })
}

export function del(id) {
  return request({
    url: '/api/dictionary-types',
    method: 'delete',
    params: {
      dicTypeId: 9
    }
  })
}

export default { add, edit, del }
