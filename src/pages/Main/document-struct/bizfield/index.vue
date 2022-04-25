<template>
  <div class="bizfield">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="客户档案" name="first">客户档案</el-tab-pane>
      <el-tab-pane label="商品档案" name="second">商品档案</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'bizfield',
  props: {},
  components: {},
  data() {
    return {
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  updated() { },
  beforeDestroy() { },
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
@import "./index.less";
</style>
