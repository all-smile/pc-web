// 封装请求

import request from './request'
import { inUseMockdata } from "./config";

const http = {
  /**
   * methods: 请求
   * @param _url 请求地址 
   * @param params 请求参数
   */
  get(_url, params) {
    const config = {
      method: 'get',
      url: inUseMockdata ? _url.mockUrl : _url.url
    }
    if (params) config.params = params
    return request(config)
  },
  post(_url, params) {
    const config = {
      method: 'post',
      url: inUseMockdata ? _url.mockUrl : _url.url
    }
    if (params) config.data = params
    return request(config)
  },
  put(_url, params) {
    const config = {
      method: 'put',
      url: inUseMockdata ? _url.mockUrl : _url.url
    }
    if (params) config.params = params
    return request(config)
  },
  delete(_url, params) {
    const config = {
      method: 'delete',
      url: inUseMockdata ? _url.mockUrl : _url.url
    }
    if (params) config.params = params
    return request(config)
  }
}
//导出
export default http
