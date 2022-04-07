<template>

  <!-- 文件预览 -->
  <el-dialog title="文件预览" :visible.sync="PreviewVisible" top="5%" fullscreen custom-class="previewBox" @close="onClose()" :modal="false">
    <!-- 关闭预览 -->
    <el-button type="danger" class="closeBtn" @click="PreviewVisible=false">关闭预览</el-button>
    <div v-if="PreviewVisible" class="box">
      <template v-if="contentShow">
        <!-- 图片 -->
        <transition name="el-fade-in-linear">
          <img v-if="hasExtName(typeMap.imgArr)" :src="url" @dblclick="zoom($event)" />
        </transition>

        <!-- 视频 -->
        <transition name="el-fade-in-linear">
          <video v-if="hasExtName(typeMap.videoArr)" :src="url " controls="controls ">
            您的浏览器不支持 video 标签。
          </video>
        </transition>

        <!-- 文本 -->
        <transition name="el-fade-in-linear ">
          <div v-if="hasExtName(typeMap.textArr)" class="textBox MXscroll">
            <pre>{{textContent}}</pre>
          </div>
        </transition>

        <!-- office  xml文档-->
        <transition name="el-fade-in-linear">
          <iframe class="officeBox MXscroll" v-if="hasExtName(typeMap.officeArr)" :src="url" frameborder="0"></iframe>
        </transition>

        <!-- xml文档-->
        <transition name="el-fade-in-linear">
          <previewFrame ref="xmliframe" @load="loadedContent" class="xmlBox MXscroll" v-if="hasExtName(typeMap.xmlArr)"></previewFrame>
          <!--  <iframe ref="xmliframe" @load="loadedContent" :src="`${Global.iframePublicPath}static/preview/content.html`" class="xmlBox MXscroll" v-if="hasExtName(typeMap.xmlArr)" frameborder="0"></iframe> -->
        </transition>

        <!-- eml邮件-->
        <transition name="el-fade-in-linear">
          <eml class="emlBox MXscroll" v-if="hasExtName(typeMap.emlArr)" :data="textContent"></eml>
        </transition>

        <!-- pdf -->
        <transition name="el-fade-in-linear">
          <iframe frameborder="0" border="0" class="pdfBox MXscroll" v-if="hasExtName(typeMap.pdfArr)" :src="url"></iframe>
        </transition>
      </template>
      <!-- 加载中 -->
      <transition name="el-fade-in-linear">
        <loading v-if="isLoading" class="centerShow"></loading>
      </transition>

      <!-- 不支持 -->
      <transition name="el-fade-in-linear">
        <div v-if="isNoSupport" class="centerShow">
          {{`抱歉！暂不支持 ${data[index].fileExtName} 格式的预览。`}}
        </div>
      </transition>

      <!-- 错误 -->
      <transition name="el-fade-in-linear">
        <div v-if="isError" class="centerShow">
          加载失败!
        </div>
      </transition>

      <!-- office文件太大 -->
      <transition name="el-fade-in-linear">
        <div v-if="isTooLarge" class="centerShow largeError">
          <p class="fileName">{{`${data[index].fileName}.${data[index].fileExtName}`}}</p>
          <p class="info">这个文档太大请下载后查看!</p>
        </div>
      </transition>

      <div v-if="preShow" @click="preFile()" class="previewBtn preBtn">
        <i class="iconfont icon-page-left"></i>
      </div>

      <div v-if="nextShow" @click="nextFile()" class="previewBtn nextBtn">
        <i class="iconfont icon-page-right"></i>
      </div>
    </div>
  </el-dialog>

</template>
<script>
import Loading from '@/basecomponents/Loading/index'
import { getSuffix } from '@/libs/utils.js'
import Eml from './Vue/Eml/index'
import previewFrame from '@/components/FramePage/previewFrame'
export default {
  name: 'DocPreview',
  props: {
    excludeTxt: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      PreviewVisible: false,
      url: '',
      mId: '',
      data: [],
      index: 0,
      textContent: '',
      isLoading: false,
      isError: false,
      isNoSupport: false,
      isTooLarge: false,
      typeMap: Object.freeze({
        imgArr: ['png', 'jpg', 'jpeg', 'gif', 'bmp'],
        videoArr: ['mp4', 'flv', 'm3u8', 'rtmp', 'mp3'],
        textArr: ['txt'],
        officeArr: ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'],
        pdfArr: ['pdf'],
        xmlArr: ['html', 'htm', 'xml'],
        emlArr: ['eml']
      }),
      canShowArr: Object.freeze([]),
      isToMail: false, // 是否来自邮件附件的预览
      previousRequest: null,
      isZoom: false
    }
  },
  computed: {
    contentShow() {
      return !this.isLoading && !this.isError && !this.isNoSupport && !this.isTooLarge
    },
    preShow() {
      return !this.isLoading && this.data.length > 0 && this.index > 0
    },
    nextShow() {
      return !this.isLoading && this.data.length > 0 && this.index < this.data.length - 1
    }
  },

  methods: {
    async onClose() {
      await this.$nextTick()
      this.$emit('close')
    },
    zoom(event) {
      this.isZoom = !this.isZoom
      let img = event.target
      if (this.isZoom) {
        let pos = img.getBoundingClientRect()

        let x = event.clientX - pos.left
        let y = event.clientY - pos.top
        img.style.cssText = `
                    margin-top:-${y}px;
                    margin-left:-${x}px;`

        img.classList.add('bigImage')
      } else {
        img.classList.remove('bigImage')
        img.style.cssText = 'margin:0;'
      }
    },
    /*  show() 为给邮件附件预览用，传来的 dataArr数组 每项 为 name文件全名、url文件URL，特殊
     处理  */
    show(data, index, mId) {
      this.isToMail = true
      this.mId = mId
      // 文件后缀加上，后面调的方法里大量用到
      data.forEach(item => {
        item.fileExtName = getSuffix(item.name)
      })

      this.data = data
      this.index = index
      this.PreviewVisible = true
      this.canShowArr = Object.freeze([].concat(...Object.values(this.typeMap)))
      this.returnClose()
      this.viewInit()
    },
    open(dataArr, index) {
      this.isToMail = false
      /* 过滤掉文件夹数据 */
      let data = [].concat(dataArr)

      for (let i = 0; i < data.length; i++) {
        if (data[i].isFolder) {
          if (i <= index) {
            index--
          }
          data.splice(i, 1)
          i--
        }
      }
      this.data = data
      this.index = index
      this.PreviewVisible = true
      this.canShowArr = Object.freeze([].concat(...Object.values(this.typeMap)))
      this.returnClose()
      this.viewInit()
    },
    viewInit() {
      this.url = null
      this.textContent = ''

      this.isError = this.isNoSupport = this.isTooLarge = this.isZoom = false
      if (this.excludeTxt) this.canShowArr = this.canShowArr.filter(v => v != 'txt')
      if (!this.hasExtName(this.canShowArr)) {
        this.isNoSupport = true
        return
      }

      if (this.hasExtName([...this.typeMap.textArr, ...this.typeMap.emlArr, ...this.typeMap.xmlArr])) {
        /* 文本文件获取文件内容 */
        this.getTextContent()
      } else {
        let nowData = this.data[this.index]
        let size = parseInt(nowData.fileSize || nowData.size)
        /* excel文档限制 5m,其他限制10M */
        if ((this.hasExtName(this.typeMap.officeArr) && size > (1024 * 1024 * 10)) || (this.hasExtName(['xls', 'xlsx']) && size > (1024 * 1024 * 5))) {
          this.isTooLarge = true
          return
        }

        // 如果来自邮件附件，不用API 取 URL
        if (this.isToMail) {
          // url 销售日志上传图片附件,完整的链接

          let url = ''
          if (new RegExp(/^(HTTP|HTTPS):\/\//i).test(nowData.url)) {
            if (new RegExp(this.Global.downloadBaseUrl).test(nowData.url)) {
              url = nowData.url.replace(this.Global.downloadBaseUrl, this.Global.previewUrl)
            } else {
              url = nowData.url
            }
          } else {
            url = this.Global.previewUrl + nowData.url
          }
          /*  if (new RegExp(/(.aliyuncs.com|mf.fumamx.com)/i).test(nowData.url)) {
               this.goPreview(nowData.url)
               return
           }
          if (new RegExp(this.Global.downloadBaseUrl).test(nowData.url)) {
              url = nowData.url.replace(this.Global.downloadBaseUrl, this.Global.previewUrl)
          } else {
              url = this.Global.previewUrl + nowData.url
          } */
          this.goPreview(url)
        } else {
          this.getFileUrl(nowData)
        }
      }
    },
    /* 拒绝回退按钮的事件 */
    returnClose() {
      /*  let this = this
       window.addEventListener('popstate',
           function (e) {
               this.PreviewVisible = false
           }, false) */
    },
    _onReturnClose() {
      this.PreviewVisible = false
    },
    /* 上一张 */
    nextFile() {
      this.index++
      this.viewInit()
    },
    /* 下一张 */
    preFile() {
      this.index--
      this.viewInit()
    },
    /* 判断文件类型的数组中是否包含该文件  */
    hasExtName(arr) {
      let { fileExtName } = this.data[this.index] || { fileExtName: '' }
      return arr.includes(fileExtName.toLowerCase())
    },

    /* 获取文件的url */
    getFileUrl(item) {
      this.isLoading = true
      let url = this.Global.baseURL + this.Global.api.v2.folders_downloadURL
      let { fileId, fileVersion, isOverCid, billId } = item
      let params = {
        fileId,
        fileVersion
      }
      if (isOverCid !== null && isOverCid !== undefined) {
        Object.assign(params, { isOverCid })
      }
      if (billId) {
        Object.assign(params, { billId })
      }
      let data = {
        params,
        before(request) {
          if (this.previousRequest) {
            this.previousRequest.abort()
          }
          this.previousRequest = request
        }
      }

      this.$http.get(url, data)
        .then(res => {
          if (res.body.code.toString() == this.Global.RES_OK) {
            let _url = ''
            if (res.body.data[0].inLocalFileSystem == 1) {
              _url = this.Global.previewUrl + res.body.data[0].downloadURL
            } else {
              _url = res.body.data[0].downloadURL
            }
            this.goPreview(_url)
          } else {
            this.isLoading = false
            this.isError = true
            this.$message.error(this.msg(res.body))
          }
        })
        .catch(err => {
          if (err.status == 0) return

          this.isLoading = false
          this.isError = true
          this.$message.error('出错了')
        })
    },
    /**
         * 描述：文本内容的预览
         * 参数：html，xml需要传参数isXml
         *
         *
         * */
    getTextContent() {
      let params = {}
      let httpUrl = ''
      if (this.isToMail) {
        let { url, name } = this.data[this.index]
        params = {
          preViewUrl: url,
          fileName: name,
          mId: this.mId
        }
        httpUrl = this.Global.baseURL + this.Global.api.v2.folders_mailAttachmentPaser
      } else {
        let { fileId, fileVersion, isOverCid, billId } = this.data[this.index]
        params = { fileId, fileVersion }
        if (isOverCid !== null && isOverCid !== undefined) {
          Object.assign(params, { isOverCid })
        }
        if (billId) {
          Object.assign(params, { billId })
        }
        httpUrl = this.Global.baseURL + this.Global.api.v2.folders_file_content
      }

      let data = {
        params,
        before(request) {
          if (this.previousRequest) {
            this.previousRequest.abort()
          }
          this.previousRequest = request
        }
      }
      this.isLoading = true
      this.$http.get(httpUrl, data)
        .then(res => {
          if (res.body.code.toString() == this.Global.RES_OK) {
            this.textContent = res.body.data
          } else {
            this.isError = true
            this.$message.error(this.msg(res.body))
          }
          this.isLoading = false
        })
        .catch(err => {
          if (err.status == 0) return

          this.isLoading = false
          this.isError = true
          this.$message.error('出错了')
        })
    },
    loadedContent() {
      if (this.textContent == '' || this.textContent == undefined) {
        return
      }
      try {
        this.$refs.xmliframe.addContent(this.textContent)
      } catch (err) {
        console.log(' vm.showContent(this.content) ')
      }
    },

    // 根据后缀，选择预览方式
    goPreview(_url) {
      this.isLoading = true
      if (this.hasExtName(this.typeMap.imgArr)) {
        let img = new Image()
        img.src = _url
        img.onload = () => {
          this.url = _url
          img = null
          this.isLoading = false
        }
        img.onerror = () => {
          this.url = this.Global.errorImg
          img = null
          this.isLoading = false
          this.isError = true
        }
      } else if (this.hasExtName(this.typeMap.videoArr)) {
        this.url = _url
        this.isLoading = false
      } else if (this.hasExtName(this.typeMap.officeArr)) {
        _url = encodeURIComponent(_url)
        // this.url = `http://192.168.8.167:8012/onlinePreview?url=${_url}`
        this.url = `https://view.officeapps.live.com/op/embed.aspx?src=${_url}&wdStartOn=1&wdPrint=1&wdEmbedCode=1`
        this.isLoading = false
      } else if (this.hasExtName(this.typeMap.pdfArr)) {
        this.pdfView(_url)
      } if (this.hasExtName(this.typeMap.xmlArr)) {
        this.url = _url
        this.isLoading = false
      };
    },
    pdfView(src) {
      let apiUrl = `${this.Global.baseURL}${this.Global.api.Files.all_pdf}`
      apiUrl = apiUrl.replace(/^\/pcapi/i, `${this.domain.hostName}/pcapi`)
      let durl = `${apiUrl}?src=${encodeURIComponent(src)}`
      this.url = `${this.Global.assetPublicPath}static/pdf/web/viewer.html?file=${encodeURIComponent(durl)}`
      this.isLoading = false
    }
  },
  watch: {
    PreviewVisible(newVal) {
      if (newVal) {
        window.addEventListener('popstate', this._onReturnClose, false)
      } else {
        window.removeEventListener('popstate', this._onReturnClose, false)
      }
    }
  },
  components: {
    'loading': Loading,
    Eml,
    previewFrame
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "./zh-cn.less";
@import "./en.less";
</style>
