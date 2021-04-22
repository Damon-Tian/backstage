import { post, get } from '@/axios/index.js'

// export const post = (url, data, option = {}) => {
//     return instance.post(url, data, option)
// }
// export const get = (url, data, option = {}) => {
//     return instance.get(url, data, option)
// }

export function login(params) {
    return get('/login', params)
}

export function getForm(url, params) {
    return get(url, { params })
}
