import { login } from '@/api/user.js'
export default {
    namespaced: true,
    token: '',
    state: {
        name: 'damon',
        age: 17,
    },

    mutations: {
        setUser(state, value) {
            state.name = value
            state.token = localStorage.setItem('token', 1)
        },
    },
    actions: {
        async login({ commit }, data) {
            let res = await login()
            if (res) {
                commit('setUser', 1)
                return true
            }
        },
    },
}
