// 创建token
var jwt = require('jsonwebtoken')

// 将用户的ID作为JWT的 Payload的一个属性
module.exports = function(username) {
  const token = jwt.sign(
    {
      msg: username
    },
    'singer66', // 秘钥，
    {
      expiresIn: '2h' // 失效时间设置为2小时
    }
  )
  return token
}
