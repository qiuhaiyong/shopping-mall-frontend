<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="leaveIndex()" @mouseenter="enterShow">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId" :class="{ cur: currentIndex == index }">
              <h3 @mouseenter="changeIndex(index)">
                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
              </h3>
              <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                      <!-- <router-link to="/search">{{ c2.categoryName }}</router-link> -->
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                        <!-- <router-link to="/search">{{ c3.categoryName }}</router-link> -->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// 这种引入方式是把lodash全部功能函数引入
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data() {
    return {
      // 存储用户鼠标移动到哪一个以及分类
      currentIndex: -1,
      show: true
    }
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性
    // throttle回调函数别用箭头函数，可能出现上下文问题
    changeIndex: throttle(function (index) {
      //index:鼠标移上某一个一级分类的索引值
      // 正常情况(用户慢慢的操作):鼠标进入,每一个以及分类h3,都会触发鼠标进入时间
      // 非正常操作(用户操作很快):本身全部的以及分类都应该触发鼠标进入时间,但是经过测试,只有部分触发了
      // 就是由于用户型位过快，导致浏览器反应不过来。如果当前回调函数有一些大量业务，有可能出现卡顿现象

      this.currentIndex = index
    }, 50),
    // 一级分类鼠标移除的回调
    leaveIndex() {
      // 背景颜色
      this.currentIndex = -1

      // 当鼠标离开的时候，让商品分类列表进行隐藏,但是home首页的不能隐藏
      if (this.$route.path !== '/home') {
        this.show = false
      }
    },

    // 进行路由跳转的方法
    goSearch(event) {
      // 最好的方式是 使用编程式导航集合事件的委派
      // 利用事件委派存在的一些问题 1.如何确定点击的是哪个标签 ，如何获取数据
      // 使用自定义属性
      // 节点有一个dataset属性可以获取到自定义数值与属性值
      let { categoryname, category1id, category2id, category3id } = event.target.dataset
      if (categoryname) {
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }
        location.query = query
        // 判断：如果路由跳转得到时候，带有prams参数，捎带脚传过去
        if (this.$route.params) {
          location.params = this.$route.params
        }
        this.$router.push(location)
      }
    },

    // 当鼠标移入的时候，让商品列表进行展示
    enterShow() {
      this.show = true
    }
  },
  computed: {
    ...mapState('home', ['categoryList'])
  },
  // 组件挂在完毕：可以向服务器发请求获取数据
  mounted() {
    // 进入search组件 隐藏商品分类
    if (this.$route.path !== '/home') {
      this.show = false
    }
  }
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }

    // 进入的开始状态
    .sort-enter {
      height: 0;
    }

    // 进入的结束状态
    .sort-enter-to {
      height: 461px;
    }

    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
