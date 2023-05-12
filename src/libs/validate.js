// 外部链接验证 - 可用于外链跳转控制
export const isExternal = (path) => {
  const reg = /^(https?:|mailto:|tel:)$/;
  return reg.test(path);
};

/**
 *  element-ui 表单验证函数封装
 * rule - form表单当前验证的field字段rule规则
 * value - 当前控件返回值
 * callback - 回调函数，验证成功直接回调，验证失败回调函数返回一个带错误信息的error实例
 *  */
export const validator = {
  // 数字验证
  number(rule, value, callback) {
    const reg = /^\d+$/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error("数字类型错误"));
    } else {
      callback();
    }
  },

  // 年龄验证
  age(rule, value, callback) {
    const reg = /^\d+$/;
    if (value && reg.test(value)) {
      const _age = parseInt(value);
      if (_age < 200) {
        callback();
      } else {
        callback(new Error("年龄不合法"));
      }
    } else if (value && !reg.test(value)) {
      callback(new Error("数字类型错误"));
    } else {
      callback();
    }
  },

  // 邮编验证
  postcode(rule, value, callback) {
    const reg = /^[1-9]\d{5}(?!\d)$/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error("邮编格式不正确"));
    } else {
      callback();
    }
  },

  // ip验证
  ip(rule, value, callback) {
    const reg =
      /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error("ip地址格式不正确"));
    } else {
      callback();
    }
  },

  // 固定电话和小灵通验证
  telephone(rule, value, callback) {
    const reg =
      /(^\d{3}-\d{7,8}$)|(^\d{4}-\d{7,8}$)|(^\d{3}\d{7,8}$)|(^\d{4}\d{7,8}$)|(^\d{7,8}$)/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error("固定电话和小灵通电话格式不正确"));
    } else {
      callback();
    }
  },

  // 手机号验证
  phone(rule, value, callback) {
    const reg =
      /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error("手机号格式不正确"));
    } else {
      callback();
    }
  },

  // 身份证号码验证
  IDCard(rule, value, callback) {
    const reg =
      /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error("身份证格式不正确"));
    } else {
      callback();
    }
  },
};
