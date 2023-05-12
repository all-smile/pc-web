// 封装api
import http from "../../libs/http";

export function fetchItem(params, option = {}) {
  const api = {
    url: "/pcApi/file/upload",
    mockUrl: "",
  };
  return http.post(api, params, option);
}

export function fetchHrmJob(params) {
  const api = {
    url: "getListAPI",
    mockUrl: "./mock/getListAPI.json",
  };
  return http.get(api, params);
}
