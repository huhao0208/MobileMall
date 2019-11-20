<template>
  <div>
    <div v-if="carDatas.length==0" class="emptyBox" @click="toshopP">
      购物车空空如也,不如去逛逛.........
    </div>
     <template v-if="carDatas.length!=0">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 此处v-for -->
     
      <van-swipe-cell
        :on-close="onClose"
        v-for="(item,i) in carDatas"
        :key="item.id"
        :name="item.id"
      >
        <van-card
          :num="StoreData[i].num"
          :price="item.sell_price"
          :title="item.title"
          :thumb="item.thumb_path"
        >
          <div slot="footer">
            <van-stepper v-model="StoreData[i].num" integer />
          </div>
        </van-card>

        <template slot="right">
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
     
    </van-pull-refresh>
 </template>
    <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  created() {
    this.getCarData();
  },
  mounted() {},
  data() {
    return {
      isLoading: false,
      StoreData: this.$store.state.cardatas, // 传递过来的
      carDatas: [] //根据id获取到的
      // totalPrice: 0
    };
  },
  computed: {
    //总价
    totalPrice() {
      let t = 0;
      this.carDatas.forEach((e, i) => {
        t += this.StoreData[i].num * e.sell_price;
      });
      // this.totalPrice = t * 100;
      console.log(this.StoreData);
      // 这里 将数据存stroe
      this.changeCar();
      return t * 100;
    },
    //需要获取的商品数组
    arr() {
      let ss = [];
      this.$store.state.cardatas.forEach(e => {
        ss.push(e.id);
      });
      return ss;
    }
  },

  methods: {
    changeCar() {
      this.$store.commit("changeCar", this.StoreData);
    },
    // clickPosition 表示关闭时点击的位置
    onClose(clickPosition, instance, detail) {
      switch (clickPosition) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          Dialog.confirm({
            message: "确定删除吗？"
          }).then(() => {
            // 获取要删除的id
            console.log(detail.name);

            instance.close();
          });
          break;
      }
    },
    // 下拉刷新
    onRefresh() {
      this.getCarData(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      });
    },
    async getCarData(sx) {
      if (this.arr.length == 0) return;
      const { data: res } = await this.$http.get(
        "/api/goods/getshopcarlist/" + this.arr
      );
      console.log(res);
      if (res.status != 0 || res.message.length == 0) return;
      this.carDatas = res.message;
        sx&&sx()
    },
    // 提交订单
    onSubmit() {},
    toshopP(){
      console.log(1111);
      this.$router.push('/buy')
      
    }
  }
};
</script>
<style scoped lang="less">
</style>
<style lang="less">
.van-swipe-cell__right {
  .van-button {
    height: 100%;
    // top: 50%;
    // transform: translateY(-50%);
  }
}
.van-pull-refresh {
  overflow: visible;
}
.van-submit-bar {
  z-index: 99999 !important;
}
.emptyBox{
  text-align: center;
  line-height: 180px;
}
</style>