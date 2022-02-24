<template>
  <div class="compassNav">
    <div class="compassNav__content">
      <div class="compassNav-item">
        <span class="compassNav-item__count text-hover">PC端网站</span>
        <p class="compassNav-item__typeName">
          主要用来练习沉淀各种前后端技术，譬如：Docker技术运用、集成自动化部署、基础设施建设、常用工具函数封装、pdf生成、大文件上传、数据传输加解密，还有一些动画特效
        </p>
        <p class="compassNav-item__typeName">
          技术栈：
          <span class="compassNav-item__skill">Vue | NodeJs | Express</span>
        </p>
        <p class="compassNav-item__typeName">
          <a class="compassNav-item__link text-hover" href="http://118.190.59.105:8090/main/home" target="_blank">👉点击访问</a>
        </p>
      </div>
      <div class="compassNav-item">
        <span class="compassNav-item__count text-hover">H5端网站</span>
        <p class="compassNav-item__typeName clamp_3">
          主要用来练习移动端布局、适配、兼容性方案，WebRTC人脸识别技术，用户鉴权、业务隔离，升级https协议，编写脚本进行打包压缩等
        </p>
        <p class="compassNav-item__typeName">
          技术栈：
          <span class="compassNav-item__skill">Vue | WebRTC | face-api.js | node-zip</span>
        </p>
        <p class="compassNav-item__typeName">
          <a class="compassNav-item__link text-hover" href="http://118.190.59.105:8090/main/home" target="_blank">👉点击访问</a>
        </p>
      </div>
      <div class="compassNav-item">
        <span class="compassNav-item__count text-hover">WebRTC H5</span>
        <p class="compassNav-item__typeName clamp_3">
          主要用来练习掌握WebRTC相关知识
        </p>
        <p class="compassNav-item__typeName">
          技术栈：
          <span class="compassNav-item__skill">React | WebRTC | Antd</span>
        </p>
        <p class="compassNav-item__typeName">
          <a class="compassNav-item__link text-hover" href="http://118.190.59.105:8090/main/home" target="_blank">👉点击访问</a>
        </p>
      </div>
      <div class="compassNav-item">
        <span class="compassNav-item__count text-hover">ChitChat</span>
        <p class="compassNav-item__typeName clamp_3">
          主要用来练习掌握GoWeb开发，掌握网络协议知识，实现基本的论坛功能，主要包括注册、登录、发布、评论功能，登录用户可以实现发布、评论功能，未登录用户仅可以浏览查看
        </p>
        <p class="compassNav-item__typeName">
          技术栈：
          <span class="compassNav-item__skill">Go | PostgreSQl</span>
        </p>
        <p class="compassNav-item__typeName">
          <a class="compassNav-item__link text-hover" href="http://118.190.59.105:8090/main/home" target="_blank">👉点击访问</a>
        </p>
      </div>
      <div class="compassNav-item">
        <span class="compassNav-item__count text-hover">Dockers Hub</span>
        <p class="compassNav-item__typeName clamp_3">
          镜像管理仓库
        </p>
        <p class="compassNav-item__typeName">
          <a class="compassNav-item__link text-hover" href="https://hub.docker.com/" target="_blank">👉点击访问</a>
        </p>
      </div>
      <div class="compassNav-item">
        <span class="compassNav-item__count text-hover">Jenkins平台</span>
        <p class="compassNav-item__typeName clamp_3">
          CI集成，构建镜像，自动发布
        </p>
        <p class="compassNav-item__typeName">
          <a class="compassNav-item__link text-hover" href="http://118.190.59.105:8082/" target="_blank">👉点击访问</a>
        </p>
      </div>
      <div class="compassNav-item">
        <span class="compassNav-item__count text-hover">Supervisor</span>
        <p class="compassNav-item__typeName clamp_3">
          Go进程管理平台，进行启停操作、查看日志等
        </p>
        <p class="compassNav-item__typeName">
          <a class="compassNav-item__link text-hover" href="http://118.190.59.105:9001/" target="_blank">👉点击访问</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompassNav',
  props: {},
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {},
  updated() { },
  beforeDestroy() { },
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
@import "./index.less";
</style>
