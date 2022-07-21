import axios from 'axios'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截
request.interceptors.request.use(
  config => {
    const token = 'Bearer ' + window.localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  }
)

// 响应拦截
request.interceptors.response.use(
  config => {
    return config.data
  }
)

export default request
