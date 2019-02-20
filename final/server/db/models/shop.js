const mongoose = require('mongoose')
// const Schema = mongoose.Schema
// const ObjectId = Schema.Types.ObjectId

const shop = new mongoose.Schema({
  userId: String,
  companyName: String,
  companyPhone: String,
  companyAddress: String,
  create_time: {
    type: Date,
    default: Date.now()
  },
  modify_time: {
    type: Date,
    default: Date.now()
  }
})

shop.pre('save', function(next) {
  this.modify_time = Date.now()
  next()
})

module.exports = mongoose.model('Shop', shop)
