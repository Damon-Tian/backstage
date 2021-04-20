import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

import 'element-plus/lib/theme-chalk/index.css'
import router from './router/index.js'
import store from './store/index'
import App from './App.vue'

createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus, { locale })
    .mount('#app')

import { routes as routesConstent } from './router/index'

router.beforeEach((to, from, next) => {
    if (!store.state.routes.routes.length) {
        store.commit('routes/setRoutes', routesConstent)
        next()
    } else next()
})
