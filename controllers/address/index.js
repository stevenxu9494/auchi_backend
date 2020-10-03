const { mysql } = require('../../mysql')


// 获取收货地址列表
async function getListAction(ctx) {
  const userId = ctx.query.userId
  const addressList = await mysql('auchi_address').where({
    'user_id': userId
  }).orderBy('is_default', 'desc').select()
  ctx.body = {
    data: addressList
  }
}

// 获取详细地址
async function detailAction(ctx) {
  const id = ctx.query.id
  const detailData = await mysql('auchi_address').where({
    'address_id': id
  }).select()
  ctx.body = {
    data: detailData[0]
  }
}

// 添加或更新收货地址
async function saveAction(ctx) {
  const { content, userId } = ctx.request.body
  // 是否默认地址
  const checked = content.isDefault.toLowerCase() === 'true';
  // 如果是默认选中，先在数据库中查询是否是默认地址
  if (checked) {
    const isDefault = await mysql('auchi_address').where({
      'user_id': userId,
      'is_default': 1
    }).select()
    // 存在默认地址把原来的默认地址改为非默认
    if (isDefault.length > 0) {
      await mysql('auchi_address').where({
        'user_id': userId,
        'is_default': 1
      }).update({
        // 全部默认改为非默认
        'is_default': 0
      })
    }
  }
  // 是否存在地址
  const hasAddress = await mysql('auchi_address').where({
    'user_id': userId,
    'id': content.id
  }).select()
  // 没有addressId即为添加地址
  if (hasAddress.length == 0) {
    // 添加地址
    const data = await mysql('auchi_address').insert({
      name: content.name,
      mobile: content.tel,
      country: content.country,
      province: content.province,
      city: content.city,
      county: content.county,
      area_code: content.areaCode,
      postal_code: content.postalCode,
      address: content.address,
      address_id: content.id,
      address_detail: content.addressDetail,
      user_id: userId,
      is_default: checked == 'true' || checked ? 1 : 0
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
  } else {
    // 更新地址
    const data = await mysql('auchi_address').where({
      'id': content.id
    }).update({
      name: content.name,
      mobile: content.tel,
      country: content.country,
      province: content.province,
      city: content.city,
      county: content.county,
      area_code: content.areaCode,
      postal_code: content.postalCode,
      address: content.address,
      address_detail: content.addressDetail,
      user_id: userId,
      is_default: checked == 'true' || checked ? 1 : 0
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

// 移出购物车
async function deleteAction(ctx) {
  // 货物/用户信息
  let { addressId, userId} = ctx.request.body

  // 判断购物车是否包含此数据
  const haveAddress = await mysql('auchi_address').where({
    'user_id': userId,
    'id': addressId
  }).select()
  if (haveAddress.length === 0) { 
    // 如果不存在
    return false
  } else {
    // 删除数据
    await mysql('auchi_address').where({
      'user_id': userId,
      'id': addressId
    }).del()
  }
  ctx.body = {
    data: 'success'
  }
}

module.exports = {
  getListAction,
  detailAction,
  saveAction,
  deleteAction
}