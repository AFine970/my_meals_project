const Koa = require('koa')
const Router = require('koa-router')
const http = require('http')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const info = require('./config/info')
//该中间件用于post请求的数据, ctx.request.body=ctx.body
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()

process.env.PORT = info.serverAddress.port || 3000

const server = http.createServer(app.callback())
const io = require('socket.io')(server)
//处理错误
onerror(app)
app.use(logger())
app.use(bodyParser())

// 引入子路由
const childRouter = require('./server/route/route.js')

// 加载子路由
router.use('/api', childRouter.routes(), childRouter.allowedMethods())

//加载路由中间件
app.use(router.routes(), router.allowedMethods())

// socket连接
io.on('connection', socket => {
  socket.on('isNewOrder', data => {
    // console.log('isNewOrder', msg)
    io.emit('isNewOrder', data)
  })
  socket.on('isReceived', data => {
    // console.log('isReceived', data)
    io.emit('isReceived', data)
  })
  socket.on('disconnect', () => {
    io.emit('disconnected')
  })
})

server.listen(process.env.PORT, () => {
  console.log('>>>>>Server running on *:' + process.env.PORT + '<<<<<')
})
