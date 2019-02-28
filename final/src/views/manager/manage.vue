<template>
  <div class="main-layout">
    <h2>账户管理页</h2>
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
  </div>
</template>

<script>
import api from '../../Api.js'
export default {
  data() {
    return {
      tableData: []
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
          this.$message('获取用户信息失败')
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
    }
  }
}
</script>

