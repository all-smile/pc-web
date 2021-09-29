<!--
 * @Author: your name
 * @Date: 2021-08-25 22:26:43
 * @LastEditTime: 2021-09-29 13:23:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pc-web\src\pages\Main\no-page\index.vue
-->
<template>
  <div class="no-page">
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
  font-size: 14px;
}
.no-page_close {
  width: 20px;
  height: 32px;
  line-height: 32px;
  border-radius: 10px;
}
</style>
