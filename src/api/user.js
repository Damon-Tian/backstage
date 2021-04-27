import { post, get } from '@/axios/index.js'
import { routes } from '@/router/index.js'
export function login({ username, password }) {
    return post('/anon/admin_login', { username, password }, { alert: true })
}

export function asyncRoutes(id) {
    // return get('/sys_menu/info/' + id)
    return routes
}

export function getMerchant(param) {
    return get('/merchant/page_list', { params: { ...param } })
}

export function getForm(url, params) {
    return get(url, params)
}
