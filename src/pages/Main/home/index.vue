<!--
 * @Author: your name
 * @Date: 2021-08-29 15:22:58
 * @LastEditTime: 2021-08-29 19:06:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pc-web\src\pages\Main\home\index.vue
-->
<template>
    <div class="home">
        <fly-button></fly-button>
    </div>
</template>

<script>
import FlyButton from '@components/fly-button/index'
export default {
    name: 'home',
    props: {},
    components: {
        'fly-button': FlyButton
    },
    data() {
        return {}
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {},
    updated() { },
    beforeDestroy() { },
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
@import "./index.less";
</style>

