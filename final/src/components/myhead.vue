<template>
  <div class="the-header">
    <i class="the-title">餐饮管理系统</i>
    <el-input v-model="username"
              class="the-input"
              placeholder="未登录..."
              disabled>
      <template slot="prepend">
        <i>{{radio}}</i>
      </template>
      <el-button slot="append"
                 @click="toOrderList">我的订单</el-button>
      <el-button slot="append"
                 @click="logOut">注销</el-button>
    </el-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      radio: null
    }
  },
  created() {
    this.logName()
  },
  methods: {
    logName() {
      this.radio = this.$store.state.radio
      this.username = this.$store.state.username
    },
    logOut() {
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
    toOrderList() {
      // console.log(this.radio)
      if (this.radio === 'user') {
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
.the-title {
  font-size: 25px;
  margin: 17px;
  float: left;
  color: #ffffff;
}
.the-header {
  background-color: #6fb7ff;
  width: 100%;
  border-radius: 10px;
}
.the-input {
  margin: 13px;
  width: 370px;
  float: right;
}
</style>
