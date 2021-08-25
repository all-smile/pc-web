<template>
    <div class="NoPage">
        <van-empty image="error" :description="title">
            <!-- <van-button class="NoPage_close">关闭</van-button> -->
        </van-empty>
        {{$route.query.errPath}}页面不存在
    </div>
</template>
<script>
export default {
    name: 'NoPage',
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {

        }
    },
    created() {
    },
    mounted() {
        this.setHeaderTitle('错误')
    }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.NoPage {
    text-align: center;
    color: #999999;
    font-size: 0.14rem;
}
.NoPage_close {
    width: 2rem;
    height: 0.32rem;
    line-height: 0.32rem;
    border-radius: 0.1rem;
}
</style>
