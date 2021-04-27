import { login } from '@/api/user.js'
export default {
    namespaced: true,
    state: {
        user: null,
        token: '',
    },

    mutations: {
        setUser(state, data) {
            state.user = data
            state.token = data.tokenInfo
            localStorage.setItem('token', state.token.token)
        },
    },
    actions: {
        async login({ commit }, data) {
            let res = await login(data)
            if (res.suc) {
                commit('setUser', res.data)
                return true
            }
        },
    },
}
