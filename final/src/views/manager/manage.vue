<template>
  <div class="main-layout">
    <el-button class="back"
               @click="logout">注销</el-button>
    <h2>管理员</h2>
    <el-tabs v-model="activeName"
             class="tab-card"
             type="border-card">
      <el-tab-pane label="所有用户"
                   name="first">
        <el-table :data="tableData"
                  max-height="400"
                  stripe
                  border>
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
      <el-tab-pane label="所有订单"
                   name="second">
        <div class="foo">
          <p>订单总数量</p>
          <p><i>{{orderNum}}</i></p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import api from '../../Api.js'
export default {
  data() {
    return {
      orderNum: 0,
      tableData: [],
      activeName: 'first'
    }
  },
  created() {
    this.loadDate()
  },
  methods: {
    loadDate() {
      api.getAllUsers().then(response => {
        if (response.data.success) {
          this.tableData = response.data.result
        } else {
          this.$message({ type: 'error', message: '获取用户信息失败' })
        }
      }),
        api.getAllOrderNum().then(response => {
          if (response.data.success) {
            this.orderNum = response.data.result
          } else {
            this.$message({ type: 'error', message: '出现错误' })
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
    }
  }
}
</script>

<style scoped>
.foo {
  margin: 120px;
}
.foo i {
  margin: 30px;
  font-weight: bold;
  color: crimson;
}
</style>
