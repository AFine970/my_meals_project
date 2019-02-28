// 解决MongoDB时区的问题
const moment = require('moment');
moment().format();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// 连接MongoDB
const db = mongoose.connection;
mongoose.connect(
  'mongodb://localhost/final',
  { useNewUrlParser: true }
);

db.on('error', () => {
  global.console.log('连接数据库失败');
});
db.on('open', () => {
  global.console.log('连接数据库成功');
});

const userSchema = require('./models/user');
const shopSchema = require('./models/shop');
const saleListSchema = require('./models/saleList');
const buyListSchema = require('./models/buyList');
const foodListSchema = require('./models/foodList');

const models = {
  // 在这里扩展models
  User: userSchema,
  Shop: shopSchema,
  SaleList: saleListSchema,
  BuyList: buyListSchema,
  FoodList: foodListSchema
};

module.exports = models;
