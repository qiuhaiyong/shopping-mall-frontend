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

export const reqGetSearchInfo = (params) => {
  return request({
    url: '/list',
    method: 'post',
    data: params
  })
}