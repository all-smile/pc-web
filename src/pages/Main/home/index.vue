<!--
 * @Author: your name
 * @Date: 2021-08-29 15:22:58
 * @LastEditTime: 2021-10-27 10:33:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pc-web\src\pages\Main\home\index.vue
-->
<template>
  <div class="home" v-cusLoading="isLoading" element-loading-text="老夫正在拼命加载中..">
    <fly-button></fly-button>
    <svg-icon icon-class="question" />
    <theme-pick @onThemeChange="onThemeChange"></theme-pick>
    <el-button type="primary">主要按钮</el-button>
  </div>
</template>

<script>
// import "@/libs/newBind.js";
// import "@/libs/test.js";
// import "@/libs/curry.js";
// import "@/libs/cellDivision.js";
// import "@/libs/cloneFn.js";
// import "@/libs/debounce.js";
// import "@/libs/myPromise.js";
// import "@/libs/arrSort.js";
import "@/libs/arr2tree.js";
import "@/libs/demo.js";
import { getMixed, arrayInclude, arrayIncludeV2, isExistFile } from '@/libs/utils'
import FlyButton from '@components/fly-button/index'
import ThemePick from '@components/ThemePick/index'
// import SnapshotSandbox from "@/libs/sandbox.js";
// import ProxySandbox from "@/libs/sandbox02.js";

console.log('isExistFile:',isExistFile('./test.png'));
export default {
  name: 'home',
  props: {},
  components: {
    'fly-button': FlyButton,
    'theme-pick': ThemePick
  },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.isLoading = true
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
    /* const arr1 = ["E", 1, 2]
    const arr2 = [1, "D",]
    console.log(arrayIncludeV2(arr1, arr2)); */
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
    // console.log('this.deviceReady()', this.deviceReady());
    // console.log('this.deviceReady()====', this.deviceReady());
    // this.deviceReady().then((res) => {
    //   console.log(res) // ready go!
    //   JSAPI.showToast(0, '提示')
    // })
    // this.receiver('deviceready').then((ev) => { console.log(ev); })
    // this.receiver('click').then(() => { console.log('click'); })
  },
  methods: {
    onThemeChange(val) {
      console.log("onThemeChange = ", val);
    }
  },
  updated() { },
  beforeDestroy() { },
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
@import "./index.less";
</style>

