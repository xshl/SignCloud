import request from '@/utils/request'

export function getSchools(params) {
  return request({
    url: 'api/school',
    method: 'get',
    params
  })
}

export function getSchoolSuperior(ids) {
  const data = ids.length || ids.length === 0 ? ids : Array.of(ids)
  return request({
    url: 'api/school/superior',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'api/school',
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
    url: 'api/school',
    method: 'put',
    data
  })
}

export default { add, edit, del, getSchools, getSchoolSuperior }
