<!--
 * @Author: your name
 * @Date: 2021-09-08 19:13:02
 * @LastEditTime: 2021-09-22 17:59:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pc-web\src\pages\Main\tools\upload-file\index.vue
-->
<template>
  <div class="upload-file">
    <div class="upload-file-1" ref="uploadFile1">
      <div class="upload-ware">
        <span class="upload-tip">将文件拖拽到此处，或点击</span>
        <!-- multiple -->
        <input type="file" id="oFile" multiple="false" ref="Files" name="myFiles" accept="." @change="changeFile('Files', 30)" />
        <i class="el-icon-upload"></i>
        <span class="add-annex" @click="proxyEvent(2)">上传文件</span>
        <div class="files-ware">
          <ul v-if="filesList.length > 0">
            <li v-for="(item, index) in filesList" :key="index">
              <!-- <file-show :item="item"></file-show> -->
              <div class="descr">
                <div class="name" :title="item.name">{{item.name}}</div>
                {{`${item.size}k`}}
              </div>
              <!-- <div class="viewburs hidden">
                            <i class="iconfont icon-search-dot" @click="willPreView(filesList, index)"></i>
                        </div>
                        <span class="buts hidden">
                            <i class="iconfont icon-del" @click="delThis(item.ossKey, index, 2)"></i>
                        </span> -->
            </li>
          </ul>
        </div>
      </div>
      <!-- 提交 -->
      <div class="record-submit">
        <el-button type="primary" :loading="isLoading" @click="submitForm(1)">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SparkMD5 from "spark-md5"
import { fileUpload } from '@/api/global/api.js'
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
      blobSlice: File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
      fileData: [],
      borderhover: false,
      oriData: []
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() {
    // 监听文件拖拽事件
    const dropNode = this.$refs.uploadFile1
    dropNode.addEventListener("drop", this.enentDrop, false)
    dropNode.addEventListener("dragleave", (e) => {
      console.log('dragleave');
      e.stopPropagation();
      e.preventDefault();
      this.borderhover = false;
    })
    dropNode.addEventListener("dragenter", (e) => {
      console.log('dragenter');
      e.stopPropagation();
      e.preventDefault();
      this.borderhover = true;
    })
    dropNode.addEventListener("dragover", (e) => {
      console.log('dragover');
      e.stopPropagation();
      e.preventDefault();
      this.borderhover = true
    })
  },
  methods: {
    enentDrop(e) {
      console.log('drop');
      this.borderhover = false
      e.stopPropagation();
      e.preventDefault();  //必填字段
      let fileData = e.dataTransfer.files;
      console.log('fileData', fileData);
      if (this.filesList.length > 0) {
        this.$message('只能上传一个文件')
      } else {
        this.uploadFile(fileData)
      }
    },
    proxyEvent(n) {
      this.isUpload = true
      if (this.filesList.length > 0) {
        this.$message('只能上传一个文件')
        return
      }
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
      this.uploadFile(this.$refs[ref].files)
    },
    uploadFile(files) {
      console.log('uploadFile', files);
      this.oriData = files
      let filesArr = Array.prototype.slice.call(files)
      filesArr.forEach((item, i) => {
        let fileurl = ''
        let video_type = item.type == "video/mp4" || item.type == "video/ogg";
        if (item.type.indexOf('image') === 0) {  //如果是图片
          fileurl = window.URL.createObjectURL(item); //创建一个url连接,供src属性引用
        } else if (video_type) {
          fileurl = window.URL.createObjectURL(file[i]); //创建一个url连接,供src属性引用
        } else {
          // alert("不支持此类型文件")
        }
        this.filesList.push({
          name: item.name,
          url: fileurl,
          size: (item.size / 1024).toFixed(2),
          status: 1,
          progress: 0 // 进度
        })
      })
    },
    hashFile(file) {
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
      try {
        const file = this.oriData[0]
        console.log('submitForm', file);
        if (file) {
          const fileSize_M = parseFloat((file.size / 1048576).toFixed(6)) // 转成M，并保存2位小数
          console.log('fileSize_M', fileSize_M);
          if (fileSize_M > 50) {
            this.chunkSize = 2 * 1024 * 1024 // 5m
          }
          const blockCount = Math.ceil(file.size / this.chunkSize); // 分片总数
          const axiosPromiseArray = []; // axiosPromise数组
          const hash = await this.hashFile(file); //文件 hash
          // 获取文件hash之后，如果需要做断点续传，可以根据hash值去后台进行校验。
          // 看看是否已经上传过该文件，并且是否已经传送完成以及已经上传的切片。
          console.log(hash);
          this.isLoading = true
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
            console.log("form", form);
            console.log("form", form);
            console.log("v", form.values());
            // 加入到 Promise 数组中
            // axiosPromiseArray.push(axios.post('/pcApi/file/upload', form, axiosOptions));
            let requestApi = fileUpload(form, axiosOptions)
            axiosPromiseArray.push(requestApi);
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
              console.log(res.data, file);
              this.isLoading = false
              this.$message.success('上传成功')
              this.filesList = []
              this.oriData = []
            }).catch(err => {
              console.log(err);
              this.isLoading = false
            });
          });
        } else {
          this.$message('请选择文件再提交')
        }
      } catch (err) {
        console.log(err);
        this.isLoading = false
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
