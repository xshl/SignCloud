import request from '@/utils/request'

export function edit(data) {
  return request({
    url: '/api/class/course/modify',
    method: 'put',
    data
  })
}

export function add(data) {
  return request({
    url: '/api/class/course/add',
    method: 'post',
    data
  })
}

export function del(ids) {
  console.log('ids', ids)
  return request({
    url: '/api/class/course/delete-batch',
    method: 'delete',
    data: ids
  })
}

export function search(params) {
  return request({
    url: 'api/class/course/search',
    method: 'get',
    params
  })
}

export default { add, edit, del }
