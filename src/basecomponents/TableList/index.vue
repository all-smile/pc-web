<template>
  <ul class="listV2">
    <li class="listV2_row-title">
      <span v-for="(col, index) in fieldList" :key="index" class="listV2_cell ellipsis" :name="col.fieldName">
        {{col.fieldLabel}}
      </span>
    </li>
    <!-- 行 -->
    <div v-if="tableData.length === 0" class="nodata">暂无数据</div>
    <li v-for="(row, index) in tableData" :key="index" class="listV2_row pointer" @click="rowClickToDetail(row)">
      <!-- 单元格-列 -->
      <span v-for="(col, index) in fieldList" :key="index" class="listV2_cell ellipsis" :name="col.fieldName">
        <render-dom :myvNode="row[col.fieldName] || '-'"></render-dom>
      </span>
    </li>
  </ul>
</template>

<script>
import RenderDom from "./renderDom";
export default {
  name: 'TableList',
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    fieldList: {
      type: Array,
      required: true,
    },
    align: {
      type: String,
      default: 'left',
    },
  },
  components: {
    'render-dom': RenderDom,
  },
  data() {
    return {}
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
