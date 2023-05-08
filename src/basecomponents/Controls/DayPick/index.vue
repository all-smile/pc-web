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
        :format="itemData.format || 'yyyy-MM-dd'"
        :value-format="itemData.format || 'yyyyMMdd'"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions"
        :readonly="isDisable"
        :clearable="!itemData.required"
        @change="handleChange"
      ></el-date-picker>
    </el-form-item>
  </el-form>
</template>

<script>
import { isObject } from '@/libs/utils'
export default {
  name: 'Control-DayPick',
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
    // pick-option 采用计算属性的方式
    pickerOptions() {
      let _this = this
      return {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          },
        ]
      }
    }
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
