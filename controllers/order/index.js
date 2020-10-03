const { mysql } = require('../../mysql')

async function submitAction(ctx) {
  const { goodsId, userId, thumbUrl, allPrice, goodsNumber } = ctx.request.body
  // 取出用户的所有订单
  isOrder = await mysql('auchi_order').where({
    'user_id': userId
  }).select()

  // 如果存在订单
  var date = new Date()
  if (isOrder.length > 0) {
    // 更新订单
    const data = await mysql('auchi_order').where({
      'user_id': userId
    }).update({
      'user_id': userId,
      'goods_id': goodsId,
      'thumb_url': thumbUrl,
      'goods_number': goodsNumber,
      'allprice': allPrice,
      'order_time': Math.floor(date.getTime()/1000)
    })
    if (data) {
      ctx.body = {
        data: true
      }
    } else {
      ctx.body = {
        data: false
      }
    }
  } else { // 不存在订单
    //  插入订单
    const data = await mysql('auchi_order').insert({
      'user_id': userId,
      'goods_id': goodsId,
      'thumb_url': thumbUrl,
      'goods_number': goodsNumber,
      'allprice': allPrice,
      'order_time': Math.floor(date.getTime()/1000)
    })
    if (data) {
      ctx.body = {
        data: true
      }
    } else {
      ctx.body = {
        data: false
      }
    }
  }
}
async function detailAction(ctx) {
  const userId = ctx.query.userId
  // 取出用户的所有订单
  isOrder = await mysql('auchi_order').where({
    'user_id': userId
  }).select()
  const goodsId = isOrder[0].goods_id.split(',')
  const thumbUrl = isOrder[0].thumb_url.split(',')
  const goodsNumber = isOrder[0].goods_number.split(',')
  const allprice = isOrder[0].allprice
  // 如果存在订单
  if (isOrder.length > 0) {
      ctx.body = {
        'goodsId': goodsId,
        'thumbUrl': thumbUrl,
        'goodsNumber': goodsNumber,
        'allprice': allprice
      }
  } else { // 不存在订单
      ctx.body = {
        'goodsId': [],
        'thumbUrl': [],
        'goodsNumber': [],
        'allprice': 0
      }
  }
}
module.exports = {
  submitAction,
  detailAction
}