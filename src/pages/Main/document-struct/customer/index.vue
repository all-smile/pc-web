<template>
  <div class="customer">
    <!-- 卡片展示 -->
    <div class="card_view">
      <div class="card_view-item" v-for="(card, index) in listData" :key="index">
        <card :cardData="{name:card.name}"></card>
      </div>
    </div>
  </div>
</template>

<script>
import TextCard from '@/basecomponents/TextCard/index'
export default {
  name: 'Customer',
  props: {},
  components: {
    'card': TextCard
  },
  data() {
    return {
      listData: Object.freeze([
        {
          name: '阿三发射点无法支付的'
        },
        {
          name: '阿三发射点无法支付的'
        },
        {
          name: '阿三发射点无法支付的'
        },
        {
          name: '阿三发射点无法支付的阿三发射点无法支付的'
        },
        {
          name: '阿三发射点无法支付的'
        },
        {
          name: '阿三发射点无法支付的'
        },
        {

          name: '阿三发射点无法支付的'
        },
        {

          name: '阿三发射点无法支付的'
        },
        {
          name: '阿三发射点无法支付的'
        },
        {
          name: '阿三发射点无法支付的'
        },
        {
          name: '阿三发射点无法支付的'
        },
        {
          name: '阿三发射点无法支付的'
        },
        {
          name: '阿三发射点无法支付的'
        },
        {
          name: '阿三发射点无法支付的'
        },
        {
          name: '阿三发射点无法支付的'
        },
        {
          name: '阿三发射点无法支付的'
        },
      ])
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {},
  updated() { },
  beforeDestroy() { },
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
@import "./index.less";
</style>
