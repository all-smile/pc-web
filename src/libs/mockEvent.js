if (process.env.NODE_ENV === 'development') {
  // 触发
  let myEvent = new CustomEvent('deviceready');

  // 模拟JSAPI事件
  window['JSAPI'] = {
    showToast(type, desc) {
      console.log(type, desc)
    }
  }

  // 在 原生 load 方法之后 触发自定义事件
  window.addEventListener('load', function () {
    console.log('load OK!');
    setTimeout(() => {
      window.dispatchEvent(myEvent);
    }, 100)
  }, false);


  // window.addEventListener('deviceready', function () {
  //   console.log('deviceready OK!');
  // }, false);
}
