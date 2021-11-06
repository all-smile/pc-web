<!--
 * @Author: your name
 * @Date: 2021-08-29 15:22:58
 * @LastEditTime: 2021-10-27 10:33:45
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
import { getMixed, arrayInclude, arrayIncludeV2 } from '@/libs/utils'
import FlyButton from '@components/fly-button/index'
// import SnapshotSandbox from "@/libs/sandbox.js";
// import ProxySandbox from "@/libs/sandbox02.js";
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
  created() {
    // console.log('SnapshotSandbox', SnapshotSandbox);
    // let sandbox = new SnapshotSandbox();
    // console.log('sandbox', sandbox);
    // ((window) => {
    //   window.a = 1
    //   window.b = 2
    //   console.log(window.a, window.b);
    //   sandbox.inactive()
    //   console.log(window.a, window.b);
    //   sandbox.active()
    //   console.log(window.a, window.b);
    // })(sandbox.proxy) // sandbox.proxy 就是window
  },
  mounted() {
    // console.log(getMixed([1, 1, 2, 5], [1, 2, 4, 5]))
    const arr1 = ["E", 1, 2]
    const arr2 = [1, "D",]
    console.log(arrayIncludeV2(arr1, arr2));
  },
  methods: {},
  updated() { },
  beforeDestroy() { },
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
@import "./index.less";
</style>

