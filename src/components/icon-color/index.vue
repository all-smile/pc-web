<!--
 * @Author: your name
 * @Date: 2021-08-29 16:05:04
 * @LastEditTime: 2021-08-29 17:42:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pc-web\src\components\icon-color\index.vue
-->
<template>
  <svg class="all-icon color__icon icon icon-color_hamburger" :style="'font-size:' + fontSize + 'px'" aria-hidden="true">
    <use v-bind:xlink:href="'#icon-color_' + iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon-color',
  props: {
    iconName: {
      type: String,
      default: ''
    },
    fontSize: {
      type: [Number, String],
      default: 16
    }
  },
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {},
  beforeDestroy() { }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
// svg 样式
// .color__icon {
//     width: 1em;
//     height: 1em;
//     vertical-align: -0.15em;
//     fill: currentColor;
//     overflow: hidden;
//     font-size: 16px;
// }
</style>
