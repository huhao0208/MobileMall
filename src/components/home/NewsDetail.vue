<template>
  <div>
    <van-loading size="44px" vertical v-if="isLoading">加载中...</van-loading>
    <div v-show="!isLoading" class="newsdetail">
      <!-- 文章区域 -->
      <h3>{{info.title}}</h3>
      <div class="subt">
        <span>发布时间:{{info.add_time |formDate}}</span>
        <span style="float:rigth">点击次数:{{info.click }}</span>
      </div>

      <div v-html="info.content"></div>
      <!-- 评论区域 -->
     
      <my-comment :id="this.$route.params.id"></my-comment>
    </div>
  </div>
</template>
<script>
import Comment from '../Comment.vue'   // 评论组件

export default {
components:{"my-comment":Comment},
  created() {
    this.getdetail();
  },
  data() {
    return {
      isLoading: false,
      id: this.$route.params.id,
      info: {}
    };
  },
  methods: {
    async getdetail() {
     
      const { data: res } = await this.$http.get("/api/getnew/" + this.id);
      console.log(res);
      if (res.status != 0) return;
      this.isLoading = false;
      this.info = res.message[0];
    }
  },
  
};
</script>
<style scoped lang="less">
.van-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.newsdetail {
  padding: 0 10px ;
  h3 {
    color: skyblue;
    text-align: center;
  }
  .subt {
    color: skyblue;
    display: flex;
    justify-content: space-between;
  }
}
</style>