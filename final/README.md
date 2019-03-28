# final-test

> A Vue.js project
> 毕业设计
> 作者：韦存航（AFine970）

## Build Setup

```bash
确保安装了MongoDB，已启动MongoDB服务，cd 进入主目录

# 挂起mongodb服务
mongod --dbpath '/xxxxx' (指的是mongodb创建得data文件夹路径)

# install dependencies
npm install

# 启动后台
npm run server

# 启动项目
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

```

```bash
主要结构目录：
# server 后端
# --controller 服务器各个接口方法
# --db 启动服务器，定义表格
# --middleware token验证拦截中间件
# --route 后端路由
# --static 存储上传图片
# -server.js 配置服务

# src 前端
# --assets 自己添加的资源
# --componets 通用组件
# --router 主路由
# --store VUEX
# --views 各个页面组件
#   --manager 管理员
#   --shop 商家
#   --user 用户
# Api.js 后端接口的前端路由
```

> mongoDB 版本：v3.0.15
