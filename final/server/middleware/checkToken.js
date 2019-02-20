// 检验token是否过期
const jwt = require('jsonwebtoken')

module.exports = async (ctx, next) => {
  const authorization = ctx.request.header['authorization']
  if (authorization === '') {
    ctx.throw(401, 'no authorization token ！')
  }

  const token = authorization.split(' ')[1]

  await jwt.verify(
    token,
    'singer66',
    err => {
      if (err) {
        // ctx.status = 401
        ctx.body = {
          code: 401,
          error: err
        }
      }
    },
    await next()
  )
}
