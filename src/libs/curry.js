// 函数柯里化

/*
function add() {
  // 定义args存储所有参数
  let args = Array.prototype.slice.call(arguments);
  // 内部声明一个函数，利用闭包的特性保存args, 进行参数收集
  let inner = function () {
    args.push(...arguments)
    return inner
  }
  inner.toString = function () {
    return args.reduce(function (preSum, cur) {
      return preSum + cur
    })
  }
  return inner;
}

console.log("add(1)(2): ", add(1)(2)) // ƒ 10 函数类型
// console.log("add(1)(2)(3): ", add(1)(2)(3)) // ƒ 10 函数类型
// console.log(add(1)(2)(3)(4)) // ƒ 10 函数类型
 */




// 函数式编程
function compose() {
  let args = arguments;
  console.log(args)
  let start = args.length - 1;
  return function () {
    let i = start - 1;
    let result = args[start].apply(this, arguments);
    console.log("result:", result);
    while (i >= 0) {
      result = args[i].call(this, result);
      i--;
    }
    return result;
  };
}

// 使用
function add(x) {
  return x + 10
}
function multiply(x) {
  return x * 10
}
function minus(x) {
  return x - 10
}

let composeFun = compose(minus, multiply, add);
composeFun(2) // 110







