const Koa = require('koa')
const app = new Koa()

const bodyParser = require('koa-bodyparser')
const config = require('./config')

const cors = require('koa2-cors')
// 具体参数我们在后面进行解释
app.use(cors({
  origin: function (ctx) {
      if (ctx.url === '/xc') {
          return "*"; // 允许来自所有域名请求
      }
      return '101.190.45.246:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))


// 解析请求体
app.use(bodyParser())

const router = require('./routes')
app.use(router.routes())

app.listen(config.port, () => {
  console.log(`server is started at port ${config.port}`)
})