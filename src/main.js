// import './libs'
import Vue from "vue";
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./pages/App";
import { sync } from "vuex-router-sync";
import router from "./router";
import store from "./store";
import './assets/icon-font/iconfont.js'
import IconColor from '@/components/icon-color/index'
// import './router/permission'

Vue.use(Element, { size: 'small' });
Vue.use(IconColor)
// 引入全局mixin
import mixins from "@/mixins/index.js";
Vue.mixin(mixins);

sync(store, router, { moduleName: "RouteModule" }); // vue-router的状态同步到vuex中

// 引入element-ui

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
