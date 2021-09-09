<!--
 * @Author: your name
 * @Date: 2021-09-08 19:13:02
 * @LastEditTime: 2021-09-09 19:08:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pc-web\src\pages\Main\tools\upload-file\index.vue
-->
<template>
    <div class="upload-file">
        <div class="upload-ware">
            <input type="file" id="oFile" ref="Files" name="myFiles" multiple accept="." @change="changeFile('Files', 30)" />
            <span class="add-annex" @click="proxyEvent(2)">上传文件</span>
            <div class="files-ware">
                <ul v-if="filesList.length > 0">
                    <li v-for="(item, index) in filesList" :key="index">
                        <file-show :item="item"></file-show>
                        <div class="descr">
                            <div class="name" :title="item.name">{{item.name}}</div>
                            {{getSize(item.size)}}
                        </div>
                        <div class="viewburs hidden">
                            <i class="iconfont icon-search-dot" @click="willPreView(filesList, index)"></i>
                        </div>
                        <span class="buts hidden">
                            <i class="iconfont icon-del" @click="delThis(item.ossKey, index, 2)"></i>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 提交 -->
        <div class="record-submit">
            <el-button type="primary" :loading="isLoading" @click="submitForm(1)">提交</el-button>
        </div>
    </div>
</template>

<script>
import SparkMD5 from "spark-md5"
// import DocPreview from '@/components/DocPreview/index'
// import FileuploadDialog from '@/basecomponents/FileuploadDialog/index' // 资源上传及进度条插件
import FileShow from '@/components/FileUpload/FileShow/index'
export default {
    name: 'upload-file',
    props: {},
    components: {
        // 'fileupload-dialog': FileuploadDialog,
        // 'doc-preview': DocPreview,
        'file-show': FileShow,
    },
    data() {
        return {
            isUpload: false,
            isLoading: false,
            imgsList: [],
            filesList: [],
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() {
    },
    methods: {
        proxyEvent(n) {
            var spark = new SparkMD5();
            const spark1 = new SparkMD5.ArrayBuffer();
            console.log('spark', spark);
            console.log('spark1', spark1);
            this.isUpload = true
            if (n === 1) {
                if (this.imgsList.length >= 9) {
                    // 每次最多上传9张图片哦
                    this.$message.warning('每次最多上传9张图片哦')
                    return
                }
                document.getElementById('oImg').click()
            } else if (n === 2) {
                document.getElementById('oFile').click()
            }
        },
        changeFile(ref, m) {
            this.uploadContent = ref
            console.log('files', this.$refs[ref].files);
            const file = this.$refs[ref].files[0]
            if (file) {
                let fileSize_M = parseFloat((file.size / 1048576).toFixed(6)) // 转成M
                console.log(fileSize_M);
                //读取本地文件，以gbk编码方式输出
                var fileReader = new FileReader();
                fileReader.readAsArrayBuffer(file);
                fileReader.onload = function () {
                    console.log(this.result);
                    console.log(new Blob([this.result]))
                }

                this.filesList.push({
                    name: file.name,
                    size: parseFloat((file.size / 1048576).toFixed(6)) + 'm',
                })
            }
        },
        submitForm() {
            const file = this.$refs.Files.files[0]
            if (file) {
                const fileSize = file.size; // 文件大小
                const chunkSize = 2 * 1024 * 1024; // 切片的大小 2m
                const chunks = Math.ceil(fileSize / chunkSize); // 获取切片的个数
                let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
                let spark = new SparkMD5.ArrayBuffer();
                let fileReader = new FileReader();
                let currentChunk = 0;

                fileReader.onload = function (e) {
                    console.log('read chunk nr', currentChunk + 1, 'of', chunks);
                    const result = e.target.result;
                    spark.append(result);
                    currentChunk++;
                    if (currentChunk < chunks) {
                        loadNext();
                        console.log(`第${currentChunk}分片解析完成，开始解析${currentChunk + 1}分片`);
                    } else {
                        const md5 = spark.end();
                        console.log('解析完成');
                        console.log(md5);

                        const result = spark.end();
                        // 如果单纯的使用result 作为hash值的时候, 如果文件内容相同，而名称不同的时候
                        // 想保留两个文件无法保留。所以把文件名称加上。
                        const sparkMd5 = new SparkMD5();
                        sparkMd5.append(result);
                        sparkMd5.append(file.name);
                        const hexHash = sparkMd5.end();
                        console.log('hexHash', hexHash);
                        resolve(hexHash);
                    }
                };
                fileReader.onerror = function () {
                    console.warn('oops, something went wrong.');
                };
                function loadNext() {
                    var start = currentChunk * chunkSize,
                        end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize; // 边界控制

                    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
                }

                loadNext();
            }
        },
        // 上传成功
        fileUploadSuccess(res) {
            if (res.code != '0') { return }
            if (this.uploadContent === 'Imgs') {
                // 图片
                this.imgsList.push({
                    name: res.data.fileName,
                    url: res.data.url,
                    ossKey: res.data.ossKey,
                    size: (res.data.fileSize / 1024).toFixed(2),
                    status: 1
                })
            } else if (this.uploadContent === 'Files') {
                // 附件
                this.filesList.push({
                    name: res.data.fileName,
                    url: res.data.url,
                    ossKey: res.data.ossKey,
                    size: (res.data.fileSize / 1024).toFixed(2),
                    status: 1
                })
            }
        },
    },
    updated() { },
    beforeDestroy() { },
    beforeRouteLeave(to, from, next) {
        next()
    }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
@import "./index.less";
</style>
