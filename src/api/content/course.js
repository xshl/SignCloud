import request from '@/utils/request'

export function edit(data) {
  return request({
    url: '/api/classes/course-contain-covers',
    method: 'put',
    data
  })
}

export function add(data) {
  return request({
    url: '/api/classes/courses',
    method: 'post',
    data
  })
}

export function del(ids) {
  console.log('ids', ids)
  return request({
    url: '/api/classes/courses-batch',
    method: 'delete',
    data: ids
  })
}

export function search(params) {
  return request({
    url: 'api/classes/courses/search',
    method: 'get',
    params
  })
}

export default { add, edit, del, search }
