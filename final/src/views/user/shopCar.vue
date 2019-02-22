<template>
  <div class="order-list">
    <el-dialog title="我的购物车"
               :visible.sync="isShowOrder"
               @close="handleClose">
      <el-table :data="orderData"
                max-height="400"
                stripe>
        <el-table-column prop="foodName"
                         label="名称">
        </el-table-column>
        <el-table-column prop="selNum"
                         label="数量">
        </el-table-column>
        <el-table-column prop="foodPrice"
                         label="单价">
        </el-table-column>
        <el-table-column label="合计">
          <template slot-scope="scope">
            <p>￥{{scope.row.selNum*scope.row.foodPrice}}</p>
          </template>
        </el-table-column>
      </el-table>
      <div class="money-style">
        <span>总金额</span>
        <i>￥{{sumMoney}}</i>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    orderData: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {
      isShowOrder: true,
      totalMeney: ''
    }
  },

  computed: {
    sumMoney() {
      return this.orderData.reduce((result, item) => {
        return result + item.selNum * item.foodPrice
      }, 0)
    }
  },
  methods: {
    handleClose() {
      this.totalMeney = this.sumMoney
      this.$emit('close', this.totalMeney)
    }
  }
}
</script>

<style scoped>
.order-list {
  width: 70%;
  margin: 0 auto;
}
.money-style {
  margin: 10px;
}
.money-style i {
  font-weight: bold;
  font-size: 20px;
  color: crimson;
}
.money-style span {
  font-size: 20px;
}
</style>
