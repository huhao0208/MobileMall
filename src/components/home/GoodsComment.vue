<template>
    <div>
        <goods-comments :id="$route.params.id"></goods-comments>  
    </div>
</template>
<script>
import Comment from "../Comment.vue"
export default {
    components:{"goods-comments":Comment},
    created() {
        console.log(this.$route.params.id)
    },
    data () {
        return {
    
        };
    },
    methods:{
    
    }
}
</script>
<style scoped lang="less">
    
</style>