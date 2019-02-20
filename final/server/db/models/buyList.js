const mongoose = require('mongoose')

const buyList = mongoose.Schema({
  buyerId: String,
  orderDate: {
    type: Date,
    default: Date.now()
  },
  foodName: String,
  selNum: String,
  foodPrice: String,
  totalMoney: String,
  done: {
    type: String,
    default: 0
  }
})

module.exports = mongoose.model('BuyList', buyList)
