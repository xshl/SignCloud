import request from '@/utils/request'
import userStore from '@/utils/userStore'
import user from '@/utils/userStore'

export function getParams() {
  return request({
    url: '/api/params/' + userStore.getId(),
    method: 'get',
  })
}

export function edit(data) {
  return request({
    url: '/api/params',
    method: 'put',
    data
  })
}

export function add(data) {
  return request({
    url: '/api/params',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: '/api/params',
    method: 'delete',
    params: {
      sysParamId: ids[0]
    }
  })
}



export default { getParams, edit, add, del }
