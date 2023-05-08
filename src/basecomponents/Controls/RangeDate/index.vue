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
        type="daterange"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
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
  name: 'Control-RangeDate',
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
    // pick-option 采用计算属性的方式
    pickerOptions() {
      let _this = this
      return {
        disabledDate(time) {
          if (_this.pickTime) {
            const curTime = moment(moment(_this.pickTime).format('YYYY-MM-DD')).valueOf();
            // pickTime 前后 365 天 && 不大于今天
            const start = new Date(curTime - 3600 * 1000 * 24 * 365)
            const end = new Date(curTime + 3600 * 1000 * 24 * 365)
            return time.getTime() > Date.now() || time.getTime() < start || time.getTime() > end
          }
          return time.getTime() > Date.now()
        },
        onPick({ maxDate, minDate }) {
          if (!maxDate) {
            _this.pickTime = minDate
          }
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date(new Date().setHours(0, 0, 0, 0)))
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date(new Date().setHours(0, 0, 0, 0)) - 3600 * 1000 * 24 * 1)
              end.setTime(start.getTime() + (3600 * 1000 * 24 * 1 - 1))
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '本周',
            onClick(picker) {
              let end = new Date()
              let start = new Date()
              start = getWeekStartDate(new Date())
              end = getWeekEndDate(new Date())
              end.setTime(end.getTime() + (3600 * 1000 * 24 * 1 - 1))
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() + (3600 * 1000 * 24 * 7))
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() + (3600 * 1000 * 24 * 30))
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() + (3600 * 1000 * 24 * 90))
              picker.$emit('pick', [start, end])
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
