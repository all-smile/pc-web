import Vue from 'vue'
Vue.directive('imgsrc', {
    bind: function (el, binding, vnode) { // 被绑定
        let initImg = el.getAttribute('data-initsrc') || vnode.context.Global.errorImg
        el.src = initImg // 初始化图片

        let Img = new Image()

        if (!binding.value) {
            el.src = initImg
            return
        }
        Img.onload = function () {
            // 加载成功后的图片
            el.src = Img.src
            Img = null
        }

        Img.onerror = function () {
            // 加载失败后的图片
            el.src = initImg
            Img = null
        }
        Img.src = binding.value
    },
    inserted: function () { // 绑定到节点

    },
    update: function (el, binding, vnode) { // 组件更新
        let initImg = el.getAttribute('data-initsrc') || vnode.context.Global.errorImg
        // 指令数据更新后图片的处理
        let Img = new Image()
        if (!binding.value) {
            el.src = initImg
            return
        }

        Img.onload = function () {
            el.src = Img.src
            Img = null
        }
        Img.onerror = function () {
            el.src = initImg
            Img = null
        }
        Img.src = binding.value
    },
    componentUpdated: function () { // 组件更新完成

    },
    unbind: function () { // 解绑

    }
})
