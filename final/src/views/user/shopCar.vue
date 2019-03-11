<template>
  <div class="main-layout">
    <el-dialog title="我的购物车"
               class="shopCar"
               :visible.sync="isShowOrder"
               @close="handleClose">
      <el-table :data="Data"
                max-height="400"
                stripe>
        <el-table-column prop="foodName"
                         label="名称">
        </el-table-column>
        <el-table-column prop="selNum"
                         label="数量">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.selNum"
                             @change="handleChange(scope.row)"
                             :min="0"
                             controls-position="right"
                             size="small"></el-input-number>
          </template>
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
      <el-button size="mini"
                 class="clear-btn"
                 type="info"
                 @click="clearData">清空购物车</el-button>
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
      Data: this.orderData
    }
  },

  computed: {
    sumMoney() {
      return this.Data.reduce((result, item) => {
        return result + item.selNum * item.foodPrice
      }, 0)
    }
  },

  methods: {
    handleClose() {
      let totalMeney = this.sumMoney
      this.$emit('close', totalMeney)
    },
    // 清空购物车
    clearData() {
      this.Data = []
      let info = { orderData: [] }
      this.$emit('clear', info)
    },
    //获得input-select的值
    handleChange(val) {
      // 为0时，删除掉该项
      if (val.selNum === 0) {
        for (const item of this.Data) {
          if (item === val) {
            let index = this.Data.indexOf(item)
            this.Data.splice(index, 1)
          }
        }
      }
      let info = { orderData: this.Data }
      this.$emit('change', info)
    }
  }
}
</script>

<style scoped>
.clear-btn {
  margin: 15px;
}
.money-style {
  margin: 10px;
}
.money-style i {
  font-weight: bold;
  font-size: 25px;
  color: crimson;
}
.money-style span {
  font-size: 20px;
}
</style>
