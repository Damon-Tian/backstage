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
export const routes = [
    {
        name: '',
        path: '/',
        component: BasicLayout,
        children: [
            {
                path: '/',
                name: '首页',
                component: Home,
            },
            {
                path: '/one',
                name: '组件相关',
                component: One,
                redirect: '/one/two',
                children: [
                    {
                        path: 'two',
                        name: '什么都没有',
                        component: Two,
                    },
                    {
                        path: 'three',
                        name: '自定义组件',
                        component: Three,
                        redirect: '/one/three/four',
                        children: [
                            {
                                name: '表单',
                                component: Four,
                                path: 'four',
                            },
                            {
                                name: '表格',
                                component: Five,
                                path: 'five',
                            },
                            {
                                name: '页面',
                                component: Six,
                                path: 'six',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
    {
        path: '/404',
        name: 'NotFound',
        component: NotFound,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
