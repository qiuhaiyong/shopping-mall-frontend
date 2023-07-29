<template>
  <div id="app">
    <Header />
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- Footer 在Home或者Serach显示, 在登录或注册时隐藏 -->
    <Footer v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
// 引入
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 派发一个action（获取商品分类的三级列表的数据）
    this.$store.dispatch('home/categoryList')
  }
}
</script>

<style></style>
