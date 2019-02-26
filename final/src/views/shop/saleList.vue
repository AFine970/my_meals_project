<template>
  <el-tabs type="boder-card"
           class="tab-card"
           v-model="activeName">
    <el-tab-pane label="当前订单"
                 name="当前订单">
      <el-table :data="tableData1"
                max-height="400"
                stripe>
        <el-table-column prop="orderDate"
                         label="订单日期">
        </el-table-column>
        <el-table-column prop="buyerId"
                         label="买家名称">
        </el-table-column>
        <el-table-column prop="totalMoney"
                         label="消费金额">
        </el-table-column>
        <el-table-column prop="done"
                         label="订单状态">
          <template slot-scope="scope">
            <el-tag type="danger"
                    disable-transitions>{{scope.row.done}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否接单">
          <template slot-scope="scope">
            <el-button @click.native.prevent="receiveOrder(scope.$index, tableData1)"
                       type="primary"
                       size="mini">
              接单
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane label="历史订单">
      <el-table :data="tableData2"
                max-height="400"
                stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table inline
                      size="small"
                      border
                      max-height="250"
                      :data="scope.row.foodData">
              <el-table-column prop="foodName"
                               label="商品名称">
                <span>{{ scope.row.foodData.foodName}}</span>
              </el-table-column>
              <el-table-column prop="selNum"
                               label="数量">
                <span>{{ scope.row.foodData.selNum }}</span>
              </el-table-column>
              <el-table-column prop="foodPrice"
                               label="单价">
                <span>{{ scope.row.foodData.foodPrice }}</span>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="orderDate"
                         label="订单日期"
                         sortable>
        </el-table-column>
        <el-table-column prop="buyerId"
                         label="买家名称">
        </el-table-column>
        <el-table-column prop="totalMoney"
                         label="消费金额">
        </el-table-column>
        <el-table-column prop="done"
                         label="订单状态">
          <template slot-scope="scope">
            <el-tag type="success"
                    disable-transitions>{{scope.row.done}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import api from '../../Api.js'
export default {
  created() {
    this.loadData()
  },
  mounted() {
    this.refresh()
  },
  data() {
    return {
      activeName: '当前订单',
      tableData1: [],
      tableData2: [],
      flag: false
    }
  },
  methods: {
    receiveOrder(index, rows) {
      // console.log('>>', index)
      // console.log('>>', this.tableData1[index].orderId)
      let orderId = this.tableData1[index].orderId
      api.receiveOrder_Shop({ orderId }).then(response => {
        if (response.data.success === true) {
          api.receiveOrder_User({ orderId })
          this.$socket.emit('isReceived', true)
          this.$notify({
            type: 'success',
            message: '接单成功'
          })
          rows.splice(index, 1)
          this.loadData()
        } else {
          this.$message({
            type: 'error',
            message: '出现错误'
          })
          return false
        }
      })
    },
    loadData() {
      let { username } = this.$store.state
      api.getShopCurrentOrder({ username }).then(response => {
        if (response.data.success === true) {
          this.tableData1 = response.data.result
        }
      })
      api.getShopHistoryOrder({ username }).then(response => {
        if (response.data.success === true) {
          this.tableData2 = response.data.result
        }
      })
    },
    refresh() {
      this.sockets.subscribe('isNewOrder', data => {
        if (data) {
          this.loadData()
          this.$message({ type: 'success', message: '您有新订单' })
        }
      })
    }
  }
}
</script>

