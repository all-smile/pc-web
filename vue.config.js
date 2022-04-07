const path = require('path');
// const JavaScriptObfuscator = require('webpack-obfuscator');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 代码压缩
const CompressionPlugin = require('compression-webpack-plugin') // gzip压缩，配合nginx
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const { chalk } = require('@vue/cli-shared-utils')
const resolve = (dir) => path.join(__dirname, dir);

const smp = new SpeedMeasurePlugin();

console.log('NODE_ENV===', process.env.NODE_ENV);
console.log('VUE_APP_PATH===', process.env.VUE_APP_PATH);
console.log('IS_PROD===', IS_PROD);
console.log('VUE_APP_STATIC===', process.env.VUE_APP_STATIC);

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PATH : '/',  // 公共路径
  // publicPath: IS_PROD ? './' : '/',  // 公共路径
  indexPath: 'index.html', // 相对于打包路径index.html的路径
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: '', // static 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: true, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  // runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // 向 PWA 插件传递选项。
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = 'xiao的调色板🎨'
        return args
      })
    // 引入less全局变量
    const oneOfsMap = config.module.rule('less').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [
            path.resolve(__dirname, './src/assets/less/base.less'),
          ]
        })
        .end()
    })
    config.resolve.symlinks(true); // 修复热更新失效
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin("html").tap(args => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = "none";
      return args;
    });
    config.resolve.alias // 添加别名
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@basecomponents', resolve('src/basecomponents'))
      .set('@utils', resolve('src/libs/utils'))
      .set('@pages', resolve('src/pages'))
      .set('@store', resolve('src/store'));

    // set svg loader
    config.module.rule("svg").exclude.add(resolve("src/assets/icons")).end();
    config.module.rule("icons")
      // .use('cache-loader')
      // .loader('cache-loader')
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end()
  },
  css: {
    extract: IS_PROD,
    requireModuleExtension: true,// 去掉文件名中的 .module
    loaderOptions: {
      // 给 less-loader 传递 Less.js 相关选项
      less: {
        // `globalVars` 定义全局对象，可加入全局变量 eg: color: @primary;
        globalVars: {
          // primary: 'red'
        }
      }
    }
  },
  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    host: "0.0.0.0",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    hotOnly: true, // 热更新
    // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
    proxy: {
      //配置多个跨域
      "/pcApi": {
        target: "http://172.15.37.225:3000", // 本地
        // target: "http://118.190.59.105:3000",
        changeOrigin: true,
        //ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          "^/pcApi": ""
        },
        logLevel: 'debug',
      },
    }
  },
  configureWebpack: smp.wrap(IS_PROD ? {
    plugins: [
      // new JavaScriptObfuscator({
      //   // 压缩,无换行
      //   compact: true,
      //   // 允许将信息记录到控制台。
      //   log: true,
      //   // 此选项禁用console所有脚本的全局调用
      //   disableConsoleOutput: true,
      //   rotateStringArray: true,
      //   // 此选项几乎不可能使用开发者工具的控制台选项卡
      //   // debugProtection: false,
      //   // 如果选中，则会在“控制台”选项卡上使用间隔强制调试模式，从而更难使用“开发人员工具”的其他功能。
      //   // debugProtectionInterval: false,
      //   // 通过用空函数替换它们来禁用console.log，console.info，console.error和console.warn。这使得调试器的使用更加困难。
      //   // disableConsoleOutput: true,
      // }, [
      //   // 数组内是需要排除的文件
      //   "**/node_modules/**"
      // ]),
      // gzip 压缩
      new CompressionPlugin({
        test: /\.(js|css|html|svg)?$/i,     // 压缩文件格式
        filename: '[path].gz[query]',   // 压缩后的文件名
        algorithm: 'gzip',              // 使用gzip压缩
        threshold: 10240, //对10K以上的数据进行压缩
        deleteOriginalAssets: false, //是否删除原文件
        minRatio: 0.8                   // 压缩率小于1才会压缩
      }),
      // 代码压缩
      new UglifyJsPlugin({
        // 压缩配置 uglifyOptions
        uglifyOptions: {
          compress: {
            drop_debugger: true,
            drop_console: true, //生产环境自动删除console
          },
          warnings: false,
        },
        cache: true, //是否启用文件缓存，默认缓存在node_modules/.cache/uglifyjs-webpack-plugin.目录
        sourceMap: false,
        parallel: true // 使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
      }),
      new HardSourceWebpackPlugin(),
      new ProgressBarPlugin({
        format: ' build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        clear: false
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: "static", // server
        analyzerPort: "7000",
        openAnalyzer: false
      })
    ]
  } : {}),
}
