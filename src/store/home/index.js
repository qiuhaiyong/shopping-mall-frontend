import { reqCategoryList, reqFloorList, reqGetBannerList } from '@/api';
export default {
  namespaced: true,
  state: {
    // state中默认初始值别瞎写，服务器返回对象就写对象，返回数组就写数组
    categoryList: [],
    bannerList: [],
    floorList: []
  },
  mutations: {
    CATEGORYLIST(state, categoryList) {
      // 懒得看样式了 去掉一个分类
      categoryList.pop()
      state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
      state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
      state.floorList = floorList
    }
  },
  actions: {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList(context) {
      let result = await reqCategoryList()

      // console.log(result);
      if (result.code === 200) {
        context.commit('CATEGORYLIST', result.data)
      }
    },
    async getBannerList(context) {
      const result = await reqGetBannerList()
      if (result.code === 200) {
        context.commit('GETBANNERLIST', result.data)
      }
    },
    async getFloorList(context) {
      const result = await reqFloorList()
      if (result.code === 200) {
        context.commit('GETFLOORLIST', result.data)
      }
    }
  },
  getters: {

  }
}