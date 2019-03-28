<template>
  <div class="no-auth">
    <img src="../assets/404.png">
    <h3>你访问的页面 <i> 没权限 || 权限已过期</i>，请前往登录</h3>
    <el-button @click="goback">前往</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    goback() {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scoped>
.no-auth {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

