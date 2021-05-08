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
    return localStorage.getItem('user')
}
export function getMenu() {
    return localStorage.getItem('menus')
}
export function setMenu(menus) {
    localStorage.setItem('menu', JSON.stringify(menus))
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