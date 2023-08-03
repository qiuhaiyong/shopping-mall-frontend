// 当前这个模块，：API进行统一管理
import mockRequest from './mockRequest';
import request from "./request";

// 三级联动接口
// /api/product/getBaseCategoryList  get 无参数
export const reqCategoryList = () => {
  // 发送请求 返回的是promis对象
  return request({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}

// 获取banner(Home首页轮播图)
export const reqGetBannerList = () => {
  return mockRequest({
    url: '/banner',
    method: 'get'
  })
}

// 获取floor数据
export const reqFloorList = () => {
  return mockRequest({
    url: '/floor',
    method: 'get'
  })
}

// 获取搜索模块数据
// 请求参数
// {
//   "category3Id": "61",
//   "categoryName": "手机",
//   "keyword": "小米",
//   "order": "1:desc",
//   "pageNo": 1,
//   "pageSize": 10,
//   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//   "trademark": "4:小米"
// }

// 获取商品接口
export const reqGetSearchInfo = (params) => {
  return request({
    url: '/list',
    method: 'post',
    data: params
  })
}

// 获取商品详情信息接口
export const reqGoodsInfo = (skuId) => {
  return request({
    url: `/item/${skuId}`,
    method: 'get'
  })
}

// 将产品添加到购物车中，(或者更新某一个产品的个数)
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return request({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
  })
}

// /cart/cartList 获取购物车列表
export const reqCartList = (skuId, skuNum) => {
  return request({
    url: `/cart/cartList`,
    method: 'get'
  })
}

// 删除购物车商品
// /cart/deleteCart/{skuId}
export const reqDeleteCart = (skuId) => {
  return request({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete"
  })
}

// 改变购物车中商品的选中状态
// /api/cart/checkCart/{skuID}/{isChecked}
// 0代表取消选中
// 1代表选中

export const reqCheckCart = (skuId, isChecked) => {
  return request({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
  })
}

// 获取验证码
// /api/user/passport/sendCode/{phone}
// get
export const reqGetCode = phone => {
  return request({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
  })
}

// 用户注册
// /api/user/passport/register
export const reqRegister = (data) => {
  return request({
    url: '/user/passport/register',
    method: 'post',
    data
  })
}

// 登录
// /api/user/passport/login

export const reqUserLogin = (data) => {
  return request({
    url: '/user/passport/login',
    method: 'post',
    data
  })
}

// 获取用户信息
// /api/user/passport/auth/getUserInfo
export const reqGetUserInfo = () => {
  return request({
    url: '/user/passport/auth/getUserInfo',
    method: 'get',
  })
}

// 推出登录
// /api/user/passport/logout
export const reqLogout = () => {
  return request({
    url: '/user/passport/logout',
    method: 'get',
  })
}

// 获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () => {
  return request({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get',
  })
}

// 获取交易页商品信息
// /api/order/auth/trade
export const reqOrderInfo = () => {
  return request({
    url: '/order/auth/trade',
    method: 'get',
  })
}

// 提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}
// {
//   "consignee": "admin",
//   "consigneeTel": "15011111111",
//   "deliveryAddress": "北京市昌平区2",
//   "paymentWay": "ONLINE",
//   "orderComment": "xxx",
//   "orderDetailList": [
//       {
//           "id": null,
//           "orderId": null,
//           "skuId": 6,
//           "skuName": " Apple iPhone 11 (A2223) 128GB 红色 移动联通电信22",
//           "imgUrl": "http://182.92.128.115:8080//rBFUDF6V0JmAG9XGAAGL4LZv5fQ163.png",
//           "orderPrice": 4343,
//           "skuNum": 2,
//           "hasStock": null
//       },
// post请求
export const reqSubmitOrder = (data, tradeNo) => {
  return request({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'post',
    data
  })
}

// 获取订单支付信息
// /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => {
  return request({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
  })
}

// 查询支付状态
// /api/payment/weixin/queryPayStatus/{orderId}
export const reqQueryPayStatus = orderId => {
  return request({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
  })
}

// 查询我的订单列表
// /api/order/auth/{page}/{limit}
export const reqMyOrderList = (pageNo, pageSize) => {
  return request({
    url: `/order/auth/${pageNo}/${pageSize}`,
    method: 'get'
  })
}
