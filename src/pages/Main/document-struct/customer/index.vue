<template>
  <div class="customer">
    <!-- 卡片展示 -->
    <div class="card_view">
      <div class="card_view-item" v-for="(card, index) in listData" :key="index">
        <card :cardData="{name:card.name}"></card>
      </div>
    </div>
    <vxe-table :align="left" :data="tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
    </vxe-table>
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
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
      ],
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
