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
      <!-- 发送验证码按钮 -->
      <el-button
        class="code_btn"
        plain
        :loading="isClickSend"
        :disabled="isSend"
        @click="getPhoneCode"
        >{{ codeText }}</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { fetchPhoneSms } from '@/api/index.js'
import { isObject } from '@/libs/utils'
import { validator } from '@/libs/validate'
export default {
  name: 'Control-InputPhone',
  props: {
    itemData: {
      type: Object,
      default: () => ({})
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
            validator: validator.checkPhone,
            trigger: 'blur'
          }
        ]
      },
      isSend: false, // 是否已发送验证码
      isClickSend: false,
      countDown: 60,
      timer: null
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
    codeText() {
      let text = ''
      if (this.isSend) {
        text = `${this.countDown}s后重新获取`
      } else {
        text = '获取手机号验证码'
      }
      return text;
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
      this.resume()
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
    },

    async getPhoneCode() {
      if (!this.verifyForm()) {
        return
      }
      try {
        const res = await fetchPhoneSms({
          phoneNum: this.controlForm.value
        })
        if (res.status === 'OK') {
          this.$message.success('短信验证码已发送')
          const { journalNo = '' } = res.signedValue || {}
          this.timerCount()
          this.isSend = true
          // 填充验证码流水号字段
          this.$emit('handleRelatedFields', { journalNo }, this.itemData.relatedFields)
          // 修改的时候，表单验证码流水号字段兜底措施
          this.itemData.carryData = {
            journalNo
          }
        } else {
          this.$message.error(res.message)
        }
      } catch (err) {
        console.log('getPhoneCode-err', err);
      }
    },

    // 倒计时
    timerCount() {
      this.timer && clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.countDown--
        if (this.countDown <= 0) {
          this.isSend = false
          clearInterval(this.timer)
          this.countDown = 60
        }
      }, 1000)
    },

    // 恢复计时 、 按钮状态
    resume() {
      this.timer && clearInterval(this.timer)
      this.isSend = false
      this.countDown = 60
    }
  },
  updated() { },
  beforeDestroy() {
    this.resume()
  },
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
@import "../common.less";
</style>
