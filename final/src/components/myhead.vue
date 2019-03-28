<template>
  <div class="header">
    <i class="the-title"><span></span>餐饮管理系统</i>
    <el-input v-model="username"
              class="the-input"
              placeholder="未登录..."
              disabled>
      <template slot="prepend">
        <i>{{radio}}</i>
      </template>
      <el-button slot="append"
                 @click="toOrderList">个人中心</el-button>
      <el-button slot="append"
                 @click="logOut">注销</el-button>
    </el-input>
    <div class="the-txt">
      <span @click="tologin">登录</span>
      <span>|</span>
      <span @click="toRegister">注册</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      radio: ''
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
      if (this.radio === 'user') {
        this.$router.push('buylist')
      } else {
        this.$message('请登录后再查看')
        this.$router.push('login')
      }
    },
    tologin() {
      this.$router.push('login')
    },
    toRegister() {
      this.$router.push('register')
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  background-color: #001871;
  padding: 5px;
  width: 100%;
  overflow: hidden;
  .the-title {
    font-size: 25px;
    margin: 17px 0px 17px 50px;
    float: left;
    color: #f9faf6;
  }
  .the-txt {
    color: #f9faf6;
    float: right;
    margin: 22px;
    span {
      margin: 2px;
      &:hover {
        cursor: pointer;
        color: #f2317f;
      }
    }
  }
  .the-input {
    margin: 13px 25px 13px 13px;
    width: 350px;
    float: right;
  }
}
</style>


