<template>
  <div class="search">
    <el-autocomplete v-model="inputVal"
                     :fetch-suggestions="querySearch"
                     placeholder="搜索店铺"
                     @select="handleSelect"
                     clearable>
      <i slot="prefix"></i>
    </el-autocomplete>
    <el-badge value="hot">
      <el-button type="primary"
                 @click="toBuy"
                 v-loading.fullscreen.lock="loading">Go</el-button>
    </el-badge>
  </div>
</template>
<script>
import api from '../../Api.js'
export default {
  data() {
    return {
      inputVal: '',
      loading: false,
      selectItem: {},
      restaurants: []
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    // 将下拉选取到的值，抛到全局
    handleSelect(selectItem) {
      this.selectItem = selectItem
    },
    // 跳转到buyPage
    toBuy() {
      if (
        this.inputVal !== '' &&
        this.inputVal === this.selectItem.companyName
      ) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.$router.push('/buy')
        }, 750)
        let data = this.selectItem
        this.$store.dispatch('Company', data)
      } else {
        this.$message('店铺不存在')
      }
    },

    createFilter(queryString) {
      return restaurants => {
        return (
          restaurants.companyName
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        )
      }
    },

    querySearch(queryString, callback) {
      // window.console.log(this.restaurants)
      var restaurants = this.restaurants
      var res = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      callback(res)
    },

    loadData() {
      api.getAllcompanyName().then(response => {
        if (response.data.success === true) {
          // window.console.log(response.data.result)
          let result = response.data.result
          for (const item of result) {
            item.value = item.companyName
          }
          this.restaurants = result
        } else {
          this.$message({
            type: 'error',
            message: '初始化错误'
          })
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.search {
  background: url('../../assets/bgg.jpg') no-repeat;
  background-size: 100% 100%;
  height: 550px;
}
.el-autocomplete {
  margin: 250px 0px 250px 0px;
  float: center;
}
</style>

