import request from '@/utils/request'
import userStore from '@/utils/userStore'

export function add(data, params) {
  return request({
    url: '/api/admins/users',
    method: 'post',
    data,
    params
  })
}

export function del(ids) {
  return request({
    url: '/api/admins/users/batches',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: '/api/admins/users',
    method: 'put',
    data,
  })
}

export function search(params) {
  return request({
    url: '/api/admins/users/search',
    method: 'get',
    params
  })
}

export function editUser(data) {
  return request({
    url: '/api/admins/userInfos',
    method: 'put',
    data
  })
}

export function updatePass(data) {
  return request({
    url: '/api/admins/users/passwords',
    method: 'put',
    params: {
      uid: data
    }
  })
}

export default { add, edit, del, editUser, updatePass, search }

