<template>
  <div class="loginPage">
    <h2>{{formData.radio}}Login</h2>
    <el-form :model="formData"
             status-icon
             :rules="rules"
             ref="formData">
      <el-form-item prop="username">
        <el-input placeholder="手机号"
                  maxlength="11"
                  type="text"
                  clearable
                  v-model.trim="formData.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码"
                  type="password"
                  clearable
                  v-model.trim="formData.password"></el-input>
      </el-form-item>
      <el-form-item prop="radio">
        <el-radio label="user"
                  v-model="formData.radio">用户</el-radio>
        <el-radio label="shop"
                  v-model="formData.radio">商家</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button class="btn-full"
                   round
                   type="success"
                   @click="login('formData')">登录</el-button>
      </el-form-item>
    </el-form>
    <span @click="toRegister"
          class="tips">没有账号？立即注册</span>
  </div>
</template>

<script>
import api from '../Api.js'
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      }
      setTimeout(() => {
        if (!/^1[34578]\d{9}$/.test(value)) {
          callback(new Error('请输入正确的电话号码'))
        } else {
          callback()
        }
      }, 1000)
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('密码不能为空'))
      } else {
        return callback()
      }
    }
    return {
      formData: {
        radio: 'user',
        username: '',
        password: ''
      },
      rules: {
        password: [
          {
            validator: validatePassword,
            trigger: 'blur'
          }
        ],
        username: [
          {
            validator: validateUsername,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login(formData) {
      this.$refs[formData].validate(valid => {
        if (valid) {
          let bus = this.formData
          api
            .userLogin(bus)
            .then(response => {
              if (response.data.exist === false) {
                this.$message({
                  type: 'error',
                  message: '账户已存在'
                })
              }
              if (response.data.success) {
                this.$message({
                  type: 'success',
                  message: '登录成功'
                })
                let token = response.data.token
                let username = response.data.username
                let radio = response.data.radio
                // dispatch()：调度操作，触发状态更改的唯一方法
                this.$store.dispatch('UserLogin', token)
                this.$store.dispatch('UserName', username)
                this.$store.dispatch('UserRadio', radio)
                // 定义重定向的页面路由
                let redirectUrl = decodeURIComponent(
                  this.$route.query.redirect || '/'
                )
                if (radio === 'user') {
                  this.$router.push({
                    path: redirectUrl
                  })
                } else {
                  this.$router.push('/myshop')
                }
              } else {
                this.$message({
                  type: 'error',
                  message: '密码错误'
                })
              }
            })
            .catch(err => {
              this.$message({
                type: 'warning',
                message: err
              })
            })
        } else {
          // 验证不合法
          return false
        }
      })
    },
    toRegister() {
      this.$router.push({
        path: 'register'
      })
    }
  }
}
</script>

<style scoped>
.loginPage {
  margin: 0 auto;
  width: 300px;
}
</style>
