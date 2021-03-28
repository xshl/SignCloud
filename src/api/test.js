import request from "@/utils/request"

export default {
    test() {
        return request({
            url: '/hello',
            method: 'get'
        })
    }
}