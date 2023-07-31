import { reqGoodsInfo } from "@/api"
export default {
  namespaced: true,
  state: {
    goodInfo: {}
  },
  mutations: {
    GETGOODINFO(state, goodInfo) {
      state.goodInfo = goodInfo
    }
  },
  actions: {
    // 获取产品信息的action
    async getGoodInfo(context, skuId) {
      const result = await reqGoodsInfo(skuId)
      if (result.code === 200) {
        context.commit('GETGOODINFO', result.data)
      }
    }
  },
  getters: {
    categoryView(state) {
      return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
      return state.goodInfo.skuInfo || {}
    }
  }
}