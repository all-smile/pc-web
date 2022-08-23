// 注册全局自定义指令 `v-moreIcon`
import Vue from "vue";

Vue.directive("moreIcon", {
  // 被绑定
  bind: function () {},
  // 绑定元素插入到DOM节点
  inserted: function (el) {
    // 绑定元素的父元素
    const p_w = el.parentNode.offsetWidth;
    // 绑定元素的上一个兄弟元素
    const s_w = el.previousElementSibling.offsetWidth;

    // 20: icon 的宽度； 文本的最大宽度 calc(100% - 20px)
    if (p_w - s_w <= 20) {
      // 一行文本已满格，显示icon
    } else {
      // 文本没有满一行，隐藏icon
      el.style.display = 'none'
    }
  },
  // 组件更新调用
  update: function () {},
  // 组件更新完成
  componentUpdated: function () {},
  // 解绑
  unbind: function () {},
});
