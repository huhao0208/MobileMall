<template>
  <div>
     <h4>发表评论</h4>
    <textarea name="comment" id v-model="textcon" placeholder="请输入留言"></textarea>
    <van-button type="info" @click="subcomment">发表评论{{idd}}</van-button>

    <!-- 评论列表 -->
    <div v-for="(item,index) in commentList" :key="index"  >
        <div class="title">
            <span>第{{index+1}}楼 </span>
            <span>用户:{{item.user_name}}</span>
            <span>发表时间:{{item.add_time|formDate}}</span>
        </div>
        
        <div class="body">
            {{item.content}}
        </div>
    </div>
    <van-button class="more" @click="more" v-if="isMore">点击加载更多...</van-button>
  </div>
</template>
<script>
export default {
  props: ["id"],
  watch: {
    id: {
      handler(val, oldval) {
          this.idd =val;
        
      }
    }
  },
  created() {
      this.getComment();
  },
  data() {
    return {
      idd: this.id,
      commentList: [], // 评论列表
      textcon: "", // 发表评论内容
      pageindex: 1, // 评论页码
      isMore:true,
    
    };
  },
  methods: {
    // 获取评论
    async getComment() {
      const { data: res } = await this.$http.get(
        "/api/getcomments/" + this.idd + "?pageindex= " + this.pageindex
      );
      if(res.message.length!=10) {
        this.isMore=false;
      }
     // console.log(res);
     this.pageindex==1? this.commentList=res.message: this.commentList.push( ...res.message);
      console.log(this.commentList);
      
      
    },
    //提交评论
    async subcomment() {
      this.pageindex=1;
      // console.log(this.textcon, this.id);
      if(this.textcon.trim()=="") return this.$toast("评论内容不能为空")
      const { data: res } = await this.$http.post(
        "/api/postcomment/" + this.id,
        { content: this.textcon }
      );
      if (res.status != 0) return this.$toast("提交评论失败");
      this.$toast("提交成功")
      console.log(1);
      
       this.getComment()
       this.textcon =""

    },
    more(){
        this. pageindex++;
        this.getComment()
    }
  
  }
};
</script>
<style scoped lang="less">
textarea {
  width: 100%;
  height: 150px;
  border: 2px solid #ccc;
}
.van-button {
  width: 100%;
}
.title{
    background: #eee;
    margin:10px 0;
    display:flex;
    justify-content: space-between
}
.more{
    color:red;
    border: 1px solid red
}
</style>