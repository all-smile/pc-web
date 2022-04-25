<template>
  <div class="Menu_ware">
    <el-menu default-active="2" class="menu_content" router @open="handleOpen" @close="handleClose" background-color="#5ea3f6" text-color="#fff" active-text-color="#ff7165">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>业务体验</span>
        </template>
        <el-menu-item index="1-1">客户模块</el-menu-item>
        <el-menu-item index="1-2">商品模块</el-menu-item>
      </el-submenu>
      <el-menu-item index="2" route="/main/home">
        <i class="el-icon-setting"></i>
        <span slot="title">业务字段配置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: {},
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  updated() { },
  beforeDestroy() { },
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
@import "./index.less";
</style>
