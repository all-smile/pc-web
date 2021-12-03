// 封装api
import http from '../../libs/http'

export function fileUpload(params, option = {}) {
  const api = {
    url: '/pcApi/file/upload',
    mockUrl: ''
  }
  return http.post(api, params, option)
}

export function getListAPI(params) {
  const api = {
    url: 'getListAPI',
    mockUrl: './mock_data/getListAPI.json'
  }
  return http.get(api, params)
}

export function userLogin(params, option = {}) {
  const api = {
    url: '/pcApi/userLogin',
    mockUrl: ''
  }
  return http.post(api, params, option)
}
