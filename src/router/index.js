import { createRouter, createWebHistory } from 'vue-router'

const BasicLayout = () => import('@/layout/basicLayout.vue')
import Home from '@/pages/home/home.vue'
const One = () => import('@/pages/one/one.vue')
const Two = () => import('@/pages/one/two.vue')
export const routes = [
    {
        name: '',
        path: '/',
        component: BasicLayout,
        children: [
            {
                path: '',
                name: '首页',
                component: Home,
            },
            {
                path: 'one',
                name: 'one',
                component: One,
                children: [{ path: 'two', component: Two }],
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: `<div>404</div>`,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
