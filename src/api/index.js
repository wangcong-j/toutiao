// 导入axios文件 提供给 main 挂载
import axios from 'axios'
import sessionStorage from '../utils/sessionStorage'
import router from '../router'

// 对 axios进行配置
// baseURL 设置基准地址（共有地址）
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 留地方 其他配置···
// 配置请求头
// if (sessionStorage.getSession()) {
//   axios.defaults.headers.Authorization = `Bearer ${sessionStorage.getSession().token}`
// }

// 请求拦截器
axios.interceptors.request.use(config => {
  // 获取token
  const user = sessionStorage.getSession() || {}
  // 头部设置token
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
axios.interceptors.response.use(res => res, err => {
  // 请求失败时
  if (err.response.status === 401) {
    // 跳转 /login 页面
    return router.push('/login')
  } else {
    return Promise.reject(err)
  }
})

// 导出 axios
export default axios
