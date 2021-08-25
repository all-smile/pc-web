const state = {
  // 批次号(订单号)
  payOrderId: '',
  // 用户信息
  userInfo: {},
  // 授权进度
  processStatus: 'detail', // verifying
  headerTitle: '',
  /* 
  DPSQ("DPSQ","“闪签”律师平台资金监管项目"),
  DPPM("DPPM","“爆品趣拍”平台保证金存管项目"),
  DPLM("DPLM","“灵猫”灵活用工平台项目"),
  DPHQ("DPHQ","“伴零工”灵活用工平台项目");
   */
  platform: '', // 接入平台
}

export default state
