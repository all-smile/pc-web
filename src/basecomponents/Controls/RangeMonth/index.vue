<template>
  <el-form
    ref="form"
    :rules="rules"
    :model="controlForm"
    :label-width="itemData.labelWidth"
    :label-position="itemData.labelPosition"
  >
    <el-form-item
      :label="itemData.showLabel ? itemData.fieldLabel : ''"
      :prop="propName"
    >
      <el-date-picker
        :style="{ width: itemData.rightWidth }"
        v-model="controlForm.value"
        :format="itemData.format || 'yyyy-MM'"
        :value-format="itemData.format || 'yyyyMM'"
        align="right"
        type="monthrange"
        unlink-panels
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        :readonly="isDisable"
        :editable="itemData.editable"
        :clearable="!itemData.required"
        @change="handleChange"
      ></el-date-picker>
    </el-form-item>
  </el-form>
</template>

<script>
import moment from "moment";
import { isObject, getWeekStartDate, getWeekEndDate } from '@/libs/utils'

export default {
  name: 'Control-RangeMonth',
  props: {
    itemData: {
      type: Object,
      default: () => { }
    }
  },
  components: {},
  data() {
    return {
      isDisable: false,
      controlForm: {
        value: ''
      },
      rules: {
        value: [
          {
            required: true,
            message: `请选择${this.itemData.placeholder || this.itemData.fieldLabel}`,
            trigger: 'blur'
          }
        ]
      },
      pickTime: null
    }
  },
  computed: {
    propName() {
      let name = '';
      if (this.itemData.isNotNull === 1) {
        name = 'value'
      }
      return name
    },
  },
  watch: {
    itemData: {
      handler(newV) {
        this.isDisable = newV.readonly
      },
      deep: true,
      immediate: true
    }
  },
  created() { },
  mounted() { },
  methods: {
    // 移除校验
    clearVerify() {
      this.$refs.form.clearValidate()
    },

    // 初始化带入值
    initVal(obj = {}) {
      this.clearVerify();
      if (isObject(obj)) {
        this.controlForm.value = obj[this.itemData.fieldName]
        this.itemData.controlData = obj[this.itemData.fieldName]
        // this.$emit('update:controlData', obj[this.itemData.fieldName])
      }
    },

    // 初始化默认值
    updata() {
      this.clearVerify()
      this.controlForm.value = this.itemData.defaultValue
      this.itemData.controlData = this.itemData.defaultValue
    },

    // 重置 - 恢复成默认值
    reset() {
      this.controlForm.value = this.itemData.defaultValue
      this.itemData.controlData = this.itemData.defaultValue
    },

    handleChange(val) {
      this.itemData.controlData = val
      this.$emit('update:controlData', val || '')
    },

    verifyForm() {
      let isPass = true
      this.$refs.form.validate((valid) => {
        if (!valid) {
          isPass = false
        }
      })
      return isPass
    }
  },
  updated() { },
  beforeDestroy() { },
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
@import "../common.less";
</style>
