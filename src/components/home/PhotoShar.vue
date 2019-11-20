<template>
  <div>
    <van-tabs @click="onClick">
      <van-tab v-for="item in cateTitle" :title="item.title" :key="item.id">
        <div v-for="img in cateList" :key="img.id" class="catebox" @click="activeImg(img.id)">
          <img v-lazy="img.img_url" />
          <div class="textbox">
            <h5>{{img.title}}</h5>
            <p>{{img.zhaiyao}}</p>
          </div>
        </div>
      </van-tab>
    </van-tabs>

   
  </div>
</template>
<script>
export default {
  async created() {
    // 获取分类
    await this.getCategory();
    // 获取所有
    this.getAll();
  },
  data() {
    return {
      cateTitle: [{ id: "all", title: "全部" }],
      cateList: [],
    
    };
  },
  computed: {},
  methods: {
    // 获取分类
    async getCategory() {
      const { data: res } = await this.$http("/api/getimgcategory");
      console.log(res);
      if (res.status != 0) return ;
      this.cateTitle.push(...res.message);
    },
    // 选择分类 获取对应
    async onClick(e) {
      let id = this.cateTitle[e].id;
      //   console.log(id);
      if (id !== "all") {
        const { data: res } = await this.$http.get("/api/getimages/" + id);
        //   console.log(res);
        if (res.status != 0) return;
        this.cateList = res.message;
      } else {
        this.getAll();
        //   this.getAll()
      }
    },
    // 获取所有
    getAll() {
      let data = [];
      this.cateTitle.forEach(async e => {
        if (e.id != "all") {
          const { data: res } = await this.$http.get("/api/getimages/" + e.id);
          if (res.status != 0) return;
          data.push(...res.message);
        }

        this.cateList = data;
      });
    },
    // 图片详情 进入详情页
    activeImg(id) {
      console.log(id);
      this.$router.push("/photodetails/" + id);
    }
  }
};
</script>
<style scoped lang="less">
.van-tabs {
}
.catebox {
  position: relative;
  margin: 5px 10px;
  border-radius: 5px;
  overflow: hidden;
  img {
    width: 100%;
  }
  .textbox {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0 10px;
    background: rgba(0, 0, 0, 0.3);
    h5,
    p {
      font-size: 14px;
      color: #fff;
      padding: 0;
      margin: 10px;
    }
  }
}
</style>