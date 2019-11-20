<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image.img_url" />
      </van-swipe-item>
    </van-swipe>
    <!-- 内容区 -->
    <van-grid :border="false" :column-num="3">
      <van-grid-item to="/newslist">
        <img src="../assets/images/menu1.png" alt="">
        <p>新闻资讯</p>
      </van-grid-item>
      <van-grid-item to="/photoshar">
        <img src="../assets/images/menu2.png" alt="">
        <p>图片分享</p>
      </van-grid-item>
      <van-grid-item to="/buy">
        <img src="../assets/images/menu3.png" alt="">
        <p>商品购买</p>
      </van-grid-item>
      <van-grid-item to="/feedback">
        <img src="../assets/images/menu4.png" alt="">
        <p>留言反馈</p>
      </van-grid-item>
      <van-grid-item to="video">
        <img src="../assets/images/menu5.png" alt="">
        <p>视频专区</p>
      </van-grid-item>
      <van-grid-item to="contact">
        <img src="../assets/images/menu6.png" alt="">
        <p>联系我们</p>
      </van-grid-item>
    </van-grid>

  </div>
</template>
<script>
export default {
  created() {
    // 获取轮播图
    this.getImg();
  },
  data() {
    return {
      images: [],
    //   dataList: [
    //     {id:1, path: "../../assets/images/menu1.png", p: "新闻资讯" },
    //     {id:2, path: "../assets/images/menu2.png", p: "图片分享" },
    //     {id:3, path: "../assets/images/menu3.png", p: "商品购买" },
    //     {id:4, path: "../assets/images/menu4.png", p: "优惠券" },
    //     {id:5, path: "../assets/images/menu5.png", p: "地图" },
    //     {id:6, path: "../assets/images/menu6.png", p: "表单验证" }
    //   ]
    };
  },
  methods: {
    async getImg() {
      const { data: res } = await this.$http.get("/api/getnewslist");
    //  console.log(res);
      if (res.status != 0)
        return this.$notify({ type: "warning", message: "获取轮播图片失败" });
     // this.$notify({ type: "success", message: "获取轮播图片成功" });
      this.images = res.message;
    }
  }
};
</script>
<style scoped lang="less">
.van-swipe-item img {
  width: 100%;
  height: 200px;
}
.van-grid{
    
}
.van-grid-item{
     
    img{
        width: 50%;
       
    }
}

</style>