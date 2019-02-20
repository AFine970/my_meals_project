const FoodList = require('../db/db').FoodList
const moment = require('moment')

moment().format()

// 获得名下所有的菜单
// find({key:value})
const showAllFood = async ctx => {
  let userId = ctx.request.body.companyId
  await new Promise((resolve, reject) => {
    FoodList.find({ userId: userId }, (err, res) => {
      if (err) {
        ctx.body = {
          success: false
        }
        reject(err)
      }
      ctx.body = {
        success: true,
        result: res
      }
      resolve(res)
    })
  })
}

module.exports = {
  showAllFood
}
