const path = require('path')
const fs = require('fs')
const inspect = require('util').inspect
const Busboy = require('busboy')

// 同步创建文件目录
function mkdirSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    // path.dirname()用于获取一个路径中的目录名，当参数值为目录路径时，
    // 该方法返回该目录的上层；当参数为文件路径时，该方法返回该文件所在的目录
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

// 获得上传文件的后缀名
const getSuffixName = fileName => {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

// 定义上传图片的方法
const uploadMethod = (ctx, options) => {
  const req = ctx.req

  let busboy = new Busboy({ headers: req.headers })

  let fileType = options.fileType || 'common'
  let filePath = path.join(options.path, fileType)
  let mkdirResult = mkdirSync(filePath)
  if (mkdirResult) {
    return new Promise((resolve, reject) => {
      console.log('文件上传中...')
      let result = {
        success: false,
        data: {}
      }

      busboy.on('file', (fieldname, file, filename) => {
        let fileName = new Date().getTime() + '.' + getSuffixName(filename)
        let _uploadFilePath = path.join(filePath, fileName)
        let saveTo = path.join(_uploadFilePath)

        file.pipe(fs.createWriteStream(saveTo)) // 先读入再读出来写

        // 文件保存到指定路径
        file.on('end', () => {
          result.data = {
            imageUrl: `http://${ctx.host}/img/${fileType}/${fileName}`
          }
        })
      })

      busboy.on('field', (fieldname, val) => {
        console.log('Field [' + fieldname + ']: value: ' + inspect(val))
      })

      busboy.on('finish', () => {
        result.success = true
        console.log('文件上传成功!')
        resolve(result)
      })

      busboy.on('error', err => {
        console.log('文件上传出错')
        reject(err)
      })

      req.pipe(busboy)
    })
  }
}

const uploadImg = async ctx => {
  let serverFilePath = path.join(__dirname, '../static/img')
  let result = await uploadMethod(ctx, {
    fileType: 'upload',
    path: serverFilePath
  })

  if (result.success === true) {
    ctx.body = {
      msg: '上传成功',
      data: result.data
    }
  } else {
    ctx.body = {
      msg: '上传失败'
    }
  }
}

module.exports = { uploadImg }
