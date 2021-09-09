<template>
    <div class="FileUpload" v-show="(lazyShow&&showfileList.length)||!lazyShow">
        <!-- 拖拽区 -->
        <drag-dialog v-if="isDrag" @change="dragDialogChange" :spatial="spatial" :limitSize="uploadFileMaxSize" :preProcess="false"></drag-dialog>
        <fileupload-dialog v-if="!showList" ref="fileuploadDialog" :url="uploadUrl" method="post" :closeMethod="close" :fileUploadSuccess="fileUploadSuccess" :mailAccount='mailAccount' :isOssUpload='isOssUpload' :cId='company.cId'></fileupload-dialog>
        <input type="file" ref="inputFile" class="hidden" name="firstname" value="" @change="fileChange" :multiple="multiple" :accept="accept" />

        <span @click="$refs.inputFile.click()">
            <slot name="trigger">
                <!--选择文件-->
            </slot>
        </span>
        <span v-if="!autoUpload" v-on:click="fileUpload">
            <slot>上传</slot>
        </span>

        <!-- 废弃的列表 start -->
        <ul v-if="fileList.length>0 &&showList &&false" class="fileList">
            <li class="fileItem" v-for="(item,index) in fileList" :key="index">
                <file-show :item="item"></file-show>
                <div class="descr">
                    <div class="name" :title="item.name">{{item.name}}</div>
                    {{getSize(item.size)}}
                </div>
                <div class="viewburs hidden" v-if="!disable">
                    <i class="iconfont icon-search-dot" @click="openPreview(index)"></i>
                </div>
                <span class="buts hidden" v-if="!disable">
                    <i class="iconfont icon-del" @click="delThis(index)"></i>
                </span>
            </li>
        </ul>
        <!-- 废弃的列表  end -->

        <div v-if="showList" class="clearfix">
            <file-item v-for="(item,index) in showfileList" :disable="disable" @success="fileItemUploadSuccess" @remove="removeItem(index)" @preview="openPreview2(item)" :item="item" :url="uploadUrl" :ossConfig="ossConfig" method="post" :isOssUpload="isOssUpload " :ossObjectPrefix="ossObjectPrefix" :key="item.size+item.name+index"></file-item>
        </div>
        <!-- 文件预览 -->
        <doc-preview v-if="showPreview" ref="filePreview" @close="showPreview=false"></doc-preview>
    </div>
</template>

<script>
/**
 * 描述：文件上传UI封装
 * 作者：向士健
 * 时间：2018/3/5
 */
import { getSuffix, isHasSuffix, formatValidTime } from '@/libs/utils.js'
import FileuploadDialog from '@/basecomponents/FileuploadDialog/index' // 图片上传及进度条插件
import FileShow from './FileShow/index'
import FileItem from './FileItem'
import DocPreview from '../DocPreview/index'
import DragDialog from './DragDialog/index'
import { mapGetters } from 'vuex'
export default {
    name: 'Fileupload',
    props: {
        // 是否显示列表
        showList: {
            type: Boolean,
            default: true
        },
        // 所选类型限制
        accept: {
            type: String,
            default: '*'
        },
        // 是否多选
        multiple: {
            type: Boolean,
            default: true
        },
        // 是否选择后自动上传，配合插槽按钮
        autoUpload: {
            type: Boolean,
            default: true
        },
        // 限制所选文件大小
        limitSize: {
            type: Number,
            default: 10
        },
        fileList: {
            type: Array,
            default: () => []
        },
        disable: {
            type: Boolean,
            default: false
        },
        spatial: {
            type: Number,
            default: 0
        },
        isDrag: {
            type: Boolean,
            default: false
        },
        isMailFile: {
            type: Boolean,
            default: false
        },
        mailAccount: {
            type: String,
            default: 'anonymous'
        },
        lazyShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            uploadUrl: this.Global.uploadUrl, // 图片服务器上传URL
            fileUrl: this.Global.downloadBaseUrl, // 文件下载url前缀
            filesBak: [],
            showfileList: [],
            flag: 0,
            showPreview: false,
            ossConfig: Object.freeze({}),
            ossLimitSize: 60,
            dateStr: formatValidTime(+new Date(), 'yyyyMMdd')
        }
    },
    computed: {
        ...mapGetters(['uploadWay']),
        isOssUpload() {
            return (this.uploadWay == 2 && this.isMailFile)
        },
        ossObjectPrefix() {
            let _mailAccount = this.mailAccount.trim()
            const mailAccount = _mailAccount == '' ? 'anonymous' : _mailAccount
            return `${this.company.cId}/mail/${mailAccount}/delivery/attachment/${this.dateStr}/`
        },
        uploadFileMaxSize() {
            return this.isOssUpload ? this.ossLimitSize : this.limitSize
        }
    },
    mounted() {
        console.log('-=-=-=', this.isMailFile)
        if (this.isMailFile) {
            this.getOssConfig()
        }
        this.showfileList = [...this.fileList]
    },
    methods: {
        // fileUploadError() {
        //     this.$message.error('上传失败，请检查文件格式！')
        // },
        // 有拖拽时
        async openPreview(index) {
            this.showPreview = true
            await this.$nextTick()
            this.$refs.filePreview.show(this.fileList, index, 0)
        },
        async openPreview2(item) {
            let index = 0
            for (let i = 0; i < this.fileList.length; i++) {
                if (this.fileList[i] == item) {
                    index = i
                    break
                }
            }
            this.showPreview = true
            await this.$nextTick()
            this.$refs.filePreview.show(this.fileList, index, 0)
        },

        getSize(size) {
            if (size > 1024) {
                return parseFloat(size / 1024).toFixed(2) + ' M'
            } else {
                return parseFloat(size).toFixed(2) + ' KB'
            }
        },
        // 供外部自由按钮用
        click() {
            this.$refs.inputFile.click()
        },
        // 判断是不是图片
        isPicture(name) {
            let picFormat = ['png', 'jpg', 'jpeg', 'gif', 'bmp']
            return picFormat.indexOf(getSuffix(name)) !== -1
        },
        selectFile() {
            this.$refs.inputFile.click()
        },
        getSuffix(filename) {
            let suffix = getSuffix(filename)
            return 'file-' + isHasSuffix(suffix)
        },
        getSuffixSVG(filename) {
            let suffix = getSuffix(filename)
            return '#file-' + isHasSuffix(suffix)
        },
        // 删除当前条
        delThis(index) {
            this.fileList.splice(index, 1)
        },
        // 选了文件，有变动时
        fileChange(event) {
            let files = event.currentTarget.files
            this._fileChange(files)
        },
        // 生成pdf自动上传
        autoUploadPdf(files) {
            this._fileChange(files)
        },
        dragDialogChange(files) {
            if (this.showList) {
                this._fileChange(files)
            } else {
                this.filesBak = newFiles
                this.$refs.fileuploadDialog.upload(null, newFiles)
            }
        },
        _fileChange(files) {
            if (files.length === 0) { return }

            // 检测文件大小限制，并复制一份待用
            let newFiles = []
            let filesArr = []
            let countM = 0
            for (var i = 0; i < files.length; i++) {
                let fileSize_M = (files[i].size / (1024 * 1024)).toFixed(2) // 转成M，并保存2位小数

                if (fileSize_M > this.uploadFileMaxSize) {
                    this.$message.warning('包含超过 ' + this.uploadFileMaxSize + ' M的文件不能上传')
                    this.$refs.inputFile.value = ''
                    return
                }
                countM = countM + fileSize_M
                newFiles.push(files[i])
                filesArr.push({
                    isNewFile: true,
                    file: files[i],
                    name: files[i].name,
                    size: (files[i].size / 1024).toFixed(2),
                    url: null,
                    status: 1
                })
            }
            if (this.spatial > 0) {
                let Surplus = this.SpatialQuery()
                if (countM > Surplus) {
                    this.$message.warning('空间不足，无法导入')
                    this.$refs.inputFile.value = ''
                    return
                }
            }
            this.filesBak = newFiles
            if (this.autoUpload) {
                if (this.showList) {
                    this.showfileList.push(...filesArr)
                    this.$refs.inputFile.value = ''
                } else {
                    this.fileUpload() // 即上传
                }
            }
        },
        SpatialQuery() {
            this.$http.get(this.Global.baseURL + this.Global.api.v2.toAuthEmployee, {
                params: { cid: this.spatial }

            }).then((res) => {
                if (res.body && res.body.code.toString() == this.Global.RES_OK) {
                    let data = res.body.data
                    return data.spacecount * 1024 - data.totalamount
                }
            })
        },
        // 关闭上传对话框
        close() {
            this.flag = 0
        },
        fileItemUploadSuccess() {
            let newArr = []
            this.showfileList.forEach(item => {
                if (item.url) {
                    newArr.push(item)
                }
            })
            this.fileList.length = 0
            this.fileList.push(...newArr)
        },
        removeItem(index) {
            this.showfileList.splice(index, 1)
            this.fileItemUploadSuccess()
        },
        // 上传成功
        fileUploadSuccess(res, index) {
            // console.log(res);
            if (res.code != '0') { return }
            // console.log(this.filesBak[this.flag]);
            // 因图片URL不同文件URL，判断图片
            let name = this.filesBak[this.flag].name
            let size = this.filesBak[this.flag].size
            let url = res.data // 统一为ID

            this.fileList.push({
                name: name,
                url: url,
                size: (size / 1024).toFixed(2),
                status: 1
            })
            this.flag++
        },
        // 上传中...
        fileUpload() {
            this.$refs.fileuploadDialog.upload(this.$refs.inputFile)
        },
        async getOssConfig() {
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

                    this.ossConfig = Object.freeze({
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
        }
    },
    watch: {
        fileList() {
            if (this.showList) {
                if (this.showfileList.length <= 0) {
                    this.showfileList = [...this.fileList]
                } else {
                    this.fileList.forEach(item => {
                        if (!this.showfileList.includes(item)) {
                            this.showfileList.push(item)
                        }
                    })
                }
            }

            this.$emit('change', this.fileList)
        }
    },
    components: {
        'fileupload-dialog': FileuploadDialog,
        'drag-dialog': DragDialog,
        'doc-preview': DocPreview,
        'file-show': FileShow,
        'file-item': FileItem
    }
}
</script>

<style lang="less" ref="stylesheet/less" scoped>
@import "./zh-cn.less";
@import "./en.less";
</style>
