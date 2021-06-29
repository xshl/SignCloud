import { getMenusById } from '@/api/system/menu'
import { filterAsyncRouter } from '@/store/modules/permission'

export function setPhone(phone) {
    localStorage.setItem('phone', phone)
}
export function getPhone() {
    return localStorage.getItem('phone')
}
export function setAvatar(avatar) {
    localStorage.setItem('avatar', avatar)
}
export function getAvatar() {
    return localStorage.getItem('avatar')
}
export function setName(name) {
    localStorage.setItem('name', name)
}
export function getName() {
    return localStorage.getItem('name')
}
export function setId(id) {
    localStorage.setItem('id', id)
}
export function getId() {
    return localStorage.getItem('id')
}
export function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
}
export function getUser() {
    return JSON.parse(localStorage.getItem('user'))
}
export function getMenu() {
    return JSON.parse(localStorage.getItem('menu'))
}
export function setMenu() {
    getMenusById().then((res) => {
        const rdata = JSON.parse(JSON.stringify(res.data.content))
        const rewriteRoutes = filterAsyncRouter(rdata, true)
        rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
        localStorage.setItem('menu', JSON.stringify(rewriteRoutes))
    })
}

export default {
    getAvatar,
    getName,
    getPhone,
    getId,
    getUser,
    getMenu,
    setAvatar,
    setName,
    setPhone,
    setId,
    setUser,
    setMenu
}