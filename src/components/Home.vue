<template>
  <div>
    <!-- 页面头部 -->
    <van-nav-bar
      title="手机版商城"
      :left-text="isHome?'':'返回'"
      :left-arrow="!isHome"
      @click-left="onClickLeft"
    />

    <!-- 页面内容区域 -->
    <main>
      <transition model="out-in">
        <router-view :key="Math.random()"></router-view>
      </transition>
    </main>

    <!-- 页面底部 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item :icon="active?index.active:index.inactive" to="/index">首页</van-tabbar-item>
      <van-tabbar-item icon="gem-o" to="/vip">会员</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/shopCar" :info="num">购物车</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search" >搜索{{mm}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mm:this.$store.getters.totalnum,
      active: null,
      index: {
        active: "home-o",
        inactive: "wap-home"
      }
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  computed: {
   
    num() {
      return 
    },
    isHome: function() {
      //   console.log(this.$route);

      switch (this.$route.path) {
        case "/index":
          this.active = 0;
          break;
        case "/vip":
          this.active = 1;
          break;
        case "/shopCar":
          this.active = 2;
          break;
        case "/search":
          this.active = 3;
          break;
        default:
          this.active = null;
      }
      return this.$route.path == "/index";
    }
  }
};
</script>
<style scoped lang="less">
.van-nav-bar {
  background: blue;
  .van-ellipsis {
    color: #fff;
  }
}
.van-tabbar {
  z-index: 9999 !important;
}
main {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  .v-enter {
    transform: translateX(100%);
  }
  .v-enter-to {
    transform: translateX(0);
  }
  .v-enter-active {
    transition: transform 0.4s ease 0.1s;
  }
  .v-leave {
    opacity: 1;
  }
  .v-leave-to {
    opacity: 0.5;
  }
  .v-leave-active {
    transition: opacity 0.2s;
  }
}
</style>