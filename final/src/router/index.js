import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router)
// 路由懒加载的写法
const Login = () => import('../components/login.vue')
const Register = () => import('../components/register.vue')
const Home = () => import('../components/home.vue')
const Noauth = () => import('../components/noAuth.vue')

const Buy = () => import('../views/user/buyPage.vue')
const Buylist = () => import('../views/user/buyList.vue')

const Manage = () => import('../views/manager/manage.vue')

const Myshop = () => import('../views/shop/myShop.vue')

const router = new Router({
  mode: 'history',
  base: '/app/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/noauth',
      name: 'Noauth',
      component: Noauth
    },

    // 用户
    {
      path: '/buy',
      name: 'Buy',
      component: Buy,
      beforeEnter(to, from, next) {
        let token = store.state.token
        let radio = store.state.radio
        if (token && radio === 'user') {
          next()
        } else {
          next('/noauth')
        }
      }
    },
    {
      path: '/buylist',
      name: 'Buylist',
      component: Buylist,
      beforeEnter(to, from, next) {
        let token = store.state.token
        let radio = store.state.radio
        if (token && radio === 'user') {
          next()
        } else {
          next('/noauth')
        }
      }
    },

    // 商家
    {
      path: '/myshop',
      name: 'Myshop',
      component: Myshop,
      beforeEnter(to, from, next) {
        let token = store.state.token
        let radio = store.state.radio
        if (token && radio === 'shop') {
          next()
        } else {
          next('/noauth')
        }
      }
    },

    // 管理员
    {
      path: '/manage',
      name: 'Manage',
      component: Manage
    }
  ]
})

export default router
