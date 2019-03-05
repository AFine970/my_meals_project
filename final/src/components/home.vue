<template>
  <div class="main-layout">
    <h2>选你所爱</h2>
    <search></search>
    <span @click="toLogin"
          class="tips">你是商家？请来这里</span>
  </div>
</template>
<script>
import search from '../views/user/search'
export default {
  components: { search },
  methods: {
    toLogin() {
      this.$store.dispatch('UserLogout')
      this.$router.push('login')
    }
  }
}
</script>
