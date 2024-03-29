import './public-path';
// import './libs'
import Vue from "vue";
import VueRouter from 'vue-router';
import Element from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import "@/theme/index.css"
import App from "./pages/App";
import { sync } from "vuex-router-sync";
import router from "./router";
import store from "./store";
import './router/permission'
import './assets/icon-font/iconfont.js'
import IconColor from '@/components/icon-color/index'
import './assets/icons' // icon
// import './router/permission'
import customFn from "./libs/customFn";

import '@/libs/mockEvent.js'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.use(VXETable)

console.log('router', router);

// 自定义指令
import './directive'

Vue.use(Element, { size: 'small' });
Vue.use(IconColor) // 注册全局 iconfont 组件
Vue.use(customFn)
// 引入全局mixin
import mixins from "@/mixins/index.js";
Vue.mixin(mixins);

sync(store, router, { moduleName: "RouteModule" }); // vue-router的状态同步到vuex中

// 引入element-ui

Vue.config.productionTip = false;

// new Vue({
//   router,
//   store,
//   render: (h) => h(App),
// }).$mount("#app");



let Router = null;
let instance = null;
function render(props = {}) {
  const { container } = props;
  Router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/app-vue/' : '/',
    mode: 'history',
    router,
  });

  instance = new Vue({
    router: Router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  Router = null;
}