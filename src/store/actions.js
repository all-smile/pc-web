/*
Action 提交的是 mutation，而不是直接变更状态。
Action 可以包含任意异步操作。 
组件内 methods
...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
    ]),
 */
import * as types from './mutation-types'
// import { isObject, isArray } from '@/libs/utils'

// 获取个人信息
export const setUserInfo = async function ({ commit, state }, option = {}) {
  try {
    let _V = this._vm // vuex|vue
    let res = await _V.Global.api.getUserInfo()
    if (res.code.toString() === _V.Global.RES_OK) {
      commit(types.SET_USERINFO, res.data)
    } else {
      console.warn('setUserInfo error!')
    }
  } catch (err) {
    console.log(err);
  }
}