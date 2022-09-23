<template>
  <div class="Main">
    <router-view></router-view>
  </div>
</template>

<script>
// 该组件没有被任何路由加载👇
import { mapActions } from "vuex";
export default {
  name: 'Main',
  props: {},
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  // INIT STORE
  async beforeCreate() {
    // 获取所有产品分类
    // await this.$store.dispatch('product/getAllCatagory');

    // ⚠ mapActions执行在beforeCreated之后，
    // 在beforeCreated里不能直接调用通过mapActions映射的函数，必须写dispatch
    // await this.initStore()
  },
  created() { },
  mounted() {
  },
  methods: {
    ...mapActions('product', ['getAllCatagory']),
    async initStore() {
      await this.getAllCatagory()
    }
  },
  updated() { },
  beforeDestroy() { }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
.Main {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
