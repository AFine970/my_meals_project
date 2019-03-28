<template>
  <div class="register-img">
    <el-card class="loginCard">
      <h2>Register</h2>
      <el-form :model="formData"
               ref="formData"
               status-icon
               :rules="rules">
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
        <el-form-item prop="repassword">
          <el-input placeholder="确认密码"
                    type="password"
                    clearable
                    v-model.trim="formData.repassword"></el-input>
        </el-form-item>
        <el-form-item prop="phoneKey">
          <el-input placeholder="验证码"
                    type="text"
                    clearable
                    v-model.trim="formData.phoneKey"
                    maxlength="4"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-full"
                     plain
                     type="info"
                     :disabled="disabled"
                     @click="getphoneKey">{{btn_msg}}</el-button>
        </el-form-item>
        <el-form-item prop="radio">
          <el-radio label="user"
                    v-model="formData.radio">用户</el-radio>
          <el-radio label="shop"
                    v-model="formData.radio">商家</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-full"
                     type="primary"
                     @click="register('formData')">注册</el-button>
        </el-form-item>
      </el-form>
      <span @click="toLogin"
            class="tips">已有账号？马上登录</span>
    </el-card>
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
        if (!/^1[345678]\d{9}$/.test(value)) {
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
        callback()
      }
    }
    var validateRepassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    var validatephoneKey = (rule, value, callback) => {
      if (value !== this.codeKey) {
        return callback(new Error('验证码不正确'))
      } else if (value === '') {
        callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    return {
      disabled: false, // 设置获取验证码按钮是否可用
      timer: null, // 设置计时器
      countdown: 60, // 倒计时时间
      btn_msg: '获取验证码',
      codeKey: '', // 验证码

      formData: {
        username: '',
        password: '',
        repassword: '',
        phoneKey: '',
        radio: 'user'
      },

      rules: {
        username: [
          {
            validator: validateUsername,
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: validatePassword,
            trigger: 'blur'
          }
        ],
        repassword: [
          {
            validator: validateRepassword,
            trigger: 'blur'
          }
        ],
        phoneKey: [
          {
            validator: validatephoneKey,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    register(formData) {
      this.$refs[formData].validate(valid => {
        if (valid) {
          let opt = this.formData
          api
            .userRegister(opt)
            .then(({ data }) => {
              if (data.success) {
                this.$message({
                  type: 'success',
                  message: '注册成功'
                })
                this.$router.push('/login')
              } else {
                this.$message({
                  type: 'info',
                  message: '用户名已存在'
                })
              }
            })
            .catch(err => {
              this.$message({
                type: 'warning',
                message: '出现错误' + err.status
              })
            })
        } else {
          return false
        }
      })
    },
    toLogin() {
      this.$router.push('/login')
    },
    // 获取手机验证码
    getphoneKey() {
      if (this.timer) {
        return
      }
      // 给验证码
      const h = this.$createElement
      var codeKey = ''
      const random = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        8,
        9,
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j'
      )
      for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * 19)
        codeKey += random[index]
      }
      this.codeKey = codeKey
      this.$message({
        message: h('p', null, [
          h('span', null, '你的验证码:'),
          h('i', { style: 'color: teal' }, codeKey),
          h('span', null, '，60s后失效')
        ]),
        duration: 10000,
        showClose: true
      })
      // 定时器开始工作
      this.timer = setInterval(() => {
        if (this.countdown > 0 && this.countdown <= 60) {
          this.countdown--
          if (this.countdown !== 0) {
            this.disabled = true
            this.btn_msg = this.countdown + 's后重新发送'
          } else {
            clearInterval(this.timer)
            this.btn_msg = '获取验证码'
            this.countdown = 60
            this.timer = null
            this.disabled = false
            this.codeKey = ''
          }
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.register-img {
  height: 100%;
  background: url('../assets/bg-register.jpg') no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
