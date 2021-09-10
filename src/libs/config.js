/**
 * 不同环境接口域名配置
 * 常量定义
 */

/**
 * 环境判断
 */
export const isDev = process.env.NODE_ENV === 'development'


/**
 * 接口成功统一返回状态
 */
export const RES_OK = 'OK'


export const accessToken = 'accessToken'

// 是否启用本地假数据
export const inUseMockdata = true

