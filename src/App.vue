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
  }
}
</script>

<style></style>
