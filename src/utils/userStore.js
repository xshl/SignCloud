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

export default {
    getAvatar,
    getName,
    getPhone,
    getId,
    setAvatar,
    setName,
    setPhone,
    setId
}