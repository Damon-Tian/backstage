import axios from 'axios'
import { ElMessage as Message } from 'element-plus'
const instance = axios.create({
    baseURL: 'http://rap2api.taobao.org/app/mock/282064',
    // baseURL: 'https://tj.wmelon.cn/l',
    // timeout: 5000,
})

instance.interceptors.request.use((config) => {
    if (config.params && config.params.isLoading) {
        //   store.commit("changeLoading", true)
    }
    return config
})

instance.interceptors.response.use(
    (res) => {
        //   store.commit("changeLoading", false)
        if (res.data.status_code == 100) {
            res.data.suc = true
            return res.data
        } else {
            Message({ message: res.data.error_msg, type: 'error' })
            return Promise.reject(res.data.error_msg)
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
    return instance.get(url, data, option)
}
