<template>
  <div>
    <!-- 三级联动全局组件 三级联动已经注册为全局组件，因此不需要引入-->
    <TypeNav />

    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
// 引入其余的组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from 'vuex'
export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed: {
    ...mapState('home', ['floorList'])
  },
  mounted() {
    // 获取floor组件的数据
    this.$store.dispatch('home/getFloorList')
    // 获取用户信息在首页展示
    this.$store.dispatch('user/getUserInfo').then(
      value => {},
      error => {
        console.log(error)
      }
    )
  }
}
</script>

<style></style>
