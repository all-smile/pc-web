<template>
  <iframe v-srcAttr frameborder="0"></iframe>
</template>

<script>
import { getUUID } from '@/libs/utils'
export default {
  directives: {
    srcAttr: {
      bind: function (el, binding, vnode) {
        if ('srcdoc' in document.createElement('iframe')) {
          el.setAttribute('srcdoc', vnode.context._getDocSrc())
        } else {
          el.setAttribute('src', vnode.context._getSrc())
        }
      }
    }
  },
  data() {
    return {
      id: `frameInstant${getUUID()}`,
      doc: null
    }
  },
  created() {
    if (!window.MxHtmlFrames) {
      window.MxHtmlFrames = {}
    }
    window.MxHtmlFrames[this.id] = this
  },
  beforeDestroy() {
    this.doc = null
    delete window.MxHtmlFrames[this.id]
  },
  methods: {
    _frameLoad(doc) {
      this.doc = doc
      this.$emit('load', doc)
    },
    _getDocSrc() {
      return this.getTempHtml()
    },
    _getSrc() {
      return '' +
        `javascript:void(function(){` +
        `document.open();` +
        (document.domain != location.hostname ? `document.domain="${document.domain}";` : '') +
        `document.write('${this.getTempHtml()}');` +
        `document.close();` +
        `}())`
    },
    _getCommonScript() {
      return `
                <script id="_initialScript">
                    setTimeout(function(){
                        var instant=window.parent.MxHtmlFrames["${this.id}"];
                        instant._frameLoad(document);
                    },0);
                    var _tmpScript = document.getElementById("_initialScript");
                    _tmpScript.parentNode.removeChild(_tmpScript);
                <\/script>
            `
    },
    getTempHtml() {
      throw new Error('请重写getTempHtml方法')
    }
  }
}
</script>
