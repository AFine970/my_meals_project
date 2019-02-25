const FoodList = require('../db/db').FoodList
const moment = require('moment')

moment().format()

// 获得当前商家下的所有菜单
const getFoodList = async ctx => {
  let userId = ctx.request.body.username
  let res = await FoodList.find({ userId: userId })
  await new Promise((resolve, reject) => {
    try {
      ctx.body = {
        success: true,
        result: res
      }
      resolve()
    } catch (error) {
      ctx.body = {
        success: false
      }
      reject(error)
    }
  })
}

// 提交信息
const submitFoodInfo = async ctx => {
  let food = new FoodList({
    userId: ctx.request.body.userId,
    foodName: ctx.request.body.foodName,
    foodRegion: ctx.request.body.foodRegion,
    foodPrice: ctx.request.body.foodPrice,
    imageUrl: ctx.request.body.imageUrl
  })
  await new Promise((resolve, reject) => {
    food.save((err, res) => {
      if (err) {
        ctx.body = {
          success: false
        }
        reject(err)
      }
      ctx.body = {
        success: true
      }
      resolve(res)
    })
  })
}

//删除商品
const deleteFoodList = async ctx => {
  await new Promise((resolve, reject) => {
    let index = ctx.request.body.foodIndex
    FoodList.findOneAndDelete(index, (err, res) => {
      if (err) {
        ctx.body = {
          success: false
        }
        reject(err)
      }
      ctx.body = {
        success: true
      }
      resolve(res)
    })
  })
}
module.exports = {
  getFoodList,
  submitFoodInfo,
  deleteFoodList
}
