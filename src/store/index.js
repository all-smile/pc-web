// 入口
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import modules from './modules'
// import createLogger from 'vuex/dist/logger' // 打印日志

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
  strict: debug // 检查state修改是否通过commit 调用mutations内的方法
  // plugins: debug ? [createLogger()] : []
})

