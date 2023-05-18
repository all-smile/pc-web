export default {
  EnumAddEditFields: [
    {
      showLabel: true,
      fieldLabel: "商品名称",
      filedName: "goodsName",
      controlName: "Text",
      controlData: "",
      defaultValue: "",
      defaultOptions: "",
      labelWidth: "100px",
      rightWidth: "350px",
      labelPosition: "right",
      isNotNull: 1,
      placeholder: "",
      column: "1", // 一行显示几列 (1 / column) * 100 + '%' // 默认值 3 即一行默认显示3列
      readonly: false, // 是否禁用(下拉框没有只读，采取禁用方式)/只读
      clearable: false,
      noShow: false, // 字段级别的显隐控制
    },
    {
      showLabel: true,
      fieldLabel: "尺码",
      filedName: "size",
      controlName: "SelectDownBox",
      controlData: "",
      defaultValue: "",
      defaultOptions: [
        {
          dictCode: "M",
          dictName: "M",
        },
        {
          dictCode: "L",
          dictName: "L",
        },
        {
          dictCode: "XL",
          dictName: "XL",
        },
        {
          dictCode: "XXL",
          dictName: "XXL",
        },
      ],
      labelWidth: "100px",
      rightWidth: "350px",
      labelPosition: "right",
      isNotNull: 1,
      placeholder: "",
      column: "1", // 一行显示几列 (1 / column) * 100 + '%' // 默认值 3 即一行默认显示3列
      readonly: false, // 是否禁用(下拉框没有只读，采取禁用方式)/只读
      clearable: false,
      noShow: false, // 字段级别的显隐控制
    },
    {
      showLabel: true,
      fieldLabel: "上架日期",
      filedName: "faceCustomerTime",
      controlName: "DayPick",
      controlData: "",
      defaultValue: "",
      defaultOptions: "",
      labelWidth: "100px",
      rightWidth: "350px",
      labelPosition: "right",
      isNotNull: 1,
      placeholder: "",
      column: "1", // 一行显示几列 (1 / column) * 100 + '%' // 默认值 3 即一行默认显示3列
      readonly: false, // 是否禁用(下拉框没有只读，采取禁用方式)/只读
      clearable: false,
      noShow: false, // 字段级别的显隐控制
      noShowPickOption: true, // 不显示快捷筛选
    },
  ],
};
