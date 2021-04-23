import request from '@/utils/request'

export function getDicts() {
  return request({
    url: '/api/dictionary-types',
    method: 'get'
  })
}

export function edit(data) {
  return request({
    url: '/api/dictionary-types',
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
    url: '/api/dictionary-types/batch?dicTypeIds=' + ids ,
    method: 'delete',
  })
}

export default { add, edit, del }
