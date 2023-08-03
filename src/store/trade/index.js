import { reqAddressInfo, reqOrderInfo } from "@/api";

export default {
  namespaced: true,
  state: {
    address: [],
    orderInfo: {}
  },
  mutations: {
    GETUSERADRESS(state, address) {
      state.address = address
    },
    GETORDERINFO(state, orderInfo) {
      state.orderInfo = orderInfo
    }
  },
  actions: {
    // 获取用户地址信息
    async getUserAddress(context) {
      let result = await reqAddressInfo()
      if (result.code == 200) {
        context.commit('GETUSERADRESS', result.data)
      }
    },
    async getOrderInfo(context) {
      let result = await reqOrderInfo()
      if (result.code == 200) {
        context.commit('GETORDERINFO', result.data)
      }
    }
  },
  getters: {

  }
}