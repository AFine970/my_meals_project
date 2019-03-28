<template>
  <div>
    <my-head></my-head>
    <el-container class="main-layout">
      <el-header>
        <el-button class="goback"
                   @click="goBack"
                   icon="el-icon-arrow-left"></el-button>
        <h2>{{companyName}}</h2>
      </el-header>
      <el-main>
        <el-tabs type="border-card"
                 class="tab-card"
                 tab-position="left"
                 v-model="activeName">
          <el-tab-pane v-for="name in nameList"
                       :label="name"
                       :name="name"
                       :key="name">
            <template v-if="name === activeName">
              <food-card v-for="item in showList"
                         :item="item"
                         @addtoCar="addtoCar"
                         :key="item._id" />
            </template>
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <div>
        <el-badge :value="countNum"
                  :max="10"
                  class="item">
          <el-button @click="seeOrder"
                     type="primary"><i class="el-icon-goods"></i>我的购物车</el-button>
        </el-badge>

        <el-button v-if="isLook"
                   @click="submitOrder"
                   type="success">立即下单</el-button>
      </div>
      <shop-car v-if="isShow"
                :orderData="orderData"
                @close="seeOrder"
                @clear="clearData"
                @change="getChange"></shop-car>
    </el-container>
  </div>
</template>
<script>
import foodCard from './foodCard'
import shopCar from './shopCar'
import myHead from '../../components/myhead'
import api from '../../Api.js'
export default {
  components: { foodCard, shopCar, myHead },
  data() {
    return {
      buyerId: '',
      companyId: '',
      companyName: '', // 商铺名字
      companyAddress: '',
      totalMoney: '',

      isShow: false,
      isLook: false,

      nameList: ['人气热销', '店家推荐', '特色硬菜', '新品来袭'],
      activeName: '人气热销',

      foodList: [],

      orderData: []
    }
  },
  created() {
    this.loadData()
  },
  computed: {
    showList() {
      return this.foodList.filter(item => item.foodRegion === this.activeName)
    },
    countNum() {
      return this.orderData.reduce((result, item) => {
        return result + Number(item.selNum)
      }, 0)
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    seeOrder(totalMoney) {
      this.totalMoney = totalMoney
      this.isShow = !this.isShow
      // 展示下单按钮
      this.isLook = true
    },

    submitOrder() {
      this.$confirm('是否确定下单？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      })
        .then(() => {
          //提交表单
          let bus = {
            buyerId: this.buyerId,
            orderId: Date.now(),
            foodData: this.orderData,
            companyName: this.companyName,
            companyId: this.companyId,
            totalMoney: this.totalMoney
          }
          console.log('>>>>>>', bus)
          if (this.orderData.length === 0) {
            this.$message({ type: 'error', message: '不能提交空订单' })
            return false
          }
          api.submitOrder(bus).then(response => {
            if (response.data.success === true) {
              this.$router.push('/buylist')
              this.$socket.emit('isNewOrder', true)
              this.$notify({ type: 'success', message: '下单成功' })
            } else {
              this.$socket.emit('isNewOrder', false)
              this.$notify({
                type: 'error',
                message: `出现错误${response.data.error.message}`
              })
              return false
            }
          })
        })
        .catch(err => {
          return err
        })
    },

    loadData() {
      this.buyerId = this.$store.state.username
      this.companyName = this.$store.state.companyName
      this.companyId = this.$store.state.companyId
      this.companyAddress = this.$store.state.companyAddress

      let companyId = this.$store.state.companyId
      api.showAllFood({ companyId }).then(response => {
        if (response.data.success === true) {
          this.foodList = response.data.result
        } else {
          this.$message({ type: 'error', message: '初始化错误' })
        }
      })
    },

    addtoCar(item) {
      // console.log('666', item)
      let busArr = this.orderData
      if (busArr.some(each => each === item)) {
        item.selNum++
      } else {
        this.orderData.push(item)
      }
    },
    // 返回上一级
    goBack() {
      this.$router.go(-1)
    },
    // 根据sockets的值进行即时更新
    refresh() {
      this.sockets.subscribe('isNewFood', data => {
        if (data) {
          this.loadData()
        }
      })
      this.sockets.subscribe('deleteFood', data => {
        if (data) {
          this.loadData()
        }
      })
    },
    // 清空购物车
    clearData(info) {
      this.orderData = info.orderData
      this.loadData()
    },

    getChange(info) {
      this.orderData = info.orderData
      this.loadData()
    }
  }
}
</script>
<style scoped>
.goback {
  margin-top: 20px;
  float: left;
}
</style>
