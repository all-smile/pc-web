<template>
  <div class="FileItem">
    <span class="FileItem__icon" :class="{'FileItem__icon--canClick':isUploaded}" @click="isUploaded?$emit('preview'):''">
      <img v-if="isPicture" class="FileItem__icon--img" ref="image" :src="imgUrl">
      <svg v-else class="FileItem__icon--svg" aria-hidden="true">
        <use :xlink:href="getSuffixSVG(item.name)"></use>
      </svg>
    </span>
    <template v-if="!isUploaded">
      <div class="FileItem__info">
        <div class="FileItem__info--name" :title="item.name">{{item.name}}</div>
        <div v-if="isUpLoading" class="progress">
          <div class="progress__bar">
            <div class="progress__total"></div>
            <div :style="{width:percent}" class="progress__now"></div>
          </div>
          <span class="progress__percent">{{percent}}</span>
        </div>
        <div v-else class="errorOperat">
          <span class="errorOperat__info">{{statusDescription[uploadStatus]}}</span>
          <span class="errorOperat__item" @click="reUpload()">重试</span>
        </div>
      </div>
      <i class="FileItem__stopBtn iconfont icon-close-bold-mini" @click="removeItem()"></i>
    </template>
    <template v-else>
      <div class="FileItem__info">
        <div class="FileItem__info--name" :title="item.name">{{item.name}}</div>
        {{getSize(item.size)}}
      </div>
      <div class="FileItem__mask"></div>
      <div class="successOperat clearfix">
        <i class="successOperat__item iconfont icon-search-dot" @click="$emit('preview')"></i>
        <i v-if="!disable" class="successOperat__item iconfont icon-del" @click="removeItem()"></i>
      </div>
    </template>

  </div>
</template>

<script>
import { getSuffix, isHasSuffix, formatValidTime, getUUID } from '@/libs/utils.js'
import fileUpload, { CancelToken, isCancel } from '@/libs/fileUpload2'
import OSS from 'ali-oss'
const UPLOAD_STATUS = Object.freeze({
  UN_INIT: 'unInit', // 未初始化
  LOADING: 'loading', // 上传中
  FAILED: 'failed', // 上传失败
  CANCELED: 'canceled', // 取消上传
  ERROR: 'error', // 发生出错误
  SUCCESS: 'success' // 上传成功
})
export default {
  name: 'FileItem',
  props: {
    disable: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      default: () => ({})
    },
    ossConfig: {
      type: Object,
      default: () => ({})
    },
    formName: {
      type: String,
      default: 'fileToUpload'
    },
    method: {
      type: String,
      default: 'PUT'
    },
    isOssUpload: {
      type: Boolean,
      default: false
    },
    ossObjectPrefix: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      imgUrl: '',
      isUpLoading: true,
      percent: '0%',
      retryTime: 0,
      canRetryTime: 1,
      ossClient: null,
      cancelToken: null,
      uploadStatus: UPLOAD_STATUS.UN_INIT,
      statusDescription: Object.freeze({
        [UPLOAD_STATUS.UN_INIT]: '未初始化',
        [UPLOAD_STATUS.LOADING]: '上传中',
        [UPLOAD_STATUS.FAILED]: '上传失败',
        [UPLOAD_STATUS.CANCELED]: '取消上传',
        [UPLOAD_STATUS.ERROR]: '发生错误',
        [UPLOAD_STATUS.SUCCESS]: '上传成功'
      })
    }
  },
  created() {
    // this.initOssClient()
  },
  mounted() {
    if (!this.item.isNewFile) {
      this.uploadStatus = UPLOAD_STATUS.SUCCESS
    }
    this.getImgUrl()
    this.upload()
  },
  computed: {
    isPicture() {
      let name = this.item.name
      if (!name) { return false }
      let picFormat = ['png', 'jpg', 'jpeg', 'gif', 'bmp']
      let nameSuffix = getSuffix(name) || ''
      return picFormat.includes(nameSuffix.toLowerCase())
    },
    isUploaded() {
      return this.uploadStatus === UPLOAD_STATUS.SUCCESS
    }
  },

  methods: {
    getSize(size) {
      if (size > 1024) {
        return parseFloat(size / 1024).toFixed(2) + ' M'
      } else {
        return parseFloat(size).toFixed(2) + ' KB'
      }
    },
    getImgUrl() {
      if (!this.isPicture) {
        return
      }

      if (this.isUploaded) {
        let isBig = this.item.size >= (20 * 1024)
        this._getOriginImgUrl(this.item.url, isBig)
      } else {
        this._getLocalImgUrl()
      }
    },
    _getLocalImgUrl() {
      this.imgUrl = this.Global.initImg
      let reader = new FileReader()
      reader.onload = () => {
        this.imgUrl = reader.result
      }
      reader.readAsDataURL(this.item.file)
    },
    _getOriginImgUrl(url, isBig = false, times = 3) {
      if (!this.imgUrl) {
        this.imgUrl = this.Global.initImg
      }

      let afterUrl = ''
      let reg = new RegExp(/^(HTTP|HTTPS):\/\//i)
      if (!reg.test(url)) {
        afterUrl = this.getGlobalImgSrc(url, '34x34')
      } else if (new RegExp(this.Global.ossFileUrl).test(url)) {
        afterUrl = url + (isBig ? '' : '?x-oss-process=image/resize,m_fixed,h_34,w_34')
      } else {
        afterUrl = url
      }

      times--
      let img = new Image()
      img.src = afterUrl
      img.onload = () => {
        this.imgUrl = afterUrl
        img = null
      }
      img.onerror = () => {
        if (times > 0) {
          setTimeout(() => {
            this._getOriginImgUrl(url, isBig, times)
          }, 2 * 1000)
        } else {
          this.imgUrl = afterUrl
        }
        img = null
      }
    },
    async upload(isAutoRetry = false) {
      if (this.isUploaded) { return }
      this.isUpLoading = true
      if (this.isOssUpload) {
        if (isAutoRetry) {
          await this._normalUpload()
        } else {
          await this._ossUpload()
        }
      } else {
        if (isAutoRetry) {
          await this._ossUpload()
        } else {
          await this._normalUpload()
        }
      }
      this.isUpLoading = false
      // 重试逻辑
      const { FAILED, UN_INIT, ERROR } = UPLOAD_STATUS
      const retryErrors = [FAILED, UN_INIT, ERROR]
      if (retryErrors.includes(this.uploadStatus) && this.retryTime < this.canRetryTime) {
        this.retryTime += 1
        this.$nextTick(() => {
          this.reUpload(true)
        })
      }
    },
    reUpload(isAutoRetry = false) {
      this.percent = '0%'
      this.upload(isAutoRetry)
    },
    removeItem() {
      if (this.cancelToken && !this.isUploaded) {
        this.cancelToken.cancel('上传终止')
      }
      this.$emit('remove')
    },
    // @deprecated
    initOssClient() {
      if (this.isOssUpload && Object.keys(this.ossConfig).length) {
        this.ossClient = new OSS(this.ossConfig)
      }
    },
    uploadSuccess(url, code = -1) {
      if (url == '' || url === (void 0) || code.toString() !== this.Global.RES_OK) {
        this.uploadStatus = UPLOAD_STATUS.ERROR
        return
      }
      this.uploadStatus = UPLOAD_STATUS.SUCCESS
      Object.assign(this.item, { url })
      delete this.item.file
      delete this.item.isNewFile
      this.$emit('success')
      this.getImgUrl()
    },
    async _normalUpload() {
      this.cancelToken = CancelToken.source()
      try {
        let result = await fileUpload({
          method: this.method,
          url: this.url,
          cancelToken: this.cancelToken.token,
          accessToken: this.accessToken == 'true' ? this.getToken()[this.Global.accessToken] : '',
          FileList: [this.item.file],
          formName: this.formName,
          onprogress: (percent = 0) => { // 上传进度
            this.percent = percent + '%'
          },
          onloadstart: (event) => { }
        })
        this.uploadSuccess(result[0].data, result[0].code)
      } catch (error) {
        if (isCancel(error)) {
          this.uploadStatus = UPLOAD_STATUS.CANCELED
          return
        }

        this.uploadStatus = UPLOAD_STATUS.FAILED
      }
    },
    async _ossUpload() {
      if (!Object.keys(this.ossConfig).length) {
        this.uploadStatus = UPLOAD_STATUS.UN_INIT
        return
      }
      let ossClient = new OSS(this.ossConfig)

      this.cancelToken = ossClient
      const fileName = this.item.name ?? (new Date() * 1 + '.' + this.item.file.type.split('/')[1].toLowerCase())
      const headers = ['dev', 'test'].includes(window.runtime)
        ? { 'Content-Disposition': `attachment;filename="${encodeURI(fileName)}"` }
        : {}
      let pathName = fileName
      if (false) {
        let suffix = getSuffix(fileName)
        suffix = suffix == fileName ? '' : suffix
        pathName = getUUID().replace(/-/g, '') + '.' + suffix
      }

      // 细分文件夹 避免文件重名覆盖的问题
      const subFolderName = formatValidTime(+new Date(), 'HHmmss')
      const objectName = this.ossObjectPrefix.replace(/\/+$/, '') + '/' + subFolderName + '/' + pathName

      try {
        let result = await ossClient.multipartUpload(objectName, this.item.file, {
          headers,
          progress: (p) => {
            this.percent = Math.floor(p * 100) + '%'
          }
        })

        /* `${this.Global.ossFileUrl}${urlIsEncode(result.name)}` */
        this.uploadSuccess(ossClient.getObjectUrl(result.name, this.Global.ossFileUrl), this.Global.RES_OK)
        this.cancelToken = null
      } catch (error) {
        this.cancelToken = null
        if (ossClient.isCancel()) {
          this.uploadStatus = UPLOAD_STATUS.CANCELED
        } else {
          this.uploadStatus = UPLOAD_STATUS.FAILED
        }
      }
    },

    getSuffixSVG(filename) {
      console.log('filename=', filename);
      let suffix = getSuffix(filename)
      return '#file-' + isHasSuffix(suffix)
    },
    getSuffix(filename) {
      let suffix = getSuffix(filename)
      return 'file-' + isHasSuffix(suffix)
    }
  },
  watch: {
    /*  ossConfig() {
         this.initOssClient()
     } */
  },
  components: {

  }
}
</script>
<style lang='less' rel='stylesheet/less' scoped>
@import "./index.less";
</style>
