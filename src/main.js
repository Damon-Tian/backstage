import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

import 'element-plus/lib/theme-chalk/index.css'
import router from './router/index.js'
import store from './store/index'
import App from './App.vue'

createApp(App).use(router).use(store).use(ElementPlus, { locale }).mount('#app')

router.beforeEach(async (to, from, next) => {
    let token = localStorage.getItem('token')
    if (!token) {
        if (!to.path.includes('login')) {
            router.push('/login')
            next()
        } else next()
    } else {
        if (to.path.includes('login')) {
            router.push('/')
        } else if (to.matched.length === 0) {
            router.push('/404')
        }
        if (!store.state.routes.routes.length) {
            await store.dispatch('routes/setRoutes')
            router.replace(to.path)
            next()
        } else next()
    }
})
