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
      <el-input
        class="control"
        :placeholder="itemData.placeholder || item.fieldLabel"
        v-model="controlForm.value"
        clearable
        :readonly="isDisable"
        :disabled="isDisable"
        @change="handleChange"
        :style="{ width: itemData.rightWidth }"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { isObject } from '@/libs/utils'
export default {
  name: 'Control-InputNumber',
  props: {
    itemData: {
      type: Object,
      default: () => ({
        labelWidth: '100px',
        rightWidth: '160px',
      })
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
            message: `请输入${this.itemData.placeholder || this.itemData.fieldLabel}`,
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
