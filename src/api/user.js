import { post, get } from '@/axios/index.js'

export function login(params) {
    return post('/anon/admin_login', params)
}

export function asyncRoutes(id) {
    return get('/sys_menu/info/' + id)
}
