<template>
  <div class="loading">
    <img :style="{ width: size.width, height: size.height }" src="@assets/images/loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    title: {
      type: String,
      default: '正在加载...'
    },
    size: {
      type: Object,
      default: () => ({
        width: '20px',
        height: '20px'
      })
    }
  }
}

</script>
<style lang="less" rel="stylesheet/less" scoped>
.loading {
  text-align: center;
  padding: 10px;
  > img {
    width: 24px;
    height: 24px;
  }
  > .desc {
    line-height: 20px;
    font-size: 14px;
    color: #ccc;
    padding-left: 13px;
  }
}
</style>
