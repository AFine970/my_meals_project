<template>
  <div>
    <h2>你访问的页面 <i>没权限</i> 或者 <i>权限已过期</i>，请前往登录</h2>
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
