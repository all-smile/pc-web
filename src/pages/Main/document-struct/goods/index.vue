<template>
  <div class="goods">
    <el-button type="primary" @click="newAdd">新增商品</el-button>
    <!-- 新增表单弹窗 -->
    <form-dialog
      ref="popUp"
      :dialogFormFields="dialogFormFields"
      :fieldShow="true"
      :submitApi="submitApi"
      @updateData="updateData"
    ></form-dialog>
  </div>
</template>

<script>
import FormDialog from "@/components/FormDialog/index.vue";
import { fetchHrmJob } from '@/api/index'
import Enum from "./enum.js";

export default {
  name: 'Goods',
  props: {},
  components: { FormDialog },
  data() {
    return {
      loading: false,
      dialogFormFields: Object.freeze(Enum.EnumAddEditFields),
      submitApi: fetchHrmJob,
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    newAdd() {
      if (this.$refs.popUp) {
        this.$refs.popUp.open({
          opt: 'add',
          data: {}
        })
      }
    },

    updateData() {
      console.log('updateData===');
    }
  },
  updated() { },
  beforeDestroy() { },
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
@import "./index.less";
</style>
