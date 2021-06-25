import request from '@/utils/request'
export function add(data) {
    return request({
        url: '/api/dictionaries/dictionary-types-details',
        method: 'post',
        data
    })
}

export function edit(data) {
    return request({
        url: '/api/dictionaries/dictionary-types-details',
        method: 'put',
        data
    })
}

export default { add, edit }