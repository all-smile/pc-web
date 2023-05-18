<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    :custom-class="widthClassName"
    :close-on-click-modal="false"
    v-dialogDrag
  >
    <query-control
      v-loading="loading"
      ref="queryControl"
      :controlGroup="formFields"
      dontAddPadding
      :optType="optType"
    ></query-control>
    <span slot="footer" class="dialog-footer">
      <el-button
        @click="
          dialogVisible = false;
          loading = false;
        "
        :loading="loading"
        >取 消</el-button
      >
      <el-button type="primary" @click="submitForm" :loading="loading"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import QueryControl from '@/components/QueryControl/index'
export default {
  name: 'FormDialog',
  props: {
    dialogFormFields: {
      type: Array,
      default: () => []
    },
    // 表单字段默认全部展示
    fieldShow: {
      type: Boolean,
      default: true
    },
    // 表单提交接口
    submitApi: {
      type: Function,
      default() { }
    },
    widthClassName: {
      type: String,
      default: 'width520'
    }
  },
  components: {
    QueryControl
  },
  data() {
    return {
      formFields: this.dialogFormFields,
      dialogTitle: '',
      dialogVisible: false,
      dataItem: {},
      loading: false,
      optType: ''
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    // 打开弹窗
    open(params) {
      const { opt = '', data = {}, readonlyFields = [] } = params;
      this.optType = opt;
      this.dataItem = { ...data }
      this.dialogTitle = opt === 'add' ? '新增' : '修改'
      if (opt === 'add') {
        this.formFields.forEach(item => {
          // 1. 重置数据
          item.controlData = ''
          item.noShow = !this.fieldShow;
          if (readonlyFields.includes(item.fieldName)) {
            item.readonly = true;
          } else {
            item.readonly = false;
          }
          // 2. 保留值处理
          if (item.fieldName === 'checkId') {
            item.noShow = false
          }
        })
      } else {
        // 修改的时候，设置不可修改的字段
        this.formFields.forEach(item => {
          if (readonlyFields.includes(item.fieldName)) {
            item.readonly = true;
          } else {
            item.readonly = false;
          }
        })
      }
      this.formFields = Object.assign([], this.formFields)

      this.dialogVisible = true
      this.loading = true

      this.$nextTick(() => {
        if (this.$refs.queryControl) {
          this.$refs.queryControl.initData({ ...this.dataItem })
        }
      })

      setTimeout(() => {
        this.loading = false
      }, 500)
    },

    submitForm() {
      let formInfo = {}
      if (this.$refs.queryControl) {
        formInfo = this.$refs.queryControl.submit()
      }
      if (formInfo) {
        this.execSubmit(formInfo)
      }
    },

    async execSubmit(params = {}) {
      try {
        this.loading = true
        const obj = { ...params }

        if (this.optType !== 'add') {
          // 修改需要的参数id
          if (this.dataItem.id) {
            obj.id = this.dataItem.id
          }
        }

        const res = await this.submitApi({ ...obj })
        if (res.status === 'OK') {
          this.$message.success('提交成功');
          this.dialogVisible = false;
          this.$emit('updateData')
        } else {
          this.$message.error(res.message)
        }
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log('execSubmit-err', err);
      }
    }
  },
  updated() { },
  beforeDestroy() { },
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
</style>
