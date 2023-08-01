// 配置路由
import Vue from "vue";
import VueRouter from "vue-router";

// 使用插件
Vue.use(VueRouter)


// 引入路由组件
import AddCartSuccess from '@/pages/AddCartSuccess';
import Detail from '@/pages/Detail';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import ShopCart from '@/pages/ShopCart';
// console.log(VueRouter);
// 先把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push | replace
// 第一个参数:告诉原来push方法,你往哪里跳转
// 第二个参数:成功的回调
// 第三个参数:失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    // call || applay区别:
    // 相同点: 都可以调用函数一次,都可以篡改函数的上下文一次
    // 不同点:call与apply传递参数:call传递参数用逗号隔开,applay方法执行传递数组
    originPush.call(this, location, resolve, reject)
  } else {
    // originPush(this, location, (successful) => { }, (error) => { })
    originPush.call(this, location, (successful) => { }, (error) => { })
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, (successful) => { }, (error) => { })
  }
}

// 配置路由
export default new VueRouter({
  // 配置路由
  routes: [
    {
      path: "/home",
      component: Home,
      meta: { showFooter: true }
    },
    {
      name: "search",
      path: "/search/:keyword?",
      component: Search,
      meta: { showFooter: true },
      // props属性
      // 方式1 布尔值写法:只能传递params参数
      // props: true
      // 方式2 props值为对象:而外给路由组件传递一些props
      // props: {
      //   a: 1,
      //   b: 2
      // }
      // 方式3 函数写法: 可以传递params参数 query参数,通过props传递给路由的组件
      props: ($route) => {
        return {
          keyword: $route.params.keyword,
        }
      }
    },
    {
      path: "/login",
      component: Login,
      meta: { showFooter: false }
    },
    {
      path: "/register",
      component: Register,
      meta: { showFooter: false }
    },
    {
      path: "/detail/:skuId",
      component: Detail,
      meta: { showFooter: false }
    },
    {
      path: '/addcartsuccess/:skuNum',
      name: 'addcartsuccess',
      component: AddCartSuccess
    },
    {
      path: '/shopcart',
      name: "shopcart",
      component: ShopCart
    },
    // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
    {
      path: "/",
      redirect: "/home"
    }
  ],
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 返回的y=0 代表的是滚动条在最上方
    return {
      y: 0
    }
  }
})