<template>
  <div class="textCard">
    <div class="ellipsis card-name">{{cardData.name}}</div>
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
