import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import router from './router/index.js'
import store from './store/index'
import App from './App.vue'

const app = createApp(App)

app.use(router).use(store).use(ElementPlus).mount('#app')

import { routes as routesConstent } from './router/index'

router.beforeEach((to, from, next) => {
    if (!store.state.routes.routes.length) {
        store.commit('routes/setRoutes', routesConstent)
        next()
    } else next()
})
