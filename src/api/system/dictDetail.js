import request from '@/utils/request'

export function get(dicTypeId) {
  const params = {
    dicTypeId,
    pageNum: 0,
    pageSize: 9999
  }
  return request({
    url: '/api/dictionaries/dictionary-details',
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
    url: '/api/dictionaries/dictionary-details',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: '/api/dictionaries/dictionary-details',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/api/dictionaries/dictionary-details/batch?dicDetailIds=' + id,
    method: 'delete',
  })
}

export function edit(data) {
  return request({
    url: '/api/dictionaries/dictionary-details',
    method: 'put',
    data
  })
}

export default { add, edit, del, get }
