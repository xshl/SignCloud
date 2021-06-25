import request from '@/utils/request'

export function edit(data) {
  return request({
    url: '/api/subjects',
    method: 'put',
    data
  })
}

export function add(data) {
  return request({
    url: '/api/subjects',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: '/api/subjects',
    method: 'delete',
    params: {
        subjectId: ids[0]
    }
  })
}

export function search(params) {
  return request({
    url: 'api/subjects',
    method: 'get',
    params
  })
}

export default { add, edit, del, search }
