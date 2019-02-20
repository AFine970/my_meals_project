const mongoose = require('mongoose')

const foodList = mongoose.Schema({
  userId: String,
  foodName: String,
  foodRegion: String,
  foodPrice: String,
  selNum: {
    type: String,
    default: 1
  },
  imageUrl: String,
  create_time: {
    type: Date,
    default: Date.now()
  }
})
module.exports = mongoose.model('FoodList', foodList)
