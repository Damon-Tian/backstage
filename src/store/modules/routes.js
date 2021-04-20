export default {
    namespaced: true,
    state: {
        routes: [],
        currentRoute: {},
    },
    mutations: {
        setRoutes(state, routes) {
            state.routes = routes
        },
        setCurrentRoute(state, route) {
            state.currentRoute = route
        },
        clearRoutes(state) {
            state.routes = []
        },
    },
}
