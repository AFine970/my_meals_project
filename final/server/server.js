const Koa = require('koa')
const Router = require('koa-router')
const http = require('http')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const compress = require('koa-compress')
// const serve = require('koa-static')

const info = require('../config/info')
//该中间件用于post请求的数据, ctx.request.body=ctx.body
const bodyParser = require('koa-bodyparser')
// 引入子路由
const childRouter = require('./route/route.js')

const app = new Koa()
const router = new Router()

process.env.PORT = info.serverAddress.port || 3000

const server = http.createServer(app.callback())
const io = require('socket.io')(server)

// 处理错误
onerror(app)

app.use(logger())
app.use(bodyParser())
// app.use(require('koa-static')(`${__dirname}/public`))
// app.use(serve(__dirname + '../static', {}))
app.use(require('koa-static')(`${__dirname}/static`))

// 压缩文件
app.use(
  compress({
    filter: function(content_type) {
      return /text/i.test(content_type)
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
  })
)

// 加载子路由
router.use('/api', childRouter.routes(), childRouter.allowedMethods())

// 加载路由中间件
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
