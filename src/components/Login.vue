<template>
  <div>
    <van-button @click="fn">登录</van-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
  
    };
  },
  methods:{
    fn(){
      this.$router.push("/home")
    }
  }
}
</script>
<style scoped lang="less">
  
</style>