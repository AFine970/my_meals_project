<template>
  <el-container class="main-layout">
    <h2>选你所爱</h2>
    <el-header class="the-header">
      <el-input v-model="username"
                class="the-input"
                placeholder="未登录..."
                disabled>
        <template slot="prepend">
          <i>用户名</i>
        </template>
        <el-button slot="append"
                   @click="tobuyList">我的订单</el-button>
        <el-button slot="append"
                   @click="logout">注销</el-button>
      </el-input>
    </el-header>
    <search></search>
    <span @click="toLogin"
          class="tips">你是商家？请来这里</span>
  </el-container>
</template>
<script>
import search from '../views/user/search'
export default {
  components: { search },
  data() {
    return {
      username: ''
    }
  },
  created() {
    this.logName()
  },
  methods: {
    logName() {
      let { radio } = this.$store.state
      if (radio === 'user') {
        this.username = this.$store.state.username
      } else {
        this.$store.dispatch('UserLogout')
      }
    },
    logout() {
      // 清除token
      this.$store.dispatch('UserLogout')
      if (!this.$store.state.token) {
        this.$message({
          type: 'info',
          message: '注销成功'
        })
        this.$router.push('login')
      } else {
        this.$message({
          type: 'info',
          message: '注销失败，请重试'
        })
      }
    },
    toLogin() {
      this.$store.dispatch('UserLogout')
      this.$router.push('login')
    },
    tobuyList() {
      // console.log(this.username)
      if (this.username) {
        this.$router.push('buylist')
      } else {
        this.$message('请登录后再查看')
        this.$router.push('login')
      }
    }
  }
}
</script>
<style scoped>
.the-header {
  background-color: #6fb7ff;
}
.the-input {
  margin-top: 10px;
  width: 370px;
  float: right;
}
</style>
