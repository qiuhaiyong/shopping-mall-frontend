// 当前这个模块，：API进行统一管理
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