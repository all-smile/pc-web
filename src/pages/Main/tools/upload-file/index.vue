<!--
 * @Author: your name
 * @Date: 2021-09-08 19:13:02
 * @LastEditTime: 2021-09-10 13:57:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pc-web\src\pages\Main\tools\upload-file\index.vue
-->
<template>
    <div class="upload-file">
        <div class="upload-ware">
            <input type="file" id="oFile" ref="Files" name="myFiles" multiple accept="." @change="changeFile('Files', 30)" />
            <span class="add-annex" @click="proxyEvent(2)">上传文件</span>
            <!-- <div class="files-ware">
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
            </div> -->
        </div>
        <!-- 提交 -->
        <div class="record-submit">
            <el-button type="primary" :loading="isLoading" @click="submitForm(1)">提交</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import SparkMD5 from "spark-md5"
// import { fileUpload } from '@/api/global/api.js'
// import DocPreview from '@/components/DocPreview/index'
// import FileuploadDialog from '@/basecomponents/FileuploadDialog/index' // 资源上传及进度条插件
// import FileShow from '@/components/FileUpload/FileShow/index'
export default {
    name: 'upload-file',
    props: {},
    components: {
        // 'fileupload-dialog': FileuploadDialog,
        // 'doc-preview': DocPreview,
        // 'file-show': FileShow,
    },
    data() {
        return {
            isUpload: false,
            isLoading: false,
            imgsList: [],
            filesList: [],
            chunkSize: 2 * 1024 * 1024, // 每个chunk的大小，设置为2兆
            blobSlice: File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
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
        hashFile(file) {
            // const chunkSize = 2 * 1024 * 1024; // 每个chunk的大小，设置为2兆
            // 使用Blob.slice方法来对文件进行分割。
            // 同时该方法在不同的浏览器使用方式不同。
            // const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;

            return new Promise((resolve, reject) => {
                const chunks = Math.ceil(file.size / this.chunkSize);
                let currentChunk = 0;
                const spark = new SparkMD5.ArrayBuffer();
                const fileReader = new FileReader();
                const loadNext = () => {
                    const start = currentChunk * this.chunkSize;
                    const end = start + this.chunkSize >= file.size ? file.size : start + this.chunkSize;
                    fileReader.readAsArrayBuffer(this.blobSlice.call(file, start, end));
                }
                fileReader.onload = e => {
                    spark.append(e.target.result); // Append array buffer
                    currentChunk += 1;
                    if (currentChunk < chunks) {
                        loadNext();
                    } else {
                        console.log('finished loading');
                        const result = spark.end();
                        // 如果单纯的使用result 作为hash值的时候, 如果文件内容相同，而名称不同的时候
                        // 想保留两个文件无法保留。所以把文件名称加上。
                        const sparkMd5 = new SparkMD5();
                        sparkMd5.append(result);
                        sparkMd5.append(file.name);
                        const hexHash = sparkMd5.end();
                        resolve(hexHash);
                    }
                };
                fileReader.onerror = () => {
                    console.warn('文件读取失败！');
                };
                loadNext();
            }).catch(err => {
                console.log(err);
            });
        },
        async submitForm() {
            const file = this.$refs.Files.files[0]
            if (file) {
                const fileSize_M = parseFloat((file.size / 1048576).toFixed(6)) // 转成M，并保存2位小数
                console.log('fileSize_M', fileSize_M);
                if (fileSize_M > 50) {
                    this.chunkSize = 5 * 1024 * 1024 // 5m
                }
                const blockCount = Math.ceil(file.size / this.chunkSize); // 分片总数
                const axiosPromiseArray = []; // axiosPromise数组
                const hash = await this.hashFile(file); //文件 hash 
                // 获取文件hash之后，如果需要做断点续传，可以根据hash值去后台进行校验。
                // 看看是否已经上传过该文件，并且是否已经传送完成以及已经上传的切片。
                console.log(hash);

                for (let i = 0; i < blockCount; i++) {
                    const start = i * this.chunkSize;
                    const end = Math.min(file.size, start + this.chunkSize);
                    // 构建表单
                    const form = new FormData();
                    form.append('file', this.blobSlice.call(file, start, end));
                    form.append('name', file.name);
                    form.append('total', blockCount);
                    form.append('index', i);
                    form.append('size', file.size);
                    form.append('hash', hash);
                    // ajax提交 分片，此时 content-type 为 multipart/form-data
                    const axiosOptions = {
                        onUploadProgress: e => {
                            // 处理上传的进度
                            console.log(blockCount, i, e, file);
                        },
                    };
                    // 加入到 Promise 数组中
                    axiosPromiseArray.push(axios.post('/pcApi/file/upload', form, axiosOptions));
                    // let requestApi = fileUpload(form)
                    // axiosPromiseArray.push(requestApi);
                }
                // 所有分片上传后，请求合并分片文件
                await axios.all(axiosPromiseArray).then(() => {
                    // 合并chunks
                    const data = {
                        size: file.size,
                        name: file.name,
                        total: blockCount,
                        hash
                    };
                    console.log('data', data);
                    axios.post('/pcApi/file/merge_chunks', data).then(res => {
                        console.log('上传成功');
                        console.log(res.data, file);
                        alert('上传成功');
                    }).catch(err => {
                        console.log(err);
                    });
                });
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
