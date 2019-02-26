<template>
  <div class="main-layout">
    <el-button class="back"
               @click="logout">Esc</el-button>
    <h2>店铺信息管理</h2>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-document"></i>店铺信息</span>
        <shop-info></shop-info>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-tickets"></i>订单信息</span>
        <sale-list></sale-list>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-circle-plus"></i>商品管理</span>
        <food-manage></food-manage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import saleList from './saleList'
import shopInfo from './shopInfo'
import foodManage from './foodManage'
export default {
  components: { saleList, shopInfo, foodManage },
  methods: {
    logout() {
      this.$store.dispatch('UserLogout')
      if (!this.$store.state.token) {
        this.$message({ type: 'info', message: '注销成功' })
        this.$router.push('login')
      } else {
        this.$message({ type: 'info', message: '注销失败，请重试' })
      }
    }
  }
}
</script>

