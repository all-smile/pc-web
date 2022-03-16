function debounce(func, delay) {
  var pre = 0
  var timer = null
  var context, args;


  var run = function () {
    timer = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
  return function () {
    var now = new Date().getTime()
    if (now - pre >= delay) {
      run()
    } else {

      timer
    }
    pre = now
  }
}


/*
架构：
资源申请
技术选型，ui库,css编写BEM规范
分支模型
代码规范 eslint - sonar
提交代码注释规范，pre-commit钩子函数
IE兼容处理，babel,es6-promise, babel-polyfill
基础框架搭建+业务框架
用户角色、菜单权限配置、控制点管理、业务字典配置
路由权限、404页面配置，路由模块化配置，设置kepp-alive配置项
接口请求封装，
webpack 打包优化配置
安全加固
操作日志分类统计
工具函数封装，自定义指令、mixin等
axios封装，aes+rsa数据传输加解密，异常处理，重发控制
对接CI/CD
nginx配置，反向代理、动静分离、负载均衡
*/