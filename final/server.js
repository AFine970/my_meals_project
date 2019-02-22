const Koa = require('koa')
const Router = require('koa-router')
const http = require('http')
const info = require('./config/info')
//该中间件用于post请求的数据
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()

process.env.PORT = info.serverAddress.port || 3000
const server = http.createServer(app.callback())
const io = require('socket.io')(server)
server.listen(process.env.PORT, () => {
  console.log('>>>>>Server running on *:' + process.env.PORT + '<<<<<')
})

app.use(bodyParser())

// 引入子路由
const childRouter = require('./server/route/route.js')

// 加载子路由
router.use('/api', childRouter.routes(), childRouter.allowedMethods())

//加载路由中间件
app.use(router.routes(), router.allowedMethods())

io.on('connection', socket => {
  socket.on('newOrder', msg => {
    console.log(msg)
  })
  socket.on('disconnet', () => {
    console.log('disconnected')
  })
})
