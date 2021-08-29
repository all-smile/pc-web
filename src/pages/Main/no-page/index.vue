<!--
 * @Author: your name
 * @Date: 2021-08-25 22:26:43
 * @LastEditTime: 2021-08-29 15:21:22
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \pc-web\src\pages\Main\no-page\index.vue
-->
<template>
    <div class="no-page">
        <van-empty image="error" :description="title">
            <!-- <van-button class="no-page_close">关闭</van-button> -->
        </van-empty>
        {{$route.query.errPath}}页面不存在
    </div>
</template>
<script>
export default {
    name: 'no-page',
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
.no-page {
    text-align: center;
    color: #999999;
    font-size: 0.14rem;
}
.no-page_close {
    width: 2rem;
    height: 0.32rem;
    line-height: 0.32rem;
    border-radius: 0.1rem;
}
</style>
