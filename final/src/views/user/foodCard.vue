<template>
  <div class="menu-card">
    <el-card :body-style="{ padding: '0px' }">
      <img :src="item.imageUrl"
           class="menu-card-img">
      <div class="menu-card-des">
        <span>{{item.foodName}}</span>
        <i>￥{{item.foodPrice}}</i>
      </div>
      <el-button type="text"
                 size="small"
                 @click="hanleClick">加入购物车</el-button>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'foodCard',
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    hanleClick() {
      this.$emit('addtoCar', this.item)
    }
  }
}
</script>
<style scoped>
.menu-card {
  width: 200px;
  margin: 10px;
  float: left;
}
.menu-card-img {
  width: 200px;
  height: 160px;
}
.menu-card-des i {
  font-weight: bold;
  color: crimson;
}
</style>
