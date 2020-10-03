const { mysql } = require('../../mysql')

// 点击左侧菜单获取的分类商品
async function currentAction(ctx) {
  // const { id: categoryId } = ctx.query

  // const data =  {}
  // const currentOne = await mysql('nideshop_category').where({
  //   'id': categoryId
  // }).select()
  // const subList = await mysql('nideshop_category').where({
  //   'parent_id': currentOne[0].id
  // }).select()
  // data.currentOne = currentOne[0]
  // data.currentOne.subList = subList
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
    }).select()
  }

  ctx.body = {
    'category': newCategoryList,
    'goodsList': goodsList
  }
}

module.exports = {
  currentAction
}