import request from "@/utils/request"

export default {
    test() {
        return request({
            url: '/api/test',
            method: 'get'
        })
    }
}