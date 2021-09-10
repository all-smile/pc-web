<template>
    <div class="DragDialog" v-show="isShow">
        <span class="close text-hover" @click="isShow = false"><i class="iconfont icon-close"></i></span>
        <span class="before" v-show="!showTip">拖动文件到此区域</span>
        <span class="after" v-show="showTip">拖进后松开鼠标</span>
    </div>
</template>

<script>
export default {
    name: 'DragDialog',
    props: {
        // 限制所选文件大小
        limitSize: {
            type: Number,
            default: 10
        },
        spatial: {
            type: Number,
            default: 0
        },
        preProcess: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isShow: false,
            // isShow: true,
            showTip: false,
            isBrowserInsideDrag: false
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$parent.$el.parentNode.after(this.$el)

            document.addEventListener('dragstart', this._onDragdStart)
            document.addEventListener('dragend', this._onDragdEnd)

            document.addEventListener('dragleave', this._onDragleave)
            document.addEventListener('drop', this._onDrop)
            document.addEventListener('dragenter', this._onDragenter)
            document.addEventListener('dragover', this._onDragover)

            this.$el.addEventListener('dragenter', this._thisDragenter)
            this.$el.addEventListener('dragleave', this._thisDragleave)
            this.$el.addEventListener('drop', this._thisDrop)
        })
    },
    beforeDestroy() {
        document.removeEventListener('dragstart', this._onDragdStart)
        document.addEventListener('dragend', this._onDragdEnd)

        document.removeEventListener('dragleave', this._onDragleave)
        document.removeEventListener('drop', this._onDrop)
        document.removeEventListener('dragenter', this._onDragenter)
        document.removeEventListener('dragover', this._onDragover)

        this.$el.removeEventListener('dragenter', this._thisDragenter)
        this.$el.removeEventListener('dragleave', this._thisDragleave)
        this.$el.removeEventListener('drop', this._thisDrop)
    },
    methods: {
        /* 说明是浏览器内部的拖动 */
        _onDragdStart() {
            this.isBrowserInsideDrag = true
        },
        _onDragdEnd() {
            this.isBrowserInsideDrag = false
        },
        // 有拖拽进来松开时
        _onDragleave(e) {
            e.preventDefault()
            setTimeout(() => {
                if (this.isShow && !this.showTip) {
                    this.isShow = false
                }
            }, 2000)
        },
        _onDrop(e) {
            e.preventDefault()
        },
        _onDragenter(e) {
            e.preventDefault()
            if (!this.isShow && !this.isBrowserInsideDrag) {
                this.isShow = true
            }
        },
        _onDragover(e) {
            e.preventDefault()
        },

        _thisDragenter(e) {
            this.showTip = true
            e.stopPropagation()
        },
        _thisDragleave(e) {
            this.showTip = false
            e.stopPropagation()
        },
        _thisDrop(e) {
            e.preventDefault()
            let files = e.dataTransfer.files
            if (!this.preProcess) {
                this.$emit('change', files)
                this.isShow = false
                return
            }
            if (files.length === 0) { return }

            // 检测文件大小限制，并复制一份待用
            let newFiles = []
            let countM = 0
            for (var i = 0; i < files.length; i++) {
                let fileSize_M = (files[i].size / 1048576).toFixed(2) // 转成M，并保存2位小数

                if (fileSize_M > this.limitSize) {
                    this.$message.warning('包含超过 ' + this.limitSize + ' M的文件不能上传')
                    return
                }
                countM = countM + fileSize_M
                newFiles.push(files[i])
            }
            if (this.spatial > 0) {
                let Surplus = this.SpatialQuery()
                if (countM > Surplus) {
                    this.$message.warning('空间不足，无法导入')
                    return
                }
            }

            this.$emit('change', newFiles)
            this.isShow = false
        }

    }
}
</script>

<style lang="less" ref="stylesheet/less" scoped>
@import "./zh-cn.less";
</style>
