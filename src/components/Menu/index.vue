<template>
  <div class="Menu_ware">
    <!-- <el-scrollbar height="100%"> -->
    <el-menu
      :default-active="activeMenu"
      class="menu_content"
      router
      @open="handleOpen"
      @close="handleClose"
      background-color="rgb(34,79,189)"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-submenu index="/main/document-struct">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>业务体验</span>
        </template>
        <el-menu-item
          index="/main/document-struct/customer"
          route="/main/document-struct/customer"
          >客户模块</el-menu-item
        >
        <el-menu-item
          index="/main/document-struct/goods"
          route="/main/document-struct/goods"
          >商品模块</el-menu-item
        >
      </el-submenu>
      <el-menu-item
        index="/main/document-struct/bizfield"
        route="/main/document-struct/bizfield"
      >
        <i class="el-icon-setting"></i>
        <span slot="title">业务字段配置</span>
      </el-menu-item>
    </el-menu>
    <!-- </el-scrollbar> -->
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
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
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
