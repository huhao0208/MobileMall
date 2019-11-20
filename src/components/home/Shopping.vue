<template>
  <div class="body">
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- title -->
    <div class="title">
      <h5>{{shopData.title}}</h5>
      <div class="price">
        市场价 :
        <s>¥{{shopData.market_price }}</s> 销售价 :
        <b>¥{{ shopData.sell_price}}</b>
      </div>
      <div class="num">
        <span>购买数量 :</span>
        <van-stepper v-model="shopNum" integer @change="numChange" :max="shopData.stock_quantity" />
      </div>
      <div>
        <van-button type="info" size="small">立即购买</van-button>

        <van-button type="danger" size="small" @click="addToCar(shopData.id)">加入购物车</van-button>
      </div>
    </div>
    <!-- 参数box -->
    <div class="parameter">
      商品参数
      <van-divider :style="{  borderColor: '#ccc',}" />
      <div>商品货号:{{shopData.goods_no}}</div>
      <div>库存情况:{{shopData.stock_quantity}}件</div>
      <div>上架时间:{{shopData.add_time|formDate}}</div>
      <van-divider :style="{  borderColor: '#ccc',}" />

      <van-button plain type="info" @click="getShopDetail">图文介绍</van-button>
      <van-button plain type="danger" @click="tocomment">商品评论</van-button>
    </div>
    
      <div v-html="detailDate.content" id="con_box"></div>
  
  </div>
</template>
<script>
import { log } from 'util';
export default {
  created() {
    console.log(this.$route.params);
    this.getShopping();
    this.getImg()
  },
  data() {
    return {
      images: [
       
      ],
      id: this.$route.params.id,
      shopData: {},
      shopNum: 1,
      detailDate: [],
     
    };
  },
  methods: {
      async getImg(){
          this.images=[];
          const {data:res} = await this.$http.get('/api/getthumimages/'+this.id);
          console.log(res);
          if(res.status!=0) return this.$toast('获取轮播图片失败')
            res.message.forEach(e=>{
                this.images.push(e.src)
            })
           
      },
    async getShopping() {
      const { data: res } = await this.$http("/api/goods/getinfo/" + this.id);
     // console.log(res);
      if (res.status != 0) return this.$toast("获取商品失败");
      this.shopData = res.message[0];
    },
    // /api/goods/getdesc/
    // 获取商品详情
    async getShopDetail() {
      const { data: res } = await this.$http("/api/goods/getdesc/" + this.id);
    //  console.log(res);
      if (res.status != 0) return this.$toast("获取商品详情失败");
      this.detailDate = res.message[0];
    
      setTimeout(e => {
        //    document.getElementById("con_box").scrollIntoView();
        document.documentElement.scrollTop = 720;
      }, 10);
    },
    //修改商品数量
    numChange() {
      this.shopNum = Number(this.shopNum);
     console.log(this.shopNum);
    },
    // 图文详情
    async detailedInfo() {
      const { data: res } = await this.$http.get("");
    },
    //评论
    tocomment() {
      this.$router.push("/goodscomment/" + this.id);
    },
    // 添加到购物车
    addToCar(id){
     // console.log(id,this.shopNum);
      this.$store.commit("addToCar",{
        id:id,
        num:this.shopNum
      })
    }
  }
};
</script>
<style scoped lang="less">
.body {
  padding: 10px 10px;
  .van-swipe {
    border: 1px solid #ccc;
    .van-swipe-item {
      text-align: center;
      img {
        width: 50%;
      }
    }
  }
  .title {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    h5 {
      margin: 10px 0;
      padding: 0;
      border-bottom: 1px solid #ccc;
    }
    .price {
      s {
        margin-right: 10px;
      }
      b {
        color: red;
      }
    }
    .num {
      margin: 10px 0;
      //   vertical-align: text-bottom;
      span {
        vertical-align: text-top;
        display: inline-block;
        height: 28px;
      }
    }
    .van-stepper {
      line-height: 32px;
      display: inline-block;
    }
    .van-button {
      margin-right: 5px;
    }
  }
  .parameter {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    button {
      width: 100%;
      margin-bottom: 10px;
      border-radius: 8px;
    }
  }
}
// .con_box{
//     /deep/.table{
//          width: 100%;
//          img{
//              width: 100px;
//          }
//     }

// }
</style>
