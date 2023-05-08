<template>
  <div
    class="query_control"
    :class="{ 'query_control-padding': !dontAddPadding && isAddPadding }"
  >
    <template v-for="(item, index) in onControlGroup">
      <div
        :key="index"
        v-show="!item.noShow"
        :style="{ width: item.column ? (1 / item.column) * 100 + '%' : '' }"
        class="com-item"
      >
        <component
          ref="control"
          v-bind:is="`control-${item.controlName}`"
          :fieldLabel="item.fieldLabel"
          :itemData="item"
          :nameId="item.filedName"
          :controlData.sync="item.controlData"
          @handleRelatedFields="handleRelatedFields"
          @handleFieldsShow="handleFieldsShow"
        ></component>
      </div>
    </template>
  </div>
</template>

<script>
import Controls from '@/basecompontents/Controls/index.js';
export default {
  name: 'query-control',
  props: {
    controlGroup: {
      type: Array,
      default: () => [
        {
          showLabel: true,
          filedLabel: '接口名称',
          filedName: 'rangeDate',
          controlName: 'SelectDownBox',
          controlData: '',
          carryData: null, // 存放额外需要提交的字段，收集参数的时候取出（比如：获取手机号验证码的时候，需要额外传入验证码的流水号）
          defaultValue: '',
          defaultOptions: '',
          localVuexDictData: true, // 下拉选择的时候option数据从vuex里面获取
          dictKey: 'OperateTypeEnum', // vuex中的属性名
          remoteDictOptionsData: false, // 下拉选择的时候option数据从接口里面获取
          remoteOtherApi: '', // 下拉选择的时候option数据从接口里面获取，定义的api名称，采用策略模式（遵循传递尽可能少的原则，不采用props传递）
          labelWidth: '100px',
          rightWidth: '220px',
          labelPosition: 'right',
          isNotNull: 0,
          placeholder: '',
          format: 'yyyy-MM-dd', // 日期组件格式
          valueFormat: 'yyyy-MM-dd', // 日期组件格式
          keyCode: 'dictCode', // 下拉框option文字是否展示 dictCode
          controlSize: '100%', // 百分比，用来控制查询条件一行显示字段的个数
          column: '1', // 一行显示几列 (1 / column) * 100 + '%' // 默认值 3 即一行默认显示3列
          readonly: false, // 是否禁用(下拉框没有只读，采取禁用方式)/只读
          relatedFields: 'platformCheckStatus=platformCheckStatus;optType=optType', // 关联字段逻辑实现， ';' 分隔
          clearable: false,
          editable: false, // 是否可以输入（日期组件）
          multiple: true, // 是否可以多选
          noShow: true, // 字段级别的显隐控制
          // controlType: 'textarea',
        }
      ]
    },
    dontAddPadding: {
      type: Boolean,
      default: false
    },
    optType: {
      type: String,
      default: '' // edit-编辑 add-新增
    }
  },
  components: {},
  data() {
    return {
      dataItem: {}, // 初始化的值
      paramsObj: {},
      onControlGroup: this.controlGroup
    }
  },
  computed: {
    // 控制页面布局，当筛选字段放满整行时的 查询 按钮位置，不放满整行时的查询按钮位置
    isAddPadding() {
      let flag = false;
      if (this.flexControlGroup.length % (this.flexControlGroup[0].column || 3) === 0) {
        flag = true;
      }
      return flag
    },
    flexControlGroup() {
      return this.onControlGroup
    }
  },
  watch: {},
  created() { },
  mounted() {
    this.initData()
  },
  methods: {
    initData(objParams = {}) {
      this.dataItem = { ...objParams }
      this.flexControlGroup.forEach((oriItem) => {
        if (this.$refs.control) {
          this.$refs.control.forEach(item => {
            if (oriItem.filedName === item.$attrs.nameId) {
              // 初始化字段参数，和一些特殊处理
              if (Object.prototype.hasOwnProperty.call(objParams, item.$attrs.nameId)) {
                if (item.initVal) {
                  item.initVal(objParams)
                }
              } else {
                if (item.updata) {
                  item.updata()
                }
              }
            }
          })
        }
      })
    },

    // 重置参数，恢复成默认值
    reset() {
      this.$refs.control.forEach(item => {
        item.reset()
      })
    },

    submit() {
      // 1. 验证空值
      let isPass = true
      if (this.$refs.control) {
        this.$refs.control.forEach(item => {
          if (!item.verifyForm()) {
            isPass = false
          }
        })
      }
      if (!isPass) {
        return isPass
      }
      // 2. 获取输入值
      this.paramsObj = {}
      this.flexControlGroup.forEach(ele => {
        if (!ele.noShow) {
          switch (ele.fieldName) {
            case 'rangeDate':
              // 通用日期字段
              this.paramsObj.startTime = ele.controlData[0] || '';
              this.paramsObj.endTime = ele.controlData[1] || '';
              break;
            default:
              // 常规字段
              if (Array.isArray(ele.controlData)) {
                // 多选的控件，依据后端要求格式，转一下
                this.paramsObj[ele.fieldName] = ele.controlData.join(',')
              } else {
                this.paramsObj[ele.fieldName] = ele.controlData
              }
              break;
          }
          // 收集额外携带的字段
          if (ele.carryData) {
            this.paramsObj = { ...this.paramsObj, ...ele.carryData }
          }
        }
      })
      return this.paramsObj
    },

    // 相关字段逻辑处理
    handleRelatedFields(data, fieldStr) {
      const fieldList = fieldStr.split(';')
      fieldList.forEach(ele => {
        if (ele != '') {
          const fieldItems = ele.split('=')
          if (fieldItems[0] && fieldItems[1] && this.$refs.control) {
            this.$refs.control.forEach(item => {
              if (item.$attrs.nameId === fieldItems[0]) {
                if (fieldItems[0] === 'platformCheckStatus') {
                  item.itemData.readonly = data[fieldItems[1]]
                  if (data[fieldItems[0]]) {
                    item.initVal && item.initVal({
                      [item.$attrs.nameId]: ''
                    })
                  }
                } else {
                  item.initVal({
                    [item.$attrs.nameId]: data[fieldItems[1]]
                  })
                }
              }
            })
          }
        }
      })
    },

    // 控制相关字段显隐 - 业务消息推送权限配置，根据业务类型展示不同的字段
    handleFieldShow(strVal = '') {

    }
  },
  updated() { },
  beforeDestroy() { },
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
.query_control {
  &.query_control-padding {
    padding-bottom: 47px;
  }
  .com-item {
    display: inline-block;
    vertical-align: top;
    width: 33.3%;
  }
}
</style>
