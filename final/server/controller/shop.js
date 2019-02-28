const Shop = require('../db/db').Shop
// const moment = require('moment')

// moment().format()

// 获取当前店铺信息
const getShopInfo = async ctx => {
  let userId = ctx.request.body.username
  let res = await Shop.findOne({ userId: userId })

  await new Promise((resolve, reject) => {
    if (!res) {
      ctx.body = {
        exist: false
      }
      reject()
    } else {
      ctx.body = {
        success: true,
        result: res
      }
      resolve()
    }
  })
}

// 获取所有店铺的名称
const getAllcompanyName = async ctx => {
  await new Promise((resolve, reject) => {
    Shop.find({}, (err, res) => {
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

// 提交店铺信息
const submitShopInfo = async ctx => {
  let shop = new Shop({
    userId: ctx.request.body.userId,
    companyName: ctx.request.body.companyName,
    companyPhone: ctx.request.body.companyPhone,
    companyAddress: ctx.request.body.companyAddress
  })

  await new Promise((resolve, reject) => {
    shop.save((err, res) => {
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

// 修改店铺信息
const modifyShopInfo = async ctx => {
  let userId = ctx.request.body.userId
  // global.console.log('>>>>>>', userId)
  let info = {
    companyName: ctx.request.body.companyName,
    companyPhone: ctx.request.body.companyPhone,
    companyAddress: ctx.request.body.companyAddress
  }

  await new Promise((resolve, reject) => {
    Shop.updateOne({ userId: userId }, { $set: info }, (err, res) => {
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
  getShopInfo,
  submitShopInfo,
  modifyShopInfo,
  getAllcompanyName
}
