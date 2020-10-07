const Koa = require('koa')
const app = new Koa()

const bodyParser = require('koa-bodyparser')
const config = require('./config')

const cors = require('koa2-cors')
// 具体参数我们在后面进行解释
app.use(cors())


// 解析请求体
app.use(bodyParser())

const router = require('./routes')
app.use(router.routes())

app.listen(config.port, () => {
  console.log(`server is started at port ${config.port}`)
})