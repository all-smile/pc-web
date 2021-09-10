// 封装axios
import { Toast } from 'vant';
import axios from 'axios'
import { inUseMockdata } from "./config";

// 1. 创建新的axios实例，
const instance = axios.create({
  // 公共接口--这里注意后面会讲
  baseURL: !inUseMockdata ? process.env.VUE_APP_BASEURL + process.env.VUE_APP_PREURL : '',
  // `withCredentials`指示是否跨站点访问控制请求
  withCredentials: true,

  // “responseType”表示服务器将响应的数据类型
  // 包括 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json',

  // headers`是要发送的自定义 headers
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest',
    // 'Cache-Control':'no-cache'
  },
  // 超时时间 单位是ms，这里设置了10s的超时时间
  timeout: 10 * 1000
})

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法未允许',
  406: '请求的格式不可得。',
  408: '请求超时',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  501: '网络未实现',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  505: 'http版本不支持该请求'
};

// 2. 添加请求拦截器
instance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // console.log('request', config);
  if (config.url) {
    return config;
  } else {
    // return Promise.reject('接口不合法');
  }
}, error => {
  // 对请求错误做些什么
  console.log('request-err', error);
  Toast.fail(error);
  return Promise.reject(error);
});

// 3. 添加响应拦截器
instance.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response.data;
}, error => {
  // 对响应错误做点什么
  console.log('response-err', error);
  /***** 
   * 接收到异常响应的处理开始
   * 跨域存在获取不到状态码的情况
   *  *****/
  if (error && error.response) {
    // 1.公共错误处理
    // 2.根据响应码具体处理
    const { status, config, statusText } = error.response;
    if (status) {
      const errorText = codeMessage[status] || statusText || '出错了';
      Toast.fail(`请求错误 ${status}: ${config.url}\n${errorText}`);
    } else {
      Toast.fail('您的网络发生异常，无法连接服务器');
    }
  } else {
    // 超时处理
    if (JSON.stringify(error).toLocaleLowerCase().includes('timeout')) {
      Toast.fail('服务器响应超时，请刷新当前页');
    } else {
      Toast.fail({
        message: '连接服务器失败',
        forbidClick: true
      })
    }
  }

  /***** 处理结束 *****/
  return Promise.reject(error);

});

//4.导出文件
export default instance
