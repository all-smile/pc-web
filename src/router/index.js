import Vue from "vue";
import Router from "vue-router";
import NoPage from "./NoPage/index";

// 处理 NavigationDuplicated
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(Router);

const routes = [
  {
    path: "/",
    redirect: "/main/home",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login/index"),
  },
  {
    path: "/compassNav",
    name: "CompassNav",
    component: () => import("@/pages/CompassNav/index"),
  },
  {
    path: "/main/home",
    name: "Home",
    component: () => import("@/pages/Main/home/index"),
    children: [NoPage],
  },
  {
    path: "/main/document-struct",
    name: "DocumentStruct",
    component: () => import("@/pages/Main/document-struct/index"),
    children: [
      // bizfield
      {
        path: "bizfield",
        name: "BizField",
        meta: {
          keepAlive: false,
          title: "业务字段配置",
          activeMenu: "/main/document-struct/bizfield",
        },
        component: () => import("@/pages/Main/document-struct/bizfield"),
      },
      {
        path: "customer",
        name: "Customer",
        meta: {
          keepAlive: false,
          title: "客户档案",
          activeMenu: "/main/document-struct/customer",
        },
        component: () => import("@/pages/Main/document-struct/customer"),
      },
      {
        path: "goods",
        name: "Goods",
        meta: {
          keepAlive: false,
          title: "商品档案",
          activeMenu: "/main/document-struct/goods",
        },
        component: () => import("@/pages/Main/document-struct/goods"),
      },
      NoPage,
    ],
  },
  {
    path: "/main/tools/html2pdf",
    name: "Html2Pdf",
    component: () => import("@/pages/Main/tools/html2pdf/index"),
    children: [],
  },
  {
    path: "/main/tools/uploadFile",
    name: "UploadFile",
    meta: { title: "文件上传" },
    component: () => import("@/pages/Main/tools/upload-file/index"),
    children: [],
  },
  // { path: '*', component: () => import('@/pages/Main/no-page/index') }
];

const router = new Router({
  mode: "hash", // 'history',
  base: process.env.VUE_APP_PATH,
  routes,
});

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  if (isChunkLoadFailed) {
    // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环
    window.location.reload(true); // 强刷-不采用缓存
    // const targetPath = $router.history.pending.fullPath;
    // $router.replace(targetPath);
  }
});

export default router;
