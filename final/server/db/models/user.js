const mongoose = require('mongoose')

const user = mongoose.Schema({
  username: String,
  password: String,
  radio: String,
  token: String,
  create_time: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('User', user)
