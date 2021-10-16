/**
 * sandbox.js文件
 * JS沙箱
 * 快照沙箱
 * */

export default class SnapshotSandbox {
  constructor() {
    this.proxy = window;
    this.modifyPropsMap = {} //记录window上的修改
    this.active() // 激活沙箱
  }
  active() {
    this.windowSnapshot = {} // 拍照
    for (const key in window) {
      if (Object.hasOwnProperty.call(window, key)) {
        this.windowSnapshot[key] = window[key]
      }
    }
    Object.keys(this.modifyPropsMap).forEach(key => {
      window[key] = this.modifyPropsMap[key]
    })
  }
  inactive() {
    for (const key in window) {
      if (Object.hasOwnProperty.call(window, key)) {
        if (window[key] !== this.windowSnapshot[key]) {
          this.modifyPropsMap[key] = window[key] // 保存变化
          window[key] = this.windowSnapshot[key] // 还原变化
        }
      }
    }
  }
}

// let sandbox = new SnapshotSandbox();
// ((window) => {
//   window.a = 1
//   window.b = 2
//   console.log(window.a, window.b);
//   sandbox.inactive()
//   console.log(window.a, window.b);
//   sandbox.active()
//   console.log(window.a, window.b);
// })(sandbox.proxy) // sandbox.proxy 就是window

