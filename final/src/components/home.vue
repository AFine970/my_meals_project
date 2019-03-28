<template>
  <div class="home">
    <myhead></myhead>
    <search></search>
    <shop-plate></shop-plate>
  </div>
</template>
<script>
import search from '../views/user/search'
import myhead from '../components/myhead'
import shopPlate from '../components/shopPlate'
export default {
  components: { search, myhead, shopPlate }
}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
</style>

