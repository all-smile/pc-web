<script>
import mixin from './Vue/mixin.vue'
export default {
  name: 'viewFrame',
  data() {
    return {}
  },
  mixins: [mixin],
  methods: {
    addContent(content = '') {
      this.doc.body.innerHTML = content
    },
    getTempHtml() {
      return `` +
        `<!DOCTYPE html>` +
        `<html>` +
        `<head>` +
        `<meta charset="utf-8">` +
        `<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"> ` +
        `<style>` +
        `html,body {` +
        `background: #fff;` +
        `padding: 0;` +
        `margin: 0;` +
        `height: 100%;` +
        `overflow-x: hidden;` +
        `}` +
        `::-webkit-scrollbar {` +
        `width: 5px;` +
        `height: 5px;` +
        `}` +
        `::-webkit-scrollbar-thumb {` +
        `background-color: #999;` +
        `-webkit-border-radius: 5px;` +
        `border-radius: 5px;` +
        `}` +
        `::-webkit-scrollbar-thumb:vertical:hover {` +
        `background-color: #666;` +
        `}` +
        `::-webkit-scrollbar-thumb:vertical:active {` +
        `background-color: #333;` +
        `}` +
        `::-webkit-scrollbar-button {` +
        `display: none;` +
        `}` +
        `::-webkit-scrollbar-track {` +
        `background-color: #f1f1f1;` +
        `}` +
        `</style></head>` +
        `<body id="body">${this._getCommonScript()}</body>` +
        `</html>`
    }
  }
}
</script>
