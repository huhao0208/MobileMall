<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-card
        v-for="item in newsList"
        :key="item.id"
        :title="item.title"
        :thumb="item.img_url"
        @click="todetail(item.id)"
      >
        <template slot="price">发布时间:{{item.add_time |formDate}}</template>
        <template slot="num">点击了{{item.click}}次</template>
      </van-card>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  created() {
    this.getNews();
  },
  data() {
    return {
      newsList: [],

      isLoading: false
    };
  },
  methods: {
    async getNews() {
      const { data: res } = await this.$http.get("/api/getnewslist");
      console.log(res);
      if (res.status != 0) return;
      this.newsList = res.message;
      // this.isLoading = false;
    },
    todetail(id) {
      console.log(id);
      
     this.$router.push({path:"/newslist/newsdetail/" + id});
    },
    onRefresh() {
      setTimeout(() => {
        this.getNews();
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    }
  }
};
</script>
<style scoped lang="less">


</style>