import { post, get } from '@/axios/index.js'
import { routes } from '@/router/index.js'
import router from '@/router/index.js'
export function login({ username, password }) {
    return post('/anon/admin_login', { username, password })
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
export function menuSave(params) {
    return post('/sys_menu/save', params, { alert: true })
}
export function menuUpdate(params) {
    return post('/sys_menu/update', params, { alert: true })
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
export function addMemberIntegral(params) {
    return post('/member/add_integral', params, { alert: true })
}

//角色相关
export function getRoleList() {
    return get('/sys_role/page_list')
}
export function updateRole(params) {
    return post('/sys_role/update', params, { alert: true })
}
export function deleteRole(params) {
    return post('/sys_role/deleteBatch', params, { alert: true })
}
export function addRole(params) {
    return post('/sys_role/save', params, { alert: true })
}

//个人中心
export function getProfile() {
    return get('/merchant/now/info')
}
export function updateProfile(params) {
    return post('/merchant/now/update_info', params, { alert: true })
}
export function logout() {
    return post('/merchant/now/logout')
}
export function getMenu() {
    return post('/merchant/now/menu_tree')
}
