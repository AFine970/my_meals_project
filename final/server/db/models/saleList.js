const mongoose = require('mongoose')

const saleList = mongoose.Schema({
  companyId: String,
  buyerId: String,
  foodData: Array,
  totalMoney: String,
  orderId: String,
  orderDate: {
    type: Date,
    default: Date.now()
  },
  done: {
    type: String,
    default: '未接单'
  }
})

module.exports = mongoose.model('SaleList', saleList)
