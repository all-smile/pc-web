// import './libs'
import Vue from "vue";
import App from "./pages/App";
import { sync } from "vuex-router-sync";
import router from "./router";
import store from "./store";
// import './router/permission'

// import '@/globalComponents'

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
