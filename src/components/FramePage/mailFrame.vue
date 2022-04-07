
<script>
import mixin from './Vue/mixin.vue'
export default {
    name: 'mailFrame',
    mixins: [mixin],
    data() { return {} },
    created() { },
    methods: {
        showContent(content = '') {
            content = content.trim()
            if (this.Global.isFMApp) {
                content = content.replace(/<a /igm, "<a target='_blank' onclick='openlink(event,this)' ")
            } else {
                content = content.replace(/<a /igm, "<a target='_blank' ")
            }
            if (/^(<!DOCTYPE html>|<html)/.test(content) && /<\/html>$/.test(content)) {
                this.$el.onload = () => {
                    const doc = this.$el.contentDocument || this.$el.contentWindow.document
                    this.doc = doc
                    this.scrollTop()
                    doc.head.innerHTML = doc.head.innerHTML + this._getTempHead()
                }
                this.$el.setAttribute('srcdoc', content)
            } else {
                this.doc.body.innerHTML = content
                this.scrollTop()
            }
        },
        scrollTop(top = 0) {
            this.doc.documentElement.scrollTop = 0
        },
        _getTempHead() {
            return '<style>' +
                'body {' +
                'font-family: -apple-system, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", Arial, sans-serif;' +
                'font-size: 14px;' +
                '-webkit-font-smoothing: antialiased;' +
                '}' +
                '::-webkit-scrollbar {' +
                'width: 5px;' +
                'height: 5px;' +
                '}' +
                '::-webkit-scrollbar-thumb {' +
                'background-color: #999;-webkit-border-radius: 5px;border-radius: 5px;' +
                '}' +
                '::-webkit-scrollbar-thumb:vertical:hover {' +
                'background-color: #666;' +
                '}' +
                '::-webkit-scrollbar-thumb:vertical:active {' +
                'background-color: #333;' +
                '}' +
                '::-webkit-scrollbar-button {' +
                'display: none;' +
                '}' +
                '::-webkit-scrollbar-track {' +
                'background-color: #f1f1f1;' +
                '}' +
                '</style>' +
                '<script>' +
                'function openlink(e, _this) {' +
                'if (e && e.preventDefault) {' +
                ' e.preventDefault()' +
                '} else {' +
                'window.event.returnValue = false' +
                '}' +
                'parent.window.openlink(_this.getAttribute("href"))' +
                '}' +
                '<\/script>'
        },
        getTempHtml() {
            return '' +
                '<!DOCTYPE html>' +
                '<html>' +
                '<head>' +
                '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">' +
                this._getTempHead() +
                '</head >' +
                `<body id="mailContent">${this._getCommonScript()}</body>` +
                '</html>'
        }
    },
    components: {

    }
}
</script>
