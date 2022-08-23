<template>
  <div class="textCard">
    <div class="ellipsis card-name">{{cardData.name}}</div>
    <!-- 箭头通过自定义指令控制 -->
    <i v-moreIcon class="el-icon-arrow-down icon_down"></i>
  </div>
</template>

<script>
 export default {
   name:'TextCard',
   props:{
    cardData: {
      type: Object,
      require: true
    }
   },
   components: {},
   data () {
     return {}
   },
   computed:{},
   watch:{},
   created(){},
   mounted() {},
   methods: {},
   updated() {},
   beforeDestroy() {},
 }
</script>

<style lang='less' rel='stylesheet/less' scoped>
 @import './index.less';
</style>
