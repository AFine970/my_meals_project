<template>
  <div class="home">
    <myhead></myhead>
    <search></search>
    <div class="shop-plate">
      <div v-for="(item,index) in imgUrl"
           :key="index">
        <shop-plate :item="item"></shop-plate>
      </div>
    </div>
  </div>
</template>
<script>
import search from '../views/user/search'
import myhead from '../components/myhead'
import shopPlate from '../components/shopPlate'
import imgMission from '../assets/mission.jpg'
import imgSco from '../assets/society.jpg'
import imgValue from '../assets/value.png'
export default {
  components: { search, myhead, shopPlate },
  data() {
    return {
      imgUrl: [imgMission, imgSco, imgValue]
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  .shop-plate {
    overflow: hidden;
  }
}
</style>

