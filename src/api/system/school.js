import request from '@/utils/request'

export function getSchools() {
  return request({
    url: 'api/sys/schools',
    method: 'get',
    params: {
      pageNum: 0,
      pageSize: 999
    }
  })
}

export function add(data) {
  return request({
    url: 'api/sys/schools',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/school',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/sys/schools',
    method: 'put',
    data
  })
}

export function search(params) {
  return request({
    url: 'api/sys/schools/search',
    method: 'get',
    params
  })
}

export function getSupSchool(id) {
  return request({
    url: '/api/sys/schools/children?sid=' + id,
    method: 'get',
  })
}

export default { add, edit, del, getSchools, search, getSupSchool }
