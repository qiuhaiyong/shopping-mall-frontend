// 配置路由
import Vue from "vue";
import VueRouter from "vue-router";

// 使用插件
Vue.use(VueRouter)


// 引入路由组件
import AddCartSuccess from '@/pages/AddCartSuccess';
import Center from '@/pages/Center';
import Detail from '@/pages/Detail';
import Login from '@/pages/Login';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Register from '@/pages/Register';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import store from '@/store';
// 引入二级路由
import GroupOrder from '@/pages/Center/GroupOrder';
import MyOrder from '@/pages/Center/MyOrder';

// const Home = () => import("@/pages/Home")

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
let router = new VueRouter({
  // 配置路由
  routes: [
    {
      path: "/home",
      component: () => import("@/pages/Home"),
      meta: { showFooter: true }
    },
    {
      name: "search",
      path: "/search/:keyword?",
      component: () => import('@/pages/Search'),
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
    {
      path: '/trade',
      component: Trade,
      beforeEnter: (to, from, next) => {
        // 去交易页面必须从购物车进
        if (from.path == '/shopcart') {
          next()
        } else {
          // 其他路由组件来留在当前
          next(false)
        }
      }
    },
    {
      path: "/pay",
      component: Pay,
      beforeEnter: (to, from, next) => {
        // 去支付页面必须从交易页面来
        if (from.path == '/trade') {
          next()
        } else {
          // 其他路由组件来留在当前
          next(false)
        }
      }
    },
    {
      path: "/paysuccess",
      component: PaySuccess,
      meta: {
        showFooter: true
      },
      beforeEnter: (to, from, next) => {
        if (from.path == '/pay') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/center',
      component: Center,
      meta: {
        showFooter: true
      },
      // 二级路由组件
      children: [
        {
          path: 'myorder',
          component: MyOrder
        },
        {
          path: 'grouporder',
          component: GroupOrder
        },
        {
          path: '/center',
          redirect: '/center/myorder'
        }
      ]
    },
    // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
    {
      path: "/",
      redirect: "/home"
    },
  ],
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 返回的y=0 代表的是滚动条在最上方
    return {
      y: 0
    }
  }
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // next()放行  next(path)放行到指定路由  next(false)返回到from
  // 用户登录了才有token
  let token = localStorage.getItem('token')
  let name = store.state.user.userInfo.name
  if (token) {
    if (to.path === '/login') {
      next('/home')
    } else {
      // 登录了去的不是login
      if (name) {
        next()
      } else {
        try {
          await store.dispatch('user/getUserInfo')
          next()
        } catch (error) {
          // token失效了
          // 清除token
          await store.dispatch('user/UserLogout')
          next('/login')
        }
      }
    }
  } else {
    // 未登录 不能去交易,支付,个人中心
    let toPath = to.path
    if (toPath == '/trade' || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      // 把未登录的时候想去的地方存在路由中
      next('/login?redirect=' + toPath)
    } else {
      next()
    }


  }

})

export default router