/* 
获取state，做映射（相当于计算函数computed)
getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
使用对象展开运算符将 getter 混入 computed 对象中 ...mapGetters(['userInfo'])
映射： 把 `this.userInfo` 映射为 `this.$store.getters.userInfo`
*/

// 平台信息
export const payOrderId = state => state.payOrderId
// 获取个人信息
export const userInfo = state => state.userInfo
// 授权进度
export const processStatus = state => state.processStatus
// 页面标题
export const headerTitle = state => state.headerTitle
// 平台
export const platform = state => state.platform