// 防抖
// var debounce = function (fn, wait) {
//   let timer, timeStamp =
// }


function coloring() {
  console.log(111);
  let r = Math.floor(Math.random() * 255)
  let g = Math.floor(Math.random() * 255)
  let b = Math.floor(Math.random() * 255)
  document.querySelector(".App").style.background = `rgb(${r},${g},${b})`
}

// 防抖（延迟，自动门原理）
var debounce = function (fn, delay, immediate = false) {
  let timer
  var context, args;
  var pre = 0

  var run = function () {
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }

  return function () {
    // 闭包
    console.log("pre", pre, timer);
    context = this
    args = arguments
    if (!timer) {
      if (immediate) {
        fn.apply(context, args)
      }
    }
    let now = new Date().getTime()
    if (now - pre < delay) {
      console.log("reset");
      clearTimeout(timer)
      timer = null
      run()
    } else {
      console.log("set");
      run()
    }
    pre = now
  }
}

function stdout() {
  console.log("防抖输出");
}

// 节流
var throttle = function (fn, delay) {
  let timer
  return function () {
    let context = this
    let args = arguments
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(context, args)
      timer = null
    }, delay)
  }
}
// window.addEventListener('resize', throttle(coloring, 1000))
window.addEventListener('resize', debounce(stdout, 1000, true))