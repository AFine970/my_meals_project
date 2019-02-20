const mongoose = require('mongoose')

const buyList = mongoose.Schema({
  buyerId: String,
  orderId: String,
  companyName: String,
  foodData: Array,
  totalMoney: String,
  orderDate: {
    type: Date,
    default: Date.now()
  },
  done: {
    type: String,
    default: '未接单'
  }
})

module.exports = mongoose.model('BuyList', buyList)
