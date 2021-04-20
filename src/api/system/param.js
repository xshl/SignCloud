import request from '@/utils/request'

export function getParams(params) {
  return request({
    url: '/api/params',
    method: 'get',
    params
  })
}

export function edit(data) {
  return request({
    url: '/api/params',
    method: 'put',
    data
  })
}



export default { getParams, edit }
