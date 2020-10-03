const router = require('koa-router')({
  prefix: '/xc'
})
const controllers = require('../controllers/index')

// 首页相关的接口
router.get('/index/index', controllers.home.index.index)


// 分类相关的接口
router.get('/category/currentaction', controllers.category.index.currentAction)

// 注册相关的接口.
router.get('/login/index', controllers.login.index.index)
router.post('/login/registration', controllers.login.index.registration)
router.post('/login/login', controllers.login.index.login)

// // 搜索相关的接口
// router.get('/search/indexaction', controllers.search.index.indexAction)
// router.post('/search/addhistoryaction', controllers.search.index.addHistoryAction)
// router.post('/search/clearhistoryAction', controllers.search.index.clearHistoryAction) // 清除搜索历史
// router.get('/search/helperaction', controllers.search.index.helperAction) // 搜索提示

// 商品
router.get('/goods/detailaction', controllers.goods.index.detailAction)


// 收藏相关的接口
router.post('/goods/collection', controllers.goods.index.collection)


// 订单相关的接口
router.post('/order/submitAction', controllers.order.index.submitAction)
router.get('/order/detailAction', controllers.order.index.detailAction)


// 购物车相关的接口
router.post('/cart/addCart', controllers.cart.index.addCart)
router.post('/cart/removeCart', controllers.cart.index.removeCart)
router.post('/cart/removeAll', controllers.cart.index.removeAll)
router.get('/cart/cartList', controllers.cart.index.cartList)


// 收货地址相关的接口
router.get('/address/getListAction', controllers.address.index.getListAction)
router.get('/address/detailAction', controllers.address.index.detailAction)
router.post('/address/saveAction', controllers.address.index.saveAction)
router.post('/address/deleteAction', controllers.address.index.deleteAction)

module.exports = router