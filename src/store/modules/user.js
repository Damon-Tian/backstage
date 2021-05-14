import { login, logout, getStatusEnum, getMenuTypeEnum, getProfile, getMenu } from '@/api/user.js'
import router from '@/router/index.js'
export default {
    namespaced: true,
    state: {
        user: null,
        token: '',
        statusEnums: [],
        menuTypeEnums: [],
    },

    mutations: {
        setUser(state, data) {
            state.user = data
        },
        setToken(state, data) {
            state.token = data.tokenInfo.token
            localStorage.setItem('token', state.token)
        },
        setEnum(state, data) {
            let arr = data.enums.map((item) => {
                return {
                    value: item.name,
                    label: item.value,
                }
            })
            state[data.type] = arr
        },
        clearToken(state, data) {
            window.localStorage.setItem('token', '')
            state.token = ''
        },
    },
    actions: {
        async login({ commit }, data) {
            let res = await login(data)
            if (res.suc) {
                commit('setToken', res.data)
                return true
            }
        },
        async logout({ commit }) {
            await logout()
            commit('clearToken')
            router.push('/login')
        },
        async getStatusEnum({ commit, state }) {
            let res = await getStatusEnum()
            if (res.suc) {
                // state.enums = res.data
                commit('setEnum', { enums: res.data, type: 'statusEnums' })
            }
        },
        async getMenuTypeEnum({ commit, state }) {
            let res = await getMenuTypeEnum()
            if (res.suc) {
                // state.enums = res.data
                commit('setEnum', { enums: res.data, type: 'menuTypeEnums' })
            }
        },
        async getProfile({ commit, state }) {
            let res = await Promise.all([getProfile(), getMenu()])
            commit('setUser', res[0].data)
            // commit('setMenu', res[1].data)
        },
    },
}
