import Vue from "vue";
import Vuex from "vuex";

// 使用插件
Vue.use(Vuex)

// state:仓库存储数据的地方
// mutations:修改state的唯一手段；
// action:处理action，可以书写自己的业务逻辑，也可以处理异步
// getters:可以理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便

import detail from './detail';
import home from './home';
import search from "./search";
import shopcart from "./shopcart";

// 对外暴露Store类的一个实例
export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopcart
  }
});