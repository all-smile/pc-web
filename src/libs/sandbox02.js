/**
 * Proxy代理沙箱
 */
class ProxySandBox {
  constructor() {
    const rawWindow = window
    const fakeWindow = {}
    const proxy = new Proxy(fakeWindow, {
      set(target, p, value) {
        target[p] = value
        return true
      },
      get(target, p) {
        return target[p] || rawWindow[p] // 先在代理window上找, 没有，则取全局window
      }
    })
    this.proxy = proxy
  }
}

let sandbox1 = new ProxySandBox()
let sandbox2 = new ProxySandBox()

console.log('sandbox1', sandbox1);
console.log('sandbox2', sandbox2);

window.aa = 'proxy test';

((window) => {
  window.aa = 'hello';
  console.log(window.aa);
})(sandbox1.proxy);

((window) => {
  window.aa = 'world';
  console.log(window.aa);
})(sandbox2.proxy);
