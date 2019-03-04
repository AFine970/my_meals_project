const Router = require('koa-router')
const childRouter = new Router()

// 引入checkToken作为获取信息的中间件
const checkToken = require('../middleware/checkToken')

const userController = require('../controller/user')
const shopController = require('../controller/shop')
const foodController = require('../controller/food')
const buypageController = require('../controller/buypage')
const list = require('../controller/list')
const uploadController = require('../controller/upload')

//通用
childRouter.post('/login', userController.Login)
childRouter.post('/register', userController.Register)

// 用户
childRouter.post('/showAllFood', buypageController.showAllFood)

// 商家
childRouter.post('/getAllcompanyName', shopController.getAllcompanyName)
childRouter.post('/submitShopInfo', shopController.submitShopInfo)
childRouter.post('/modifyShopInfo', shopController.modifyShopInfo)
childRouter.post('/getShopInfo', checkToken, shopController.getShopInfo)

childRouter.post('/getFoodList', checkToken, foodController.getFoodList)
childRouter.post('/submitFoodInfo', foodController.submitFoodInfo)
childRouter.post('/deleteFoodList', foodController.deleteFoodList)

childRouter.post('/uploadImg', uploadController.uploadImg)

// 订单管理
childRouter.post('/submitOrder', checkToken, list.submitOrder)
childRouter.post('/getUserCurrentOrder', list.getUserCurrentOrder)
childRouter.post('/getUserHistoryOrder', list.getUserHistoryOrder)

childRouter.post('/getShopCurrentOrder', list.getShopCurrentOrder)
childRouter.post('/getShopHistoryOrder', list.getShopHistoryOrder)

childRouter.post('/receiveOrder_User', list.receiveOrder_User)
childRouter.post('/receiveOrder_Shop', list.receiveOrder_Shop)

//管理员
childRouter.get('/getAllUsers', userController.GetAllUsers)
childRouter.post('/deleteUser', userController.deleteUser)
childRouter.get('/getAllOrderNum', list.getAllOrderNum)

module.exports = childRouter
