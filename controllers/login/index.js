const { mysql } = require('../../mysql')
const jwt = require('jsonwebtoken')

async function index(ctx) {
  const username = ctx.query.registerUserName

  let isRegistered = false
  let userDetail = []
  if (username) {
    userDetail = await mysql('auchi_user').where({
      'username': username
    }).select()
    if (userDetail.length != 0) {
      isRegistered = true
    }
  }
  ctx.body = {
    'isRegistered': isRegistered,
    'userDetail': userDetail
  }
}
// 登录
async function login(ctx) {
  const { username, password } = ctx.request.body

  // 查询新用户数据
  let userDetail = {}
  if (username) {
    userDetail = await mysql('auchi_user').where({
      'username': username
    }).select()
  }

  if (userDetail[0].password == password) {
    ctx.body = {
      data: {
        'userDetail': userDetail
      },
      message: '登录成功'
    }
  }else {
    ctx.body = {
      data: '身份验证失败'
    }
  }

  
}
// 注册
async function registration(ctx) {
  const { username, password } = ctx.request.body
  var content = {
    "username": username,
    "password": password
  }
  //生成token
  const token = jwt.sign(
    content, //需要放到token的参数
    'xuchi'//随便一点内容，加密的密文，私钥对应着公钥
  )
  // 插入新用户数据
  await mysql('auchi_user').insert({
    'username': username,
    'password': password,
    'h5_token': token
  })

  // 查询新用户数据
  let userDetail = {}
  if (username) {
    userDetail = await mysql('auchi_user').where({
      'username': username
    }).select()
  }
  ctx.body = {
    data: {
      'userDetail': userDetail
    },
    message: '注册成功'
  }
}
module.exports = {
  index,
  registration,
  login
}