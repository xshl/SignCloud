import request from '@/utils/request'

export function getDicts() {
  return request({
    url: '/api/dictionaries/dictionary-types',
    method: 'get'
  })
}

export function edit(data) {
  return request({
    url: '/api/dictionaries/dictionary-types',
    method: 'put',
    data
  })
}

export function add(params) {
  return request({
    url: '/api/dictionaries/dictionary-types',
    method: 'post',
    params
  })
}

export function del(ids) {
  return request({
    url: '/api/dictionaries/dictionary-types/batch?dicTypeIds=' + ids ,
    method: 'delete',
  })
}



export default { add, edit, del }
