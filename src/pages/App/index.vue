<!--
 * @Author: your name
 * @Date: 2021-08-25 22:26:43
 * @LastEditTime: 2021-10-16 18:29:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pc-web\src\pages\App\index.vue
-->
<template>
  <div class="App">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  props: {},
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() { },
  mounted() {
    console.log("");
  },
  methods: {},
  updated() { },
  beforeDestroy() { }
}
</script>

<style lang="less">
@import "~@/assets/less/reset.less";
</style>
<style lang='less' rel='stylesheet/less' scoped>
.App {
  // background-color: #fff;
  background: #32c2e5;
  width: 100%;
  height: 100%;
}
</style>
