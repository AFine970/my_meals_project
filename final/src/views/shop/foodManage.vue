<template>
  <div>
    <el-button @click="add"
               type="primary">添加商品</el-button>
    <add-food v-if="isShow"
              @close="add" />
    <h3>已添加的商品信息</h3>
    <el-table :data="tableData"
              max-height="350"
              stripe>
      <el-table-column prop="foodName"
                       label="商品名称">
      </el-table-column>
      <el-table-column prop="foodRegion"
                       label="商品种类">
      </el-table-column>
      <el-table-column prop="foodPrice"
                       label="单价">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button @click="deleteRow(scope.$index, tableData)"
                     size="mini"
                     type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import addFood from './addFood'
import api from '../../Api.js'
export default {
  components: { addFood },
  data() {
    return {
      isShow: false,

      tableData: [
        {
          foodName: '',
          foodRegion: '',
          foodPrice: ''
        }
      ]
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    add(flag) {
      this.isShow = !this.isShow
      flag && this.loadData()
    },
    deleteRow(index, rows) {
      this.$confirm('永久删除商品信息，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // console.log(index, '>>>>>', this.tableData[index]._id)
          let foodIndex = this.tableData[index]._id
          api.deleteFoodList({ foodIndex }).then(response => {
            if (response.data.success === true) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              rows.splice(index, 1)
            } else {
              this.$message({
                type: 'error',
                message: '删除失败'
              })
              return false
            }
          })
        })
        .catch(() => {
          return false
        })
    },
    loadData() {
      let { username } = this.$store.state
      api.getFoodList({ username }).then(response => {
        if (response.data.success === true) {
          this.tableData = response.data.result
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
