<template>
  <div class="bizfield">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="客户档案" name="first">客户档案</el-tab-pane>
      <el-tab-pane label="商品档案" name="second">商品档案</el-tab-pane>
    </el-tabs>
    <div class="clamp_2 test">
      撒旦发射点范德萨打发士大夫士大夫首发式撒旦发射点范德萨打发士大夫士大夫首发式撒旦发射点范德萨打发士大夫士大夫首发式撒旦发射点范德萨打发士大夫士大夫首发式
    </div>
    <!-- <img width="800" height="400" src="http://www.360fc.cn/webfile//upload/2018/07-05/11-19-3605561054126152.JPEG" alt="http img"> -->
    <el-input v-model="name" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'bizfield',
  props: {},
  components: {},
  data() {
    return {
      activeName: 'first',
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    name: {
      get() {
        return this.$store.state.userInfo.name
      },
      set(value) {
        console.log('set-value', value);
        this.$store.commit('SET_USERINFO', {
          name: value
        })
        // this.SET_USERINFO({
        //   name: value
        // })
      }
    }
  },
  watch: {},
  created() { },
  mounted() {
    // console.log('userInfo', this.userInfo);
  },
  methods: {
    ...mapMutations(['SET_USERINFO']),
    handleClick(tab, event) {
      console.log(tab, event);
    },

    handleChange(val) {
      console.log('handleChange', val);
    }
  },
  updated() { },
  beforeDestroy() { },
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
@import "./index.less";
</style>
