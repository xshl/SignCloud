export function setPhone(phone) {
    window.localStorage.setItem('phone', phone)
}
export function getPhone() {
    return window.localStorage.getItem('phone')
}
export function setAvatar(avatar) {
    window.localStorage.setItem('avatar', avatar)
}
export function getAvatar() {
    return window.localStorage.getItem('avatar')
}
export function setName(name) {
    window.localStorage.setItem('name', name)
}
export function getName() {
    return window.localStorage.getItem('name')
}

export default {
    getAvatar,
    getName,
    getPhone,
    setAvatar,
    setName,
    setPhone
}