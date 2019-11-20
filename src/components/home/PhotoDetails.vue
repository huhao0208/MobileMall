<template>
  <div>
    <h5>{{pdlist.title}}</h5>
    <div class="title">
      <span>{{pdlist.add_time|formDate}}</span>
      <span>{{pdlist.click}}次点击</span>
    </div>
    <!-- 略缩图 -->
    <ul class="picbox">
      <li v-for="(item,i) in ptList" :key="i">
        <van-image :src="item.src" @click="enlarge(i)" />
      </li>
    </ul>
    <div v-html="pdlist.content"></div>
    <!-- 评论区域 -->
    <pinglun :id="id"></pinglun>

    <van-image-preview v-model="show" :images="images" @change="onChange">
      <template v-slot:index>第{{ index }}页</template>
    </van-image-preview>
  </div>
</template>
<script>
import comments from "../Comment.vue";
export default {
  components: { pinglun: comments },
  created() {
    this.getPhotoDetails();
    this.getPhotos();
    console.log(this.id);
  },
  data() {
    return {
      id: Number(this.$route.params.id),
      pdlist: [], // 文章
      ptList: [], // 图片
      show: false,
      index: 1,
      images: []
    };
  },
  methods: {
    async getPhotoDetails() {
      const { data: res } = await this.$http.get(
        "/api/getimageInfo/" + this.id
      );
      // console.log(res);
      if (res.status != 0) return;
      this.pdlist = res.message[0];
    },
    // 获取略缩图
    async getPhotos() {
      const { data: res } = await this.$http.get(
        "/api/getthumimages/" + this.id
      );

      if (res.status != 0) return;
      this.ptList = res.message;
      res.message.forEach(e => {
        this.images.push(e.src);
      });
      console.log(this.ptList);
    },
    enlarge(i) {
      this.index = i + 1;
      this.show = true;
    },
    onChange(index) {
      this.index = index + 1;
    }
  }
};
</script>
<style scoped lang="less">
main > div {
  margin: 15px;
}
.title {
  display: flex;
  justify-content: space-between;
}
.picbox {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  li {
    padding: 4px;
    width: 33%;
    box-sizing: border-box;
    .van-image {
      box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.4);
    }
  }
}
</style>