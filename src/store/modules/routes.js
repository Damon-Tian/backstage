import { asyncRoutes } from '@/api/user.js'
import { resetRoutes } from '@/router/index.js'
import router from '@/router/index.js'

export default {
    namespaced: true,
    state: {
        routes: [],
        currentRoute: {},
    },
    mutations: {
        setCurrentRoute(state, route) {
            state.currentRoute = route
        },
        clearRoutes(state) {
            state.routes = []
        },
    },
    actions: {
        async setRoutes({ state, commit }, routes) {
            let backRoutes = await asyncRoutes()
            // state.routes = resetRoutes(backRoutes.data.routes)
            // router.addRoute(state.routes[0])
            return true
        },
    },
}
