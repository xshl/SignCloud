import request from '@/utils/request'

// 获取所有的Role
export function getAll() {
  return request({
    url: '/api/roles/roles',
    method: 'get',
    params: {
      pageNum: 0,
      pageSize: 999
    }
  })
}

export function add(data) {
  return request({
    url: '/api/roles/roles',
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: '/api/roles/' + id,
    method: 'get'
  })
}

export function del(ids) {
  return request({
    url: '/api/roles/batches',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: '/api/roles/roles',
    method: 'put',
    data
  })
}

export function search(params) {
  return request({
    url: '/api/roles/search',
    method: 'get',
    params
  })
}

export default { add, edit, del, get, search, getAll }
