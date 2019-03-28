<template>
  <div class="shop-plate">
    <span class="shop-plate-title">热门商家推荐</span>
    <div>
      <el-card class="shop-plate-card">
        <img>
        <span class="card-title">卡片名称</span>
        <el-button class="card-btn"
                   type="text">看一看</el-button>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.shop-plate {
  height: 40%;
  padding: 10px;
  background: #f5f4e8;
  .shop-plate-title {
    font-size: 18px;
  }
  .shop-plate-card {
    margin: 50px 0px 0px 50px;
    height: 250px;
    width: 300px;
    .card-title {
      clear: both;
    }
    .card-btn {
      float: right;
      padding: 3px 0;
    }
  }
}
</style>

