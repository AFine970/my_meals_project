// 获取数据表
const User = require('../db/db').User

// 用于密码加密
const sha1 = require('sha1')
const createToken = require('../middleware/createToken')

// ctx context上下文的缩写
// async：异步  await是 async await的简写，await 可以用于等待一个 async 函数的返回值

// 查找单个用户
const findUser = (username, radio) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username, radio }, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}
// 查找所有用户
const findAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

// 登录
const Login = async ctx => {
  let username = ctx.request.body.username
  let password = sha1(ctx.request.body.password)
  let radio = ctx.request.body.radio

  let res = await findUser(username, radio)
  // 用户不存在
  if (!res) {
    ctx.body = {
      exist: false
    }
  } else if (res.password === password && res.radio === radio) {
    let token = createToken(username)
    res.token = token
    await new Promise((resolve, reject) => {
      res.save(err => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })

    ctx.status = 200
    ctx.body = {
      success: true,
      username,
      token,
      radio,
      create_time: res.create_time
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}

// 注册
const Register = async ctx => {
  let user = new User({
    username: ctx.request.body.username,
    password: sha1(ctx.request.body.password),
    radio: ctx.request.body.radio,
    token: createToken(this.username)
  })
  let res = await findUser(user.username, user.radio)

  if (res) {
    // 用户名已存在
    ctx.body = {
      success: false
    }
  } else {
    await new Promise((resolve, reject) => {
      user.save(err => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })

    ctx.body = {
      success: true
    }
  }
}

// 获得所有用户信息
const GetAllUsers = async ctx => {
  let res = await findAllUsers()
  ctx.body = {
    success: true,
    result: res
  }
}
const deleteUser = async ctx => {
  let index = ctx.request.body.index
  await new Promise((resolve, reject) => {
    User.findOneAndDelete(index, (err, res) => {
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
    })
  })
}

module.exports = {
  Login,
  Register,
  GetAllUsers,
  deleteUser
}
