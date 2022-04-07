
<script>
import mixin from './Vue/mixin.vue'

export default {
  name: 'previewFrame',
  data() {
    return {}
  },
  mixins: [mixin],
  methods: {
    addContent(content = '') {
      this.doc.body.innerHTML = content.replace(/<a /igm, "<a target='_blank' ")
    },
    getTempHtml() {
      return '' +
        `<!DOCTYPE html>` +
        `<html>` +
        `<head>` +
        `<meta charset="utf-8">` +
        `<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">` +
        `<style>` +
        `body{` +
        `font-family: PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica, Arial, STHeitiSC-Light, simsun, WenQuanYi Zen Hei, WenQuanYi Micro Hei, "sans-serif";` +
        `max-width: 800px;` +
        `padding: 0;` +
        `margin: 0;` +
        `}` +
        `body * {` +
        `color: #626066;` +
        `max-width: 800px;` +
        `font-size: 15px;` +
        `line-height: 30px;` +
        `}` +
        `</style>` +
        `</head>` +
        `<body>${this._getCommonScript()}</body>` +
        `</html>`
    }
  }
}
</script>
