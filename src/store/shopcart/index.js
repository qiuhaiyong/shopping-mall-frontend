import { reqCartList, reqCheckCart, reqDeleteCart } from "@/api";

export default {
  namespaced: true,
  state: {
    cartList: []
  },
  mutations: {
    GETCARTLIST(state, cartList) {
      state.cartList = cartList
    }
  },
  actions: {
    // 获取购物车列表数据
    async getCartList(context) {
      let result = await reqCartList()
      if (result.code == 200) {
        context.commit('GETCARTLIST', result.data)
      }
    },
    // 删除购物车某一个产品
    async deleteCartListBySkuId(context, skuId) {
      let result = await reqDeleteCart(skuId)
      return new Promise((resolve, reject) => {
        if (result.code == 200) {
          resolve('删除购物车成功')
        }
        else {
          reject('删除购物车失败')
        }
      })
    },
    // 修改购物车某一个产品的选中状态
    async updateCheckedById(context, { skuId, isChecked }) {
      let result = await reqCheckCart(skuId, isChecked)
      return new Promise((resolve, reject) => {
        if (result.code == 200) {
          resolve('更改选中状态成功')
        } else {
          reject('修改选中状态失败')
        }
      })
    },
    // 删除全部勾选的产品
    async deleteAllCheckedCart({ dispatch, getters }) {
      // context：小仓库 有vuex的基本功能
      let promiseAll = []
      getters.cartList.cartInfoList.forEach(item => {
        if (item.isChecked == 1) {
          promiseAll.push(dispatch('deleteCartListBySkuId', item.skuId))
        }
      });
      return Promise.all(promiseAll)
    },

    // 修改全部产品的选中状态
    allChecked({ dispatch, getters }, isChecked) {
      let promiseAll = []
      getters.cartList.cartInfoList.forEach(item => {
        promiseAll.push(dispatch('updateCheckedById', { skuId: item.skuId, isChecked }))
      })
      return Promise.all(promiseAll)
    }
  },
  getters: {
    cartList(state) {
      return state.cartList[0] || {}
    }
  }
}