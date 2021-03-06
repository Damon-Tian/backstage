function hasBread(state, key) {
    return state.findIndex((item) => item.name == key)
}
import router from '@/router/index.js'
export default {
    namespaced: true,
    state: {
        breads: [{ name: '首页', path: '/' }],
        isCollapse: false,
    },
    mutations: {
        setCollapse(state, val) {
            state.isCollapse = val
        },
        setBreads(state, breads) {
            state.breads = breads
        },
        removeBread(state, key) {
            let index = hasBread(state.breads, key)
            if (index > -1) {
                state.breads.splice(index, 1)
                let route = state.breads[index]
                    ? state.breads[index]
                    : state.breads[state.breads.length - 1]
                router.push(route.path)
                // let lastIndex = location.pathname.lastIndexOf('/')
                // if (key === location.pathname.slice(lastIndex + 1)) {
                //     router.replace({ name })
                // }
            }
        },
        addBread(state, value) {
            if (hasBread(state.breads, value.name) > -1) return
            if (state.breads.length > 10) {
                state.breads.splice(-1, 1)
            }
            state.breads.push({ name: value.name, path: value.path })
        },
        clearBreads(state) {
            state.breads = [{ name: '首页', path: '/' }]
        },
    },
}
