import { reqGetSearchInfo } from "@/api";
export default {
  namespaced: true,
  state: {
    searchList: {}
  },
  mutations: {
    GETSEARCHINFO(state, searchList) {
      state.searchList = searchList
    }
  },
  actions: {
    async getSearchList(context, value) {
      const result = await reqGetSearchInfo(value)
      if (result.code === 200) {
        context.commit('GETSEARCHINFO', result.data)
      }
    }
  },
  // 计算属性,在项目中,是为了简化仓库数据而生
  // 可以把我们将来组件要用的数据简化一下
  getters: {
    goodsList(state) {
      // 如果服务器数据回来了,是一个数组
      // 如果没网络或者网络不给力,则返回一个空数组,不然会返回一个undifined.
      return state.searchList.goodsList || []
    },
    trademarkList(state) {
      return state.searchList.trademarkList || []
    },
    attrsList(state) {
      return state.searchList.attrsList || []
    }

  }
}