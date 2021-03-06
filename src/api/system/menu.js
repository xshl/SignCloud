import request from '@/utils/request'
import user from '@/utils/userStore'

export function getMenus() {
  return request({
    url: '/api/menus',
    method: 'get',
    params: {
      pageNum: 0,
      pageSize: 999
    }
  })
}

export function getFather(id) {
  return request({
    url: '/api/menus/father?mid=' + id,
    method: 'get',
  })
}

export function getChild(id) {
  return request({
    url: '/api/menus/children?mid=' + id,
    method: 'get',
  })
}

export function add(data) {
  return request({
    url: '/api/menus',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: '/api/menus/batches',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: '/api/menus',
    method: 'put',
    data
  })
}

export function search(params) {
  return request({
    url: '/api/menus/search',
    method: 'get',
    params
  })
}

export function getMenusByRoles(id) {
  return request({
    url: '/api/menus/roles',
    method: 'get',
    params: {
      roleId: id,
      pageNum: 0,
      pageSize: 999
    }
  })
}

export function getMenusById() {
  return request({
    url: '/api/menus/ids',
    method: 'get',
    params: {
      pageNum: 0,
      pageSize: 999
    }
  })
}

export default { add, edit, del, getMenus, getChild, getFather, search }
