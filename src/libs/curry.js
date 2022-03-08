// 函数柯里化
function plus() {
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

// console.log("plus(1)(2): ", plus(1)(2)) // ƒ 10 函数类型
// console.log("plus(1)(2)(3): ", plus(1)(2)(3)) // ƒ 10 函数类型
// console.log(plus(1)(2)(3)(4)) // ƒ 10 函数类型


function createCurry(func, arrArgs) {
  var args = arguments;
  var funcLength = func.length;
  var arrArgs = arrArgs || [];
  // console.log("arrArgs", arrArgs);
  // console.log("args", args);

  return function () {
    var _arrArgs = Array.prototype.slice.call(arguments);
    var allArrArgs = arrArgs.concat(_arrArgs)
    // console.log("allArrArgs", allArrArgs);

    // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
    if (allArrArgs.length < funcLength) {
      return args.callee.call(this, func, allArrArgs);
    }

    // 参数收集完毕，则执行func
    return func.apply(this, allArrArgs);
  }
}

// createCurry 返回一个柯里化函数
var sumCurry = createCurry(function (a, b, c) {
  return a + b + c;
});
var result = sumCurry(1)(2)(3) // 6
console.log("sumCurry(1)(2)(3)=", result);
// sumCurry(1)(2)(3) // 6
// sumCurry(1, 2, 3) // 6
// sumCurry(1)(2,3) // 6
// sumCurry(1,2)(3) // 6

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

// let composeFun = compose(minus, multiply, add);
// composeFun(2) // 110







