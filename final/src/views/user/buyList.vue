<template>
  <div class="main-layout">
    <el-button class="back"
               @click="goBack"
               icon="el-icon-arrow-left"></el-button>
    <h2>我的订单</h2>
    <el-tabs type="border-card"
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
          <el-table-column prop="companyName"
                           label="店家名称">
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
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="历史订单"
                   name="历史订单">
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
          <el-table-column prop="companyName"
                           label="店家名称">
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
  </div>
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
      tableData2: []
    }
  },
  methods: {
    loadData() {
      let { username } = this.$store.state
      api.getUserCurrentOrder({ username }).then(response => {
        if (response.data.success === true) {
          this.tableData1 = response.data.result
        }
      })
      api.getUserHistoryOrder({ username }).then(response => {
        if (response.data.success === true) {
          this.tableData2 = response.data.result
        }
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    refresh() {
      this.sockets.subscribe('isReceived', data => {
        // debugger
        if (data) {
          this.loadData()
          this.$message({ type: 'success', message: '商家已接单' })
        }
      })
    }
  }
}
</script>
