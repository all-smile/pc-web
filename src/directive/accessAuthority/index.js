import Vue from 'vue'

Vue.directive('accessAuthority', {
  bind: function (el, binding, vnode) {
    let paths = el.href.split('#')
    if (paths && paths.length > 0) {
      let path = paths[1]
      // 不允许访问
      if (vnode.context.isAccessAuthority(path)) {
        let span = document.createElement('span')
        span.innerHTML = el.innerHTML
        span.setAttribute('disabled', 'disabled')
        span.style.cssText = 'cursor:not-allowed;'
        el.parentNode.replaceChild(span, el)
      }
    }
  },
  inserted: function (el, binding, vnode) { }
})
