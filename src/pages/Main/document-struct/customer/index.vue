<template>
  <div class="customer">
    <!-- 卡片展示 -->
    <div class="card_view">
      <div class="card_view-item" v-for="(card, index) in listData" :key="index">
        <card :cardData="{name:card.name}"></card>
      </div>
    </div>
    <vxe-table :data="p_listdata">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
    </vxe-table>
    <table-list class="table_list" v-loading="p_loading" :tableData="p_listdata" :fieldList="fieldList"></table-list>
  </div>
</template>

<script>
import TextCard from '@/basecomponents/TextCard/index'
import TableList from '@/basecomponents/TableList/index'
import $_pMixins from "@/mixins/product.js";
import enums from './enum.js'
export default {
  name: 'Customer',
  props: {},
  components: {
    'card': TextCard,
    'table-list': TableList,
  },
  mixins: [$_pMixins],
  data() {
    return {
      tableData: [],
      fieldList: Object.freeze(enums.Enum_customerFieldList),
      // p_listdata: [],
      listData: Object.freeze([
        {
          name: '阿三发射点'
        },
        {
          name: '阿三'
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
  created() {
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.getProductList()
    }
  },
  updated() { },
  beforeDestroy() { },
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
@import "./index.less";
</style>
