export default {
    namespaced: true,
    state: {
        routes: [],
    },
    mutations: {
        setRoutes(state, routes) {
            state.routes = routes
        },
        clearRoutes(state) {
            state.routes = []
        },
    },
}
