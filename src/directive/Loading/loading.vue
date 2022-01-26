<template>
  <transition name="el-loading-fade" @after-leave="handleAfterLeave">
    <div v-show="visible" class="el-loading-mask" style="opacity:0.8;" :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <div class="el-loading-spinner">
        <img width="60px" height="60px" src="@/assets/images/gloading.gif" alt="loading....">
        <p v-if="text" class="el-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      text: null,
      fullscreen: true,
      visible: false,
      customClass: ''
    }
  },
  methods: {
    handleAfterLeave() {
      this.$emit('after-leave')
    },
    setText(text) {
      this.text = text
    }
  }
}
</script>
<style lang='less' rel='stylesheet/less' scoped>
/deep/ .el-loading-spinner .el-loading-text {
  color: #d0021b;
}
</style>
