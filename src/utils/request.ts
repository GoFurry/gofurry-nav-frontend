// utils/request.ts
import axios from 'axios'

/*
* @Desc: Axios封装
* @Author: 福狼
* @Version: V1.0.0
* */

// const apiUrl = 'http://[::1]:9999/api'
const apiUrl = import.meta.env.VITE_API_BASE_URL

const service = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    // withCredentials: true,
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('token')
        // if (token) config.headers['Authorization'] = `Bearer ${token}`
        return config
    },
    (error) => Promise.reject(error)
)

/*
* response.data {
*   code: 1,    code: 0,
*   data: {
*       ...
*   }
* }
* */
// 响应拦截器
service.interceptors.response.use(
    (response) => {
        if (response.data.code !== 1) {
            console.error('接口错误:', response.data)
        }
        return response.data.data
    },
    (error) => {
        console.error('网络错误:', error)
        return Promise.reject(error)
    }
)

export default service
