<template>
  <div class="all-userinfo">
    <el-container>
      <el-header>
        <h2>汇总面板</h2>
      </el-header>
      <el-main>
        <el-table ref="filterTable"
                  :data="tableData"
                  max-height="550"
                  stripe
                  border>
          <el-table-column prop="uid"
                           label="ID"
                           width="150"></el-table-column>
          <el-table-column prop="date"
                           label="注册日期"
                           sortable
                           column-key="date"
                           width="300">
          </el-table-column>
          <el-table-column prop="username"
                           label="用户名">
          </el-table-column>
          <el-table-column prop="tag"
                           label="标签"
                           width="300"
                           :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                           :filter-method="filterTag"
                           filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'"
                      disable-transitions>{{scope.row.tag}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }
      ]
    }
  },
  methods: {
    filterTag(value, row) {
      return row.tag === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>
<style scoped>
.all-userinfo {
  width: 70%;
  margin: 0 auto;
}
</style>

