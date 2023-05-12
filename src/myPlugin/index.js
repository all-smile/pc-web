/* eslint-disable */
// 插件开发

const MyPlugin = {};
const myAlert = function () {
  alert(222);
};

MyPlugin.install = function (Vue) {
  // 测试使用
  Vue.prototype.$myAlert = myAlert;

  // 数组对象排序 asc-升序 des-降序
  Array.prototype.sortListObjByKey = function (key, order = "asc") {
    const that = this;
    const comparefn = (obj1, obj2) => {
      if (order === "asc") {
        return obj1[key] - obj2[key];
      }
      return obj2[key] - obj1[key];
    };
    return that.sort(comparefn);
  };
};

export default MyPlugin;
