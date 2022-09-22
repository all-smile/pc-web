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

// aes key
export const aesKey = 'abcdef0123456789'

// aes iv
export const aesIV = '0123456789abcdef'

// rsa public
export const rsaPubKey = "-----BEGIN PUBLIC KEY-----" +
  "MIGJAoGBAMsB5aBqU0xW5r5tTTTWURqDT/zEeIvZaWrkh88QyoArsxz9buyBBhRE" +
  "/Jr5NODdyhpPAMmz4zfosDRwZ9L/W3z8SXBgRVCVhHnc8ruDJbhoaIwe4wXh8+1E" +
  "cu4Ft7rQacCOLzOziizVCl6c1J/oOCPUN4okB/1V5AU/LLWF6TPxAgMBAAE=" +
  "-----END PUBLIC KEY-----"

// rsa private
export const rsaPriKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDLAeWgalNMVua+bU001lEag0/8xHiL2Wlq5IfPEMqAK7Mc/W7s
gQYURPya+TTg3coaTwDJs+M36LA0cGfS/1t8/ElwYEVQlYR53PK7gyW4aGiMHuMF
4fPtRHLuBbe60GnAji8zs4os1QpenNSf6Dgj1DeKJAf9VeQFPyy1hekz8QIDAQAB
AoGAWQ5V+89pB15AD13Httwl7Cma11ohP8h6lGf4o//Ltfp1sswC80GOtymkXx/f
8J2bYXsy70k47nfnhLmi8k8PhLai0QWtkx2lOyeS8MYTZznaIRv9fCXBFwclmrZ9
HPjbn/boYfsokpr8uknwerpm/hmJCAUdeqHAoJT/0v+8F1kCQQDwg3FXSK83hcV8
E51Gz50qDCA9tshZgE1/XDI61gnYRC0u3UyXM5izNexJQaXmX1OHUN8svDU4NYo0
+G6+tI4LAkEA2BQ3Do4+tsSosFC3eHBqhEignC039zXyFF4Tkhvpp5e9afdorEx7
s9lr8ewV2idhlDuMTFG22S2Ymwno2+hPcwJBAKmj/ICVCsk9uGJgr1EvxOnQbbk5
wCyou4C2ddNb/sukor3oZ0pKoUzeHtA41pwb5p2N5Cv4gA0qblYYWHx4e6sCQQCs
mqFMSEZCex+BEEkutSXxG47okpp1KCuDJ48clJ112Zldz1tW3xWlmdVHf94I0JJ6
9YJh6JhWLb0Mg8L1/0GPAkBiI5WFhC2PQxNp2MH43yCgup30bnkBZBDgV5yyd8ow
zi4TwI956uJ4hQ0hkElsxjGRQd9VhXGotUgcjTQFsxeG
-----END RSA PRIVATE KEY-----
`
