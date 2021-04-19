import request from '@/utils/request'

export function get(dictName) {
  const params = {
    dictName,
    page: 0,
    size: 9999
  }
  return request({
    url: '/api/dictDetail',
    method: 'get',
    params
  })
}

export function getDictMap(dictName) {
  const params = {
    dictName,
    page: 0,
    size: 9999
  }
  return request({
    url: '/api/dictionary-details',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/api/dictionary-details',
    method: 'post',
    params
  })
}

export function del(id) {
  return request({
    url: '/api/dictDetail/',
    method: 'delete',
    params: {
      dicTypeId: id
    }
  })
}

export function edit(data) {
  return request({
    url: '/api/dictionary-details',
    method: 'put',
    data
  })
}

export default { add, edit, del }
