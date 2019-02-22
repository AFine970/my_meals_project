// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/index.js'
import VueSocketIO from 'vue-socket.io'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.css'

// 关闭生产模式下给出的提示
Vue.config.productionTip = false
Vue.use(new VueSocketIO({ connection: 'http://localhost:9999' }))

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
