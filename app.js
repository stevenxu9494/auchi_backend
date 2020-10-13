const Koa = require('koa')
const app = new Koa()

const bodyParser = require('koa-bodyparser')
const config = require('./config')

// cors 解决跨域问题
const cors = require('koa2-cors')
// 1. 阿里云不需要加请求头
app.use(cors())
// 2. 本地访问需要加请求头
// app.use(cors({
//   origin: function (ctx) {
//       if (ctx.url === '/xc') {
//           return "*"; // 允许来自所有域名请求
//       }
//       return 'http://localhost:8080'; 
//   },
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   maxAge: 5,
//   credentials: true,
//   allowMethods: ['GET', 'POST', 'DELETE'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }))
// 解析请求体
app.use(bodyParser())

const router = require('./routes')
app.use(router.routes())

app.listen(config.port, () => {
  console.log(`server is started at port ${config.port}`)
})