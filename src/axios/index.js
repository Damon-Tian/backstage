import axios from 'axios'
import { ElMessage as Message } from 'element-plus'
import router from '@/router/index.js'
import store from '@/store/index.js'

export const baseURL = 'https://adminapi.wmelon.cn/sha'
export const uploadURL = 'https://api.wmelon.cn/api/upload'
const instance = axios.create({
    // baseURL: '/api',
    baseURL: baseURL,
    // timeout: 5000,
})
const getToken = () => {
    return localStorage.getItem('token')
}
instance.interceptors.request.use((config) => {
    if (getToken()) {
        if (!store.state.user.token) {
            store.state.user.token = getToken()
        }
        config.headers.Authorization = store.state.user.token
    }
    if (config.params && config.params.isLoading) {
        //   store.commit("changeLoading", true)
    }
    return config
})

instance.interceptors.response.use(
    (res) => {
        //   store.commit("changeLoading", false)
        if (res.data.code == 100) {
            res.data.suc = true
            if (res.config.alert) {
                Message({ message: res.data.msg, type: 'success' })
            }
            return res.data
        } else {
            if (res.data.code == 401) {
                store.commit('user/clearToken')
                router.push('/login')
            }
            Message({ message: res.data.msg, type: 'error' })
            return Promise.reject(res.data.msg)
        }
    },
    (err) => {
        Message({ message: err, type: 'error' })
        // store.commit('changeLoading', false)
        return Promise.reject(err)
    }
)

export const post = (url, data = {}, option = {}) => {
    return instance.post(url, data, option)
}
export const get = (url, data = {}, option = {}) => {
    return instance.get(url, { params: { ...data } }, option)
}
