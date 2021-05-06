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
    return get('/merchant/page_list', { params: { ...param } }, { alert: true })
}
export function addMerchant(params) {
    return post('/merchant/save', params, { alert: true })
}
export function updateMerchant(params) {
    return post('/merchant/update', params, { alert: true })
}
export function deleteMerchant(params) {
    return post('/merchant/deleteBatch', params, { alert: true })
}
// COMMON 通用
//表格获取数据
export function getForm(url, params) {
    return get(url, params)
}
//获取id数据
export function getFormById(url, id) {
    return get(url + '/' + id)
}
export function upload(file) {
    return get('/upload/upload_file', file)
}
export function getStatusEnum() {
    return get('/anon/getEnum/cn.wmelon.commoncore.enums.StatusEnum')
}
export function getMenuTypeEnum() {
    return get('/anon/getEnum/cn.wmelon.commoncore.enums.MenuTypeEnum')
}
//菜单权限
//获取菜单列表
export function getMenuList() {
    return get('/sys_menu/list')
}
//根据 id 获取菜单权限
export function getMenuListById(id) {
    return get('/sys_menu/info/' + id)
}

//用户相关
//用户列表
export function getMemberList() {
    return get('/member/page_list')
}
export function updateMember(params) {
    return post('/member/update', params, { alert: true })
}
export function deleteMember(params) {
    return post('/member/deleteBatch', params, { alert: true })
}
export function addMember(params) {
    return post('/member/save', params, { alert: true })
}
