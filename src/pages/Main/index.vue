<template>
    <div class="Main">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Main',
    props: {},
    components: {},
    data() {
        return {}
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() { },
    methods: {},
    updated() { },
    beforeDestroy() { }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
.Main {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
</style>
