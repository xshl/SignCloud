import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/admins/users',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/admins/users/batches',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/admins/users',
    method: 'put',
    data
  })
}

export function editUser(data) {
  return request({
    url: 'api/users/center',
    method: 'put',
    data
  })
}

export function updatePass(data) {
  return request({
    url: 'api/users/updatePass/',
    method: 'post',
    data
  })
}

export default { add, edit, del }

