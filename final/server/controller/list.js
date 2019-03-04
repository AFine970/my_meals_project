const BuyList = require('../db/db').BuyList
const SaleList = require('../db/db').SaleList
// const moment = require('moment')

// moment().format()
// 用户提交订单
const submitOrder = async ctx => {
  // console.log(ctx.request.body)
  let foodData = []
  for (const i of ctx.request.body.foodData) {
    let each = {
      foodName: i.foodName,
      selNum: i.selNum,
      foodPrice: i.foodPrice
    }
    foodData.push(each)
  }
  // console.log(result)

  let buylist = new BuyList({
    foodData: foodData,
    orderId: ctx.request.body.orderId,
    buyerId: ctx.request.body.buyerId,
    companyName: ctx.request.body.companyName,
    totalMoney: ctx.request.body.totalMoney
  })
  let salelist = new SaleList({
    foodData: foodData,
    orderId: ctx.request.body.orderId,
    buyerId: ctx.request.body.buyerId,
    companyId: ctx.request.body.companyId,
    totalMoney: ctx.request.body.totalMoney
  })
  await new Promise((resolve, reject) => {
    try {
      buylist.save()
      salelist.save()
      ctx.body = {
        success: true
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

//用户获取自己的订单
const getUserCurrentOrder = async ctx => {
  let buyerId = ctx.request.body.username
  // console.log(buyerId)
  // let res = await Find(buyerId)
  let res = await BuyList.find({ buyerId: buyerId, done: '未接单' })
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
const getUserHistoryOrder = async ctx => {
  let buyerId = ctx.request.body.username
  // console.log(buyerId)
  // let res = await Find(buyerId)
  let res = await BuyList.find({ buyerId: buyerId, done: '已完成' })
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
// 商家获取自己的订单
const getShopCurrentOrder = async ctx => {
  let companyId = ctx.request.body.username
  // let res = await Find(companyId)
  let res = await SaleList.find({ companyId: companyId, done: '未接单' })
  await new Promise((resolve, reject) => {
    try {
      ctx.body = {
        success: true,
        result: res
      }
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
const getShopHistoryOrder = async ctx => {
  let companyId = ctx.request.body.username
  // let res = await Find(companyId)
  let res = await SaleList.find({ companyId: companyId, done: '已完成' })
  await new Promise((resolve, reject) => {
    try {
      ctx.body = {
        success: true,
        result: res
      }
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
// 接单
const receiveOrder_Shop = async ctx => {
  await new Promise((resolve, reject) => {
    // console.log(ctx.request.body)
    let index = ctx.request.body.orderId
    // BuyList.findOneAndUpdate({ orderId: index }, { done: '已完成' })
    SaleList.findOneAndUpdate(
      { orderId: index },
      { done: '已完成' },
      (err, res) => {
        if (err) {
          ctx.body = {
            success: false
          }
          reject(err)
        } else {
          ctx.body = {
            success: true
          }
          resolve(res)
        }
      }
    )
  })
}
const receiveOrder_User = async ctx => {
  await new Promise((resolve, reject) => {
    // console.log(ctx.request.body)
    let index = ctx.request.body.orderId
    // BuyList.findOneAndUpdate({ orderId: index }, { done: '已完成' })
    BuyList.findOneAndUpdate(
      { orderId: index },
      { done: '已完成' },
      (err, res) => {
        if (err) {
          ctx.body = {
            success: false
          }
          reject(err)
        } else {
          ctx.body = {
            success: true
          }
          resolve(res)
        }
      }
    )
  })
}
const getAllOrderNum = async ctx => {
  await new Promise((resolve, reject) => {
    BuyList.countDocuments({}, (err, res) => {
      if (err) {
        ctx.body = {
          success: false
        }
        reject(err)
      } else {
        ctx.body = {
          success: true,
          result: res
        }
        resolve(res)
      }
    })
  })
}

module.exports = {
  submitOrder,

  getUserCurrentOrder,
  getUserHistoryOrder,

  getShopCurrentOrder,
  getShopHistoryOrder,

  receiveOrder_Shop,
  receiveOrder_User,

  getAllOrderNum
}
