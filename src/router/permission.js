import router from './index.js'
import store from '@/store'
import { accessToken, isDev } from '@/libs/config'
import { getPageTitle } from '@/libs/utils'
// import MXEventBus from '@/libs/event'


const whitelist = [
  '/main/nopage',
  '/main/auth',
  ...(isDev ? ['/main'] : [])
]

router.beforeEach((to, from, next) => {
  try {
    // let accessTokenStr = getToken()[accessToken]
    if (to?.meta?.title) {
      document.title = getPageTitle(to.meta.title)
    }
    // if (accessTokenStr) {
    //   // 已登录
    // } else {
    //   next()
    // }
    let isNext = true
    // let isNext = false
    // if (whitelist.includes(to.path)) {
    //   isNext = true
    // }

    if (isNext) {
      next()
    } else {
      console.log(to.path + ' is unavailable!')
      next({
        path: '/main/nopage',
        replace: true,
        query: {
          errPath: to.path
        }
      })
    }
  } catch (err) {
    console.log(err);
  }
})

router.afterEach(() => {
  window.scrollTo(0, 0);
});

