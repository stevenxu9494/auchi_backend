const { mysql } = require('../../mysql')

async function index(ctx) {
  // 轮播图数据
  const banner = await mysql('auchi_banner').select()

  // // tab类型
  // const channel = await mysql('nideshop_channel').select()

  // 品牌列表
  // const brandList = await mysql('auchi_goods').where({
  //   is_new: 1
  // }).orderBy('new_sort_order', 'asc').limit(4).select()

  // // 新品首发
  // const newGoods = await mysql('nideshop_goods').whereIn('id', [1181000, 1135002, 1134030, 1134032]).andWhere('is_new', 1).select()

  // // 人气推荐
  // const hotGoods = await mysql('nideshop_goods').column('id', 'name', 'list_pic_url', 'retail_price', 'goods_brief').where({
  //   is_hot: 1
  // }).limit(5).select()

  // // 专题精选
  // const topicList = await mysql('nideshop_topic').limit(3).select()

  // 类别列表 **好物
  const categoryList = await mysql('auchi_category').select()
  const newCategoryList = []

  for (let i = 0; i < categoryList.length;i++) {
    let item = categoryList[i]
    newCategoryList.push({
      'id': item.id,
      'name': item.category_name
    })
  }

  const category = ctx.query.activeName
  let goodsList = []
  if (category) {
    goodsList = await mysql('auchi_goods').where({
      'category': category
    }).limit(6).select()
  }
  ctx.body = {
    'banner': banner,
    // 'channel': channel,
    // 'brandList': brandList,
    // 'newGoods': newGoods,
    // 'hotGoods': hotGoods,
    // 'topicList': topicList,
    'newCategoryList': newCategoryList,
    'goodsList': goodsList
  }
}

module.exports = {
  // detailAction,
  index
}