<template>
  <div class="document-struct">
    <!-- 左侧菜单 -->
    <my-menu></my-menu>
    <!--右侧窗口-->
    <div class="rightWindow">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
export default {
  name: 'document-struct',
  props: {},
  components: {
    "my-menu": Menu
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {

  },
  updated() { },
  beforeDestroy() { },
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
@import "./index.less";
</style>
