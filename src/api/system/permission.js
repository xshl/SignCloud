import request from '@/utils/request'

export function getPerm() {
  return request({
    url: '/api/perms',
    method: 'get',
    params: {
      pageNum: 0,
      pageSize: 999
    }
  })
}

export function edit(data) {
  return request({
    url: '/api/perms',
    method: 'put',
    data
  })
}

export function add(data) {
  return request({
    url: '/api/perms',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/api/perms/batches',
    method: 'delete',
    data
  })
}

export function search(params) {
    return request({
        url: '/api/perms/search',
        method: 'get',
        params
    })
}

export default { add, edit, del, search }
