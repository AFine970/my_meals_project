const Koa = require('koa')
const Router = require('koa-router')
const httpPort = 6666

const app = new Koa()
const router = new Router()

//该中间件用于post请求的数据
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

// 引入子路由
const childRouter = require('./server/route/route.js')

// 加载子路由
router.use('/api', childRouter.routes(), childRouter.allowedMethods())

//加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(httpPort, () => {
  console.log('Server is running in http://localhost:' + httpPort)
})
