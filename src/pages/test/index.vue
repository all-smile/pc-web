<template>
    <div class="ware">
        测试权限
    </div>
</template>

<script>
export default {
    name: 'Test',
    props: {},
    components: {},
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
    beforeRouteLeave(to, from, next) {
        next()
    }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
.ware {
    color: black;
}
</style>
