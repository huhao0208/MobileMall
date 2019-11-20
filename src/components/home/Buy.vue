<template>
  <div>
    <!-- 上拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 下拉加载 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="10"
      >
        <van-grid :column-num="2" :gutter="10" ref="scrollpage">
          <van-grid-item
            v-for="item in shopList"
            :key="item.id"
            @click="toshopdetail(item.id)"
            class="border"
          >
            <div class="img">
              <img :src="item.img_url?item.img_url :'https://img.yzcdn.cn/vant/cat.jpeg'" alt />
            </div>

            <div class="hdbox">
              <h5>{{item.title}}</h5>
              <div class="ftbox">
                <div>
                  ¥{{item.sell_price}}
                  <s>{{item.market_price}}</s>
                </div>
                <span>热卖中</span>
                <span class="num">剩{{item.stock_quantity}}件</span>
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  created() {
    this.getShops();
  },
  mounted() {},
  data() {
    return {
      pageindex: 1,
      shopList: [],
      isLoading: false,
      error: false,
      loading: false,
      finished: false
    };
  },
  methods: {
    async getShops() {
      const { data: res } = await this.$http.get(
        "api/getgoods?pageindex=" + this.pageindex
      );
      console.log(res);
      if (res.status != 0) return this.$toast("获取商品列表失败");
      // 加载状态结束
      this.loading = false;
      if (res.message.length == 0) {
        // 数据全部加载完成
        this.finished = true;
      }
      this.pageindex == 1
        ? (this.shopList = res.message)
        : this.shopList.push(...res.message);
    },
    toshopdetail(id) {
      this.$router.push("/shopping/" + id);
    },
    // 上拉刷新
    onRefresh() {
      this.pageindex = 1;
      this.getShops();
      this.isLoading = false;
    },
    onLoad() {
      this.pageindex++;
      this.getShops();
    }
  }
};
</script>
<style scoped lang="less">
.van-grid {
  .border > div {
    border: 1px solid #ccc;
  }
}
.img {
  width: 100%;
  text-align: center;
  img {
    width: 40%;
  }
}
.hdbox {
  width: 100%;
  h5 {
    line-height: 25px;
    height: 50px;
    margin: 0;
    padding: 0 10px;
  }
  .ftbox {
    width: 100%;
    padding: 0 10px;
    background: rgba(0, 0, 0, 0.2);
  }
}
/deep/.van-grid-item__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
}
/deep/.van-grid-item__content--surround::after {
  border: 1px solid #aaa;
}
</style>