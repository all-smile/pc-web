[![OSCS Status](https://www.oscs1024.com/platform/badge/all-smile/pc-web.svg?size=small)](https://www.oscs1024.com/project/all-smile/pc-web?ref=badge_small)
[![Netlify Status](https://api.netlify.com/api/v1/badges/4e688259-1308-497b-b72e-7fd8a568f415/deploy-status)](https://app.netlify.com/sites/pcweb/deploys)

**预览地址：**

- 主站地址: https://web.i-xiao.space/
- 备用地址: https://home.i-xiao.space/pc-web/
## PC端项目

**内容包括：**
- PC端开发的常用工具函数、公共组件、基础项目配置
- 一些技术实现 (文件切片上传、断点续传; html转pdf; 文件预览; 接口参数加解密等等)
- 个人网站导航页面、登录页面
- 单据架构实现 (todo...)
- 手写函数 (面试手写题登 src/libs 目录下)
- ...

> 需要后端配合的功能，一部分是nodeJs写的，一部分是Golang写的。还需要继续学习才行！
## 使用

```bash
npm install
or
yarn

npm run dev
```
## CI/CD
该项目集成了流水线，整体流程是：
1. 本地推送代码
2. 触发Jenkins拉取代码
3. 通过Jenkins自动构建镜像
4. 镜像上传到制品库
5. 宿主机拉取最新的镜像
6. 删除老的Docker容器，运行新的Docker容器
7. 服务启动完成

> 年初的时候服务器内存、cpu全爆了，反复清理过几次，还是不行，算了，马上到期了。目前本地push代码，jenkins都构建不了了！

## 代码提交规范
git commit 的类型
- feat: 新功能、新特性
- fix: 修改 bug
- perf: 更改代码，以提高性能
- refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
- docs: 文档修改
- style: 代码格式修改, 注意不是 css 修改（例如分号修改）
- test: 测试用例新增、修改
- build: 影响项目构建或依赖项修改
- revert: 恢复上一次提交
- ci: 持续集成相关文件修改
- chore: 其他修改（不在上述类型中的修改）
- release: 发布新版本
- workflow: 工作流相关文件修改

## 相关链接
个人博客
- 主站地址：https://blog.i-xiao.space/
- 备用地址：https://m.i-xiao.space/

个人语雀文档**精选**：
- [Docker-从入门到实践](https://www.yuque.com/allblue-byynd/dtez1l)
- [DevOps](https://www.yuque.com/allblue-byynd/ezv40n)
- [Nginx](https://www.yuque.com/allblue-byynd/lisfg2)



## 说明

该仓库是GitHub、Gitee同步仓库，同时配置了两个remote（默认的remote是origin）
```
git remote -v
gitee   git@gitee.com:hey-u/pc-web.git (fetch)
gitee   git@gitee.com:hey-u/pc-web.git (push)
github  git@github.com:all-smile/pc-web.git (fetch)
github  git@github.com:all-smile/pc-web.git (push)
```
推送到远端的时候，要使用
- git push gitee `<branch name>`
- git push github `<branch name>`

eg:
```
git push github master
git push gitee master
```

- 增加脚本
```
"push": "git push github master && git push gitee master"
```
- 推送
```
npm run push
```

## GitHub Actions
> 增加 .github\workflows

## 路由模式
1. hash
   - `src\router\index.js` 修改 `mode` 参数
   - `.env.prod` VUE_APP_PATH='/pc/' 改成 VUE_APP_PATH='./'
2. history
   - `src\router\index.js` 修改 `mode` 参数
   - `.env.prod` VUE_APP_PATH='./' 改成 VUE_APP_PATH='/pc/'

## 版本问题

- ~~node V12.13.0~~
- 已更新到： 16.14.1

如果升级node会造成依赖库安装失败，谨慎尝试

---

**文档**

- [Netlify Docs](https://docs.netlify.com/)
- [GitHub Pages](https://docs.github.com/cn/pages/getting-started-with-github-pages)
