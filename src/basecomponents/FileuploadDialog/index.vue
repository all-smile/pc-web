<template>
    <div class="FileuploadDialog" v-if="isShow">
        <!-- <div class="FileuploadDialog"> -->
        <div v-if="noShowClose == 'false'" class="close" v-on:click="close"><i class="iconfont icon-close"></i></div>
        <ul class="FileItemBox">
            <li class="item" v-for="(item,index) in files" :key="index">
                <div class="title">{{item.name}}</div>
                <div class="percent">
                    <div class="percentBox">
                        <div class="progressBar" ref="progressBar"></div>
                    </div>
                </div>
                <div class="scheduleValue" ref="scheduleValue">0%</div>
            </li>
        </ul>
    </div>
</template>

<script>
import fileUpload2, { CancelToken } from '@/libs/fileUpload2'
import fileUpload from '@/libs/fileUpload'

import { formatValidTime, getSuffix, getUUID } from '@/libs/utils'

import OSS from 'ali-oss'
// 二进制文件转Blob
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(',')
    var mime = arr[0].match(/:(.*?);/)[1]
    var bstr = atob(arr[1])
    var n = bstr.length
    var u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}
export default {
    name: 'FileuploadDialog',
    props: {
        url: {
            type: String,
            required: true
        },
        accessToken: {
            type: String,
            default: 'false'
        },
        formName: {
            type: String,
            default: 'fileToUpload'
        },
        format: {
            type: String,
            default: ''
        },
        method: {
            type: String,
            default: 'PUT'
        },
        isShowDialog: {
            type: Boolean,
            default: false
        },
        noShowClose: {
            type: String,
            default: 'false'
        },
        closeMethod: {
            type: Function,
            default: function () {
                console.log('"closeMethod"')
            }
        },
        fileUploadSuccess: {
            type: Function,
            default: function (res) {
                // console.log(res);
            }
        },
        fileUploadError: {
            type: Function,
            default: function (res) {
                // console.log(res);
            }
        },
        startUpload: {
            type: Function,
            default: function (event) {
                // console.log(event);
            }
        },
        maxNum: {
            type: Number,
            default: 20
        },
        isOssUpload: {
            type: Boolean,
            default: false
        },
        cId: {
            type: [String, Number],
            default: ''
        },
        mailAccount: {
            type: String,
            default: 'anonymous'
        }
    },
    data() {
        return {
            isShow: this.isShowDialog,
            files: [],
            fileIndex: 0,
            dateStr: formatValidTime(+new Date(), 'yyyyMMdd'),
            cancelToken: null,
            ossClient: null
        }
    },
    created() {
        if (this.isOssUpload) {
            this.getOSSClient()
        }
        this.$watch('isOssUpload', () => {
            if (this.isOssUpload) {
                this.getOSSClient()
            }
        })
    },
    mounted() {
        document.body.appendChild(this.$el)
    },
    beforeDestroy() {
        this.ossClient = null
    },
    methods: {
        async upload(inputElement, autoFiles) {
            let files = []
            if (autoFiles) {
                files = autoFiles
            } else {
                if (Array.isArray(inputElement)) {
                    inputElement.forEach((item) => {
                        // 解决图片name丢失问题
                        files.push(dataURLtoBlob(item))
                    })
                } else { // 是input type="file"
                    files = inputElement.files
                }
            }

            // 允许上传文件后缀
            let format = []
            if (this.format !== '') {
                format = this.format.split(',')
            }
            // 说明需要过滤,过滤出允许上传的文件
            if (format.length > 0) {
                let newfiles = []
                for (let i = 0; i < files.length; i++) {
                    const suffix = '.' + files[i].name.split('.').pop().toLowerCase()
                    if (format.indexOf(suffix)) {
                        newfiles.push(files[i])
                    }
                }
                files = newfiles
            }

            if (files && files.length > 0) {
                if (this.maxNum != null && files.length > this.maxNum) {
                    this.$message('选择数量超过最大限制数量,目前还可上传' + this.maxNum + '张，请重新选择！')
                    this.fileUploadError()
                    return false
                } else {
                    this.isShow = true
                    this.files = files
                }
            } else {
                this.fileUploadError()
            }

            if (this.isOssUpload) {
                this.ossUpload(files, () => {
                    if (!Array.isArray(inputElement) && !autoFiles) {
                        inputElement.value = ''
                    }
                })
                return
            }
            this._upload2(files, () => {
                if (!Array.isArray(inputElement) && !autoFiles) {
                    inputElement.value = ''
                }
            })
            /* if (window.runtime === 'prod') {
                this._upload(files, () => {
                    this._close()
                    if (!Array.isArray(inputElement) && !autoFiles) {
                        inputElement.value = ''
                    }
                })
            } else {
                this._upload2(files, () => {
                    if (!Array.isArray(inputElement) && !autoFiles) {
                        inputElement.value = ''
                    }
                })
            } */
        },
        _progress(index, p) {
            try {
                this.$refs.progressBar[index].style.width = p
                this.$refs.scheduleValue[index].innerHTML = p
            } catch (error) {
                console.log(error)
            }
        },
        _upload(FileList, fn) {
            let Upload = fileUpload({
                method: this.method,
                url: this.url,
                accessToken: this.accessToken == 'true' ? this.getToken()[this.Global.accessToken] : '',
                FileList,
                formName: this.formName,
                onprogress: (event) => { // 上传进度
                    this.$refs.progressBar[this.fileIndex].style.width = event.percent + '%'
                    this.$refs.scheduleValue[this.fileIndex].innerHTML = event.percent + '%'
                },
                onloadstart: (event) => { // 开始上传
                    this.startUpload(event)
                },
                onload: (res) => { // 上传成功
                    this.fileUploadSuccess(res)
                    this.fileIndex++
                    // console.log(this.fileIndex)
                    if (this.fileIndex === files.length) {
                        // console.log("ok")
                        fn && fn()
                    }
                },
                onerror: (event) => { // 出错
                    this.fileUploadError()
                    console.log('上传失败返回')
                    console.log(event)
                },
                onabort: function (event) { // 取消上传
                    // console.log("取消上传",event);
                },
                onloadend: function (event) { // 不管成功还是失败都执行
                    // console.log("不管成功还是失败都执行",event);
                }
            })
            this.cancelToken = { cancel: () => { Upload.abort() } }
        },
        /* 这个接口修改 */
        async _upload2(FileList, fn) {
            this.cancelToken = CancelToken.source()
            try {
                let res = await fileUpload2({
                    method: this.method,
                    url: this.url,
                    cancelToken: this.cancelToken.token,
                    accessToken: this.accessToken == 'true' ? this.getToken()[this.Global.accessToken] : '',
                    FileList,
                    formName: this.formName,
                    onprogress: (percent = 0, index) => { // 上传进度
                        this.$refs.progressBar[index].style.width = percent + '%'
                        this.$refs.scheduleValue[index].innerHTML = percent + '%'
                    },
                    onloadstart: (event) => { // 开始上传
                        this.startUpload(event)
                    }
                })
                res.forEach(res => {
                    this.fileUploadSuccess(res, FileList[0])
                })
                this._close()
            } catch (error) {
                console.log(error)
                this.fileUploadError()
            }
            fn && fn()
        },
        async ossUpload(FileList, fn) {
            if (!this.ossClient) {
                console.log('oss初始化未完成')
                return
            }
            this.cancelToken = this.ossClient
            let uploadTask = []
            let _mailAccount = this.mailAccount.trim()
            const mailAccount = _mailAccount == '' ? 'anonymous' : _mailAccount
            FileList.forEach((file, index) => {
                const fileName = file.name ?? (new Date() * 1 + '.' + file.type.split('/')[1].toLowerCase())

                let pathName = fileName
                if (false) {
                    let suffix = getSuffix(fileName)
                    suffix = suffix == fileName ? '' : suffix
                    pathName = getUUID().replace(/-/g, '') + '.' + suffix
                }
                const subFolderName = formatValidTime(+new Date(), 'HHmmss')
                const objectName = `${this.cId}/mail/${mailAccount}/delivery/attachment/${this.dateStr}/${subFolderName}/${pathName}`
                uploadTask.push(this.ossClient.multipartUpload(objectName, file, {
                    /*   headers: {
                          // 'Content-Disposition': `attachment;filename=\"${encodeURI(fileName)}\"`
                          'Content-Disposition': `attachment;filename=\"${fileName}\"`
                      }, */
                    progress: (p) => {
                        this._progress(index, Math.floor(p * 100) + '%')
                    }
                }))
            })
            try {
                let result = await Promise.all(uploadTask)
                result.forEach(res => {
                    const url = this.ossClient.getObjectUrl(res.name, this.Global.ossFileUrl)
                    // `${this.Global.ossFileUrl}${res.name}`
                    this.fileUploadSuccess({ code: 0, data: url })
                })
                this._close()
            } catch (error) {
                console.log(error)
            }
            fn && fn()
        },
        async getOSSClient() {
            try {
                const url = this.Global.baseURL + this.Global.api.Files.oss
                let res = await this.$http.get(url, {})
                if (res.body.code.toString() === this.Global.RES_OK) {
                    let {
                        region,
                        AccessKeyId,
                        AccessKeySecret,
                        SecurityToken,
                        bucket
                    } = res.body.data
                    this.ossClient = new OSS({
                        region: region,
                        accessKeyId: AccessKeyId,
                        accessKeySecret: AccessKeySecret,
                        stsToken: SecurityToken,
                        bucket: bucket,
                        useFetch: false
                    })
                } else {

                }
            } catch (error) {
                console.log(error)
            }
        },
        _close() {
            this.isShow = false
            this.fileIndex = 0
            this.closeMethod()
        },
        close() {
            this._close()
            this.cancelToken.cancel()
        }
    }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.FileuploadDialog {
    width: 600px;
    height: auto;
    background-color: #fff;
    position: fixed;
    z-index: 9999999;
    left: 50%;
    top: 5%;
    margin-left: -300px;
    box-shadow: 0px 0px 50px #888888;
    border-radius: 3px;
    .close {
        width: 20px;
        height: 20px;
        background-color: #d0021b;
        position: absolute;
        right: -10px;
        top: -10px;
        border-radius: 50%;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        color: #fff;
        cursor: pointer;
        i {
            font-size: 12px;
        }
    }
    .FileItemBox {
        height: 100%;
        padding: 10px;
        .item {
            font-size: 12px;
            height: 30px;
            line-height: 30px;
            .title {
                width: 20%;
                height: 100%;
                float: left;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: center;
            }
            .percent {
                width: 70%;
                height: 100%;
                float: left;
                overflow: hidden;
                .percentBox {
                    width: 95%;
                    height: 10px;
                    border-radius: 50px;
                    margin: 10px auto;
                    border: 1px burlywood solid;
                    overflow: hidden;
                    .progressBar {
                        background-color: burlywood;
                        width: 0%;
                        height: 100%;
                        transition: width 0.5s;
                    }
                }
            }
            .scheduleValue {
                width: 10%;
                height: 100%;
                float: left;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: center;
            }
        }
    }
}
</style>
