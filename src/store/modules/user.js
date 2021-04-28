import { login, getEnum } from '@/api/user.js'
export default {
    namespaced: true,
    state: {
        user: null,
        token: '',
        enums: [],
    },

    mutations: {
        setUser(state, data) {
            state.user = data
            state.token = data.tokenInfo.token
            localStorage.setItem('token', state.token.token)
        },
        setEnum(state, data) {
            // let enums = {}
            // data.forEach((item) => {
            //     enums[item.name] = item.value
            // })
            state.enums = data
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
        async getEnum({ commit, state }) {
            let res = await getEnum()
            if (res.suc) {
                // state.enums = res.data
                commit('setEnum', res.data)
            }
        },
    },
}
