import { createRouter, createWebHistory } from 'vue-router'

const BasicLayout = () => import('@/layout/basicLayout.vue')
import Home from '@/pages/home/home.vue'
import NotFound from '@/pages/404.vue'
const One = () => import('@/pages/one/one.vue')
const Two = () => import('@/pages/one/two.vue')
const Three = () => import('@/pages/one/three.vue')
const Four = () => import('@/pages/one/four.vue')
const Five = () => import('@/pages/one/five.vue')
export const routes = [
    {
        name: '',
        path: '/',
        component: BasicLayout,
        children: [
            {
                path: '/',
                name: '首页',
                component: Home
            },
            {
                path: '/one',
                name: 'one',
                component: One,
                redirect: 'two',
                children: [
                    {
                        path: 'two',
                        name: 'two',
                        component: Two
                    },
                    {
                        path: 'three',
                        name: 'three',
                        component: Three,
                        redirect: 'four',
                        children: [
                            {
                                name: 'four',
                                component: Four,
                                path: 'four'
                            },
                            {
                                name: 'five',
                                component: Five,
                                path: 'five'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/404',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
