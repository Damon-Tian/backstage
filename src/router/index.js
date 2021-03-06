import { createRouter, createWebHistory } from 'vue-router'

const BasicLayout = () => import('@/layout/basicLayout.vue')
import Home from '@/pages/home/home.vue'
import NotFound from '@/pages/404.vue'
const One = () => import('@/pages/one/one.vue')
const Two = () => import('@/pages/one/two.vue')
const Three = () => import('@/pages/one/three.vue')
const Four = () => import('@/pages/one/four.vue')
const Five = () => import('@/pages/one/five.vue')
const Six = () => import('@/pages/one/sxx.vue')
const Login = () => import('@/pages/login.vue')
const AddM = () => import('@/pages/home/addM.vue')
const Menu = () => import('@/pages/menu/menu.vue')
const Role = () => import('@/pages/role/role.vue')
const Profile = () => import('@/pages/profile/profile.vue')
const frontRoutes = [
    { name: 'BasicLayout', component: () => import('@/layout/basicLayout.vue') },
    { name: 'home', component: () => import('@/pages/home/home.vue') },
    { name: 'notfound', component: () => import('@/pages/404.vue') },
    { name: 'one', component: () => import('@/pages/one/one.vue') },
    { name: 'Two', component: () => import('@/pages/one/two.vue') },
    { name: 'Three', component: () => import('@/pages/one/three.vue') },
    { name: 'four', component: () => import('@/pages/one/four.vue') },
    { name: 'five', component: () => import('@/pages/one/five.vue') },
    { name: 'six', component: () => import('@/pages/one/sxx.vue') },
]
// const BasicLayout = () => import('@/layout/basicLayout.vue')
// const BasicLayout = () => import('@/layout/basicLayout.vue')
// const BasicLayout = () => import('@/layout/basicLayout.vue')
// const BasicLayout = () => import('@/layout/basicLayout.vue')
// const BasicLayout = () => import('@/layout/basicLayout.vue')
export const routes = [
    {
        path: '/',
        name: 'basic',
        component: BasicLayout,
        redirect: '',
        children: [
            {
                path: '',
                icon: 'el-icon-s-home',
                name: '首页',
                component: Home,
                // children: [{ path: '/add', component: AddM, name: 'Addm', hide: true }],
            },
            {
                path: '/menu',
                icon: 'el-icon-menu',
                name: '菜单列表',
                component: Menu,
            },
            {
                path: '/role',
                icon: 'el-icon-user-solid',
                name: '角色相关',
                component: Role,
            },
            {
                path: '/profile',
                icon: 'el-icon-setting',
                name: '个人中心',
                component: Profile,
            },
            {
                path: '/user',
                icon: 'el-icon-user',
                name: '用户相关',
                component: One,
                // redirect: '/one/two',
                // children: [
                //     {
                //         path: 'two',
                //         name: '什么都没有',
                //         component: Two,
                //     },
                //     {
                //         path: 'three',
                //         name: '自定义组件',
                //         component: Three,
                //         redirect: '/one/three/four',
                //         children: [
                //             {
                //                 name: '表单',
                //                 component: Four,
                //                 path: 'four',
                //             },
                //             {
                //                 name: '表格',
                //                 component: Five,
                //                 path: 'five',
                //             },
                //             {
                //                 name: '页面',
                //                 component: Six,
                //                 path: 'six',
                //             },
                //         ],
                //     },
                // ],
            },
        ],
    },
]
export const constantRoutes = [
    {
        path: '/login',
        component: Login,
        name: 'login',
    },
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'NotFound',
    //     component: NotFound,
    // },
    {
        path: '/404',
        name: 'NotFound',
        component: NotFound,
    },
]
export const resetRoutes = (routes, first) => {
    let resultRoutes = []
    if (first) {
        resultRoutes = [...constantRoutes]
    }
    routes.forEach((item) => {
        let component = frontRoutes.find(
            (items) => items.name.toLocaleLowerCase() == [item.component.toLocaleLowerCase()]
        )
        if (component) {
            item.component = component.component
        }
        if (item.children) {
            resetRoutes(item.children)
        }
        resultRoutes.push(item)
    })

    return resultRoutes
}
const router = createRouter({
    history: createWebHistory('/admin/'),
    routes: constantRoutes,
})

export default router
