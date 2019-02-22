import * as types from './types'

// 只用vuex存储，刷新页面重新初始化，token消失需要重新登录
// 初始化的时候用sessionStorage来赋值，刷新页面重新初始化，但sessionStorage.token，也就是state.token有了值
const mutations = {
  [types.LOGIN]: (state, data) => {
    // 修改token的值
    state.token = data
    window.sessionStorage.setItem('token', data)
  },
  [types.LOGOUT]: state => {
    // 将token清空
    state.token = null
    state.radio = null
    state.username = null
    state.companyName = null
    state.companyId = null
    state.companyAddress = null
    window.sessionStorage.removeItem(
      'token',
      'radio',
      'username',
      'companyName',
      'companyId',
      'companyAddress'
    )
  },
  [types.USERNAME]: (state, data) => {
    // 保存用户名
    state.username = data
    window.sessionStorage.setItem('username', data)
  },
  [types.RADIO]: (state, data) => {
    // 保存用户标识
    state.radio = data
    window.sessionStorage.setItem('radio', data)
  },
  [types.COMPANY]: (state, data) => {
    state.companyName = data.companyName
    state.companyId = data.userId
    state.companyAddress = data.companyAddress
    window.sessionStorage.setItem('companyName', data.companyName)
    window.sessionStorage.setItem('companyId', data.userId)
    window.sessionStorage.setItem('companyAddress', data.companyAddress)
  }
}
export default mutations
