<template>
  <el-container class="section">
    <h2>选你所爱</h2>
    <el-header>
      <el-input v-model="username"
                placeholder="未登录..."
                disabled>
        <template slot="prepend">
          <i>账户名</i>
        </template>
        <el-button slot="append"
                   @click="logout">注销</el-button>
      </el-input>
    </el-header>
    <search></search>
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
      // window.console.log(this.$store.state)
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
        this.$router.push('login')
        this.$message({
          type: 'info',
          message: '注销成功'
        })
      } else {
        this.$message({
          type: 'info',
          message: '注销失败'
        })
      }
    }
  }
}
</script>
<style scoped>
.section {
  width: 70%;
  margin: 0 auto;
}
.section .el-header {
  background: #bfcad3;
}
.section .el-header .el-input {
  margin: 10px;
  width: 22%;
  float: right;
}
</style>
