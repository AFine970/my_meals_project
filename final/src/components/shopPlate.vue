<template>
  <div class="shop-plate-child">
    <el-card class="shop-plate-card"
             :body-style="{ padding: '0px' }">
      <img :src="item"
           class="card-img">
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    item: String
  }
}
</script>
<style lang="less" scoped>
.shop-plate-child {
  float: left;
  width: 33.3%;
  height: 100%;
  .shop-plate-card {
    padding: 10px;
    .card-img {
      width: 100%;
    }
  }
}
</style>

