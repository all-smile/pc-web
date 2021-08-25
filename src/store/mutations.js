/* 
所有mutations
在mutations中只能是同步的操作，打印个日志什么的
在此进行事件注册，在actions文件中使用commit方法触发调用
组件中 methods里
...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    ]),
 */
import * as types from './mutation-types'
// import { setItem } from '@/libs/utils.js'

const mutations = {
  [types.SET_PAYORDERID](state, payOrderId) {
    state.payOrderId = payOrderId
  },
  [types.SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_PROCESSSTATUS](state, processStatus) {
    state.processStatus = processStatus
  },
  [types.SET_HEADERTITLE](state, headerTitle) {
    state.headerTitle = headerTitle
  },
  [types.SET_PLATFORM](state, platform) {
    state.platform = platform
  },
}
export default mutations