const { mysql } = require('../../mysql')

// 点击左侧菜单获取的分类商品
async function detailAction(ctx) {
  // 货物信息
  const goodsId = ctx.query.goodsId
  const userId = ctx.query.userId
  const info = await mysql('auchi_goods').where({
    'goods_id':goodsId
  }).select()

  // 判断是否收藏过
  const iscollect = await mysql('auchi_collect').where({
    'user_id': userId,
    'value_id': goodsId
  }).select()
  let collected = false
  if (iscollect.length > 0) {
    collected = true
  }

  // 判断是否在购物车
  const inCart = await mysql('auchi_cart').where({
    'user_id': userId,
    'goods_id': goodsId
  }).select()
  let number = 0
  if (inCart.length > 0) {
    number = inCart[0].number
  }
  ctx.body = {
    'info': info,
    'collected': collected,
    'number': number
  }
}

// 收藏
async function collection(ctx) {
  const { goodsId, userId } = ctx.request.body
  const iscollect = await mysql('auchi_collect').
  where({
    'user_id': userId,
    'value_id': goodsId
  }).select()
  var date = new Date()
  if (iscollect.length == 0) {
    await mysql('auchi_collect').insert({
      'user_id': userId,
      'value_id': goodsId,
      'add_time': Math.floor(date.getTime()/1000)
    })
    ctx.body = {
      data: "收藏成功"
    }
  } else {
    await mysql('auchi_collect').where({
      'user_id': userId,
      'value_id': goodsId
    }).del()
    ctx.body = {
      data: "取消收藏"
    }
  }
}

module.exports = {
  detailAction,
  collection
}