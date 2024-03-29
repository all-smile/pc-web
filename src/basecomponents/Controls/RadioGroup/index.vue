<template>
  <el-form
    ref="form"
    :rules="rules"
    class="selectDownBox"
    :model="controlForm"
    :label-width="itemData.labelWidth"
    :label-position="itemData.labelPosition"
  >
    <el-form-item
      :label="itemData.showLabel ? itemData.fieldLabel : ''"
      :prop="propName"
    >
      <el-radio-group v-model="controlForm.value" @change="handleChange">
        <el-radio
          v-for="item in options"
          :key="item.dictCode"
          class="radio_item"
          :label="item.dictCode"
        >
          {{ `${item.dictName}（${item.dictNameDesc}）` }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import { isObject, isString, isArray } from '@/libs/utils'
import { fetchItem } from "@/api/index.js";
export default {
  name: 'Control-RadioGroup',
  props: {
    itemData: {
      type: Object,
      default: () => ({})
    }
  },
  components: {},
  data() {
    return {
      options: Object.freeze([]),
      tempItemData: this.itemData,
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
      listItemQuery: {
        page: 1,
        size: 20,
        condition: {
          lookupCode: '',
          lookupItemName: '',
        }
      }
    }
  },
  computed: {
    ...mapGetters(['dictInfo']),
    propName() {
      let name = '';
      if (this.itemData.isNotNull === 1) {
        name = 'value'
      }
      return name
    },
    isDisable() {
      let flag = false;
      if (this.tempItemData.readonly) {
        flag = true
      }
      return flag;
    }
  },
  watch: {
    dictInfo() {
      if (this.itemData.localVuexDictData) {
        this.getVuexDictData()
      }
    }
  },
  created() { },
  mounted() {
    if (this.itemData.remoteDictOptionsData) {
      // 获取码值配置数据
      this.fetchRemoteDictData();
    } else if (this.itemData.remoteOtherApi) {
      // 普通接口获取业务数据写这里
      this.getApiData()
    } else if (this.itemData.localVuexDictData) {
      this.getVuexDictData()
    }
  },
  methods: {
    // 从 vuex 字典中获取可选项数据
    getVuexDictData() {
      let arr = []
      if (isObject(this.dictInfo) && this.dictInfo[this.itemData.dictKey]) {
        arr = this.dictInfo[this.itemData.dictKey]
      }
      this.options = [...arr]
    },

    // 调用接口获取数据
    async getApiData() {
      try {
        const res = await this.apis[this.itemData.remoteOtherApi]();
        if (res.status === 'OK') {
          const list = res.data || []
          if (Array.isArray(list)) {
            this.options = [...list]
          }
        } else {
          this.$message.error(res.message || '')
        }
      } catch (err) {
        console.log('getApiData-err', err);
      }
    },

    // 调用码值配置接口获取可选项数据
    async fetchRemoteDictData() {
      try {
        this.listItemQuery.condition.lookupCode = this.itemData.dictKey;
        const res = await fetchItem(this.listItemQuery);
        if (res.status === 'OK') {
          const list = res.data || []
          if (Array.isArray(list)) {
            list = list.sortListObjByKey('sortNum')
            this.options = list.map(item => {
              return {
                dictCode: item.lookupItemCode,
                dictName: item.lookupItemName,
                extra: null,
                inUse: '1'
              }
            })
          }
        } else {
          this.$message.error(res.message || '')
        }
      } catch (err) {
        console.log('fetchRemoteDictData-err', err);
      }
    },

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
      if (this.itemData.defaultOptions) {
        this.options = this.itemData.defaultOptions
      }
    },

    // 重置 - 恢复成默认值
    reset() {
      this.controlForm.value = this.itemData.defaultValue
      this.itemData.controlData = this.itemData.defaultValue
      if (this.itemData.defaultOptions) {
        this.options = this.itemData.defaultOptions
      }
    },

    handleChange(val) {
      this.$emit('update:controlData', val)
      this.itemData.controlData = val
      this.$emit('handleFieldShow', `${[this.itemData.fieldName]}=${val}`); // checkId=quyCode 小程序权限配置切换字段展示
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
