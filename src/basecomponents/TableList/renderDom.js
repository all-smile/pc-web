const renderDom = {
  props: {
    myvNode: {
      type: [Array, String, Object,Number],
    },
  },
  render(h) {
    // jsx - vNode 直接返回，交给框架处理（js语法带来很多可能，列表打标签功能）
    if (typeof this.myvNode === 'object') {
      return this.myvNode;
    }
    // 普通数据，直接包一层div，然后返回给页面
    return h(
      'div',
      {
        class: 'ellipsis',
      },
      this.myvNode
    )
  }
}

export default renderDom