import request from '@/utils/request'

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

export function buildMenus() {
  return request({
    url: '/api/menus/build',
    method: 'get'
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

export default { add, edit, del, getMenus, getChild, getFather, search }
