import Vue from 'vue';
import App from './App.vue';

// 1.三级联动组件---全局组件
import TypeNav from '@/components/TypeNav';
// 第一个参数：全局组件的名字  第二个参数：哪一个组件
// console.log('---');
// console.log(TypeNav);
Vue.component(TypeNav.name, TypeNav)

import Carousel from '@/components/Carousel';
Vue.component(Carousel.name, Carousel)

import Pagination from '@/components/Pagination';
Vue.component(Pagination.name, Pagination)

import { Button, MessageBox, Select } from 'element-ui';
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 2.路由
import router from '@/router';

// 3.vuex
import store from './store';

// 4.引入MockServer.js
import '@/mock/mockServe';

// 5.引入swiper样式
import 'swiper/css/swiper.css';

// 6.同意api文件夹里全部请求函数
import * as API from '@/api';

// 7.图片懒加载
import loadimage from '@/assets/logo.png';
import VueLazyload from 'vue-lazyload';
// or with options
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: loadimage,

})


Vue.config.productionTip = false
const vue = new Vue({
  render: h => h(App),
  beforeCreate() {
    // 配置全局事件总线$bus
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route和$router
  router,
  // 注册仓库(vuex)
  // 组件实例的身上会多一个属性$store属性
  store
}).$mount('#app')

// console.log(vue);
