<template>
  <div class="main-layout">
    <el-button class="back"
               @click="logout">Esc</el-button>
    <h2>管理员管理页</h2>
    <el-tabs v-model="activeName"
             class="tab-card"
             type="border-card">
      <el-tab-pane label="订单信息"
                   name="first">
        <div v-for="(item,index) in chartdata"
             class="foo"
             :key="index">
          <line-chart v-if="loaded"
                      :chartdata="item"></line-chart>
        </div>
      </el-tab-pane>

      <el-tab-pane label="用户管理"
                   name="second">
        <el-table :data="tableData"
                  max-height="400"
                  stripe>
          <el-table-column prop="username"
                           label="用户名">
          </el-table-column>
          <el-table-column prop="create_time"
                           label="创建时间">
          </el-table-column>
          <el-table-column prop="radio"
                           label="类别">
            <template slot-scope="scope">
              <el-tag :type="scope.row.radio==='user'?'primary':'success'"
                      disable-transitions>{{scope.row.radio}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click.native.prevent="deleteUser(scope.$index, tableData)"
                         type="danger"
                         size="mini">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import api from '../../Api.js'
import lineChart from './lineChart'
export default {
  components: { lineChart },
  data() {
    return {
      tableData: [],
      activeName: 'first',

      loaded: false,
      chartdata: null,
      options: null
    }
  },
  created() {
    this.loadDate()
    this.loadChart()
  },
  methods: {
    loadDate() {
      api.getAllUsers().then(response => {
        if (response.data.success) {
          this.tableData = response.data.result
        } else {
          this.$message({ type: 'error', message: '获取用户信息失败' })
        }
      })
    },
    deleteUser(index, rows) {
      // let index = 111
      // console.log(row[index]._id)
      let delIndex = this.tableData[index]._id
      api.deleteUser({ delIndex }).then(response => {
        if (response.data.success) {
          this.$message({ type: 'success', message: '删除成功' })
          rows.splice(index, 1)
          this.loadDate()
        } else {
          this.$message({ type: 'error', message: '删除失败' })
          return false
        }
      })
    },
    logout() {
      this.$store.dispatch('UserLogout')
      this.$router.push('/login')
      this.$message('注销成功')
    },
    loadChart() {
      this.loaded = true
      this.chartdata = {
        chartdata1: {
          labels: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月'
          ],
          datasets: [
            {
              label: '平台月订单量',
              backgroundColor: '#409EFF',
              data: [
                2400,
                2190,
                2100,
                2400,
                2390,
                2800,
                2400,
                2101,
                2400,
                2390,
                2800,
                2400,
                0
              ]
            }
          ]
        },
        chartdata2: {
          labels: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月'
          ],
          datasets: [
            {
              label: '平台月用户量',
              backgroundColor: '#f87979',
              data: [
                2400,
                2190,
                2100,
                2400,
                2390,
                2800,
                2400,
                2101,
                2400,
                2390,
                2800,
                2400,
                0
              ]
            }
          ]
        }
      }
      this.chartdata2 = {}
    }
  }
}
</script>

<style scoped>
.foo {
  margin: 20px;
  display: inline-block;
  max-width: 400px;
}
</style>
