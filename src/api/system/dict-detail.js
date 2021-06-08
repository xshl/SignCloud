import request from '@/utils/request'
export function add(data) {
    console.log('新增', '')
    return request({
        url: '/api/dictionaries/dictionary-types-details',
        method: 'post',
        data
    })
}

export function edit(data) {
    console.log('修改', '')
    return request({
        url: '/api/dictionaries/dictionary-types-details',
        method: 'put',
        data
    })
}

export default { add, edit }