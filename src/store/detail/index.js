import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api"
// 封装临时游客身份模块，一个随机字符串不能再变了
import { getUUID } from "@/utils"
export default {
  namespaced: true,
  state: {
    goodInfo: {},
    // 游客临时身份
    uuid_token: getUUID()

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
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart(context, { skuId, skuNum }) {
      let result = await reqAddOrUpdateShopCart(skuId, skuNum)
      // 因为服务器中没有返回数据，所以不需要存储到仓库中
      return new Promise((resolve, reject) => {
        if (result.ok) {
          resolve('成功')
        } else {
          reject('失败')
        }
      })
    }
  },
  getters: {
    categoryView(state) {
      return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
      return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
      return state.goodInfo.spuSaleAttrList || []
    }
  }
}