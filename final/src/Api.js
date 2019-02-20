import axios from 'axios'
import store from './store'

axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

//创建一个实例
const instance = axios.create()

// request拦截器，检测store中有token，则每一次请求页面会把token放在header进行传输
instance.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

export default {
  // 通用
  userRegister(data) {
    return instance.post('/api/register', data)
  },
  userLogin(data) {
    return instance.post('/api/login', data)
  },
  getAllcompanyName() {
    return instance.post('/api/getAllcompanyName')
  },

  // 用户
  submitOrder(data) {
    return instance.post('/api/submitOrder', data)
  },
  getUserCurrentOrder(data) {
    return instance.post('/api/getUserCurrentOrder', data)
  },
  getUserHistoryOrder(data) {
    return instance.post('/api/getUserHistoryOrder', data)
  },
  //buypage显示菜单列表
  showAllFood(data) {
    return instance.post('/api/showAllFood', data)
  },

  // 商家
  getShopInfo(data) {
    return instance.post('/api/getShopInfo', data)
  },
  submitShopInfo(data) {
    return instance.post('/api/submitShopInfo', data)
  },
  modifyShopInfo(data) {
    return instance.post('/api/modifyShopInfo', data)
  },

  submitFoodInfo(data) {
    return instance.post('/api/submitFoodInfo', data)
  },
  getFoodList(data) {
    return instance.post('/api/getFoodList', data)
  },
  deleteFoodList(data) {
    return instance.post('/api/deleteFoodList', data)
  },

  getShopCurrentOrder(data) {
    return instance.post('/api/getShopCurrentOrder', data)
  },
  getShopHistoryOrder(data) {
    return instance.post('/api/getShopHistoryOrder', data)
  },
  receiveOrder_User(data) {
    return instance.post('/api/receiveOrder_User', data)
  },
  receiveOrder_Shop(data) {
    return instance.post('/api/receiveOrder_Shop', data)
  },
  newOrder_Shop(data) {
    return instance.post('/api/newOrder_Shop', data)
  },

  // 管理员
  getAllUser() {
    return instance.get('/api/getAllUser')
  }
}
