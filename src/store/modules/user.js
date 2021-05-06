import { login, getStatusEnum, getMenuTypeEnum } from '@/api/user.js'
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
    },
    actions: {
        async login({ commit }, data) {
            let res = await login(data)
            if (res.suc) {
                commit('setUser', res.data)
                return true
            }
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
    },
}
