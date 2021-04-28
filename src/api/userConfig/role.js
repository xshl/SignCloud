import request from '@/utils/request'

// 获取所有的Role
export function getAll() {
  return request({
    url: 'api/role/all',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'api/role',
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: 'api/roles/' + id,
    method: 'get'
  })
}

export function del(ids) {
  return request({
    url: 'api/role-batch',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/role',
    method: 'put',
    data
  })
}

export default { add, edit, del, get }
