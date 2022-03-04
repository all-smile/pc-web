// 细胞分裂算法
/*
一个细胞，一小时分裂一次，声明周期是三小时，求n小时后有多少细胞？
细胞消亡： 白色 -> 绿色 -> 黄色 -> 黑色
白色：新细胞，分裂一次后产生一个白色细胞，自己则变成绿色
绿色细胞再次分裂出一个白色细胞，自己则变成黄色
黄色细胞再次分裂出一个白色细胞，自己则变成黑色，黑色即声明周期结束
存活的细胞 = 白色 + 绿色 + 黄色
*/

function total(n) {
  var yellow = function (n) {
    // 设置出口， 边界条件
    if (n === 0 || n === 1) return 0
    return green(n - 1)
  }

  var green = function (n) {
    // 设置出口， 边界条件
    if (n === 0) return 0
    return white(n - 1)
  }

  var white = function (n) {
    // 设置出口， 边界条件
    if (n === 0) return 1
    return white(n - 1) + green(n - 1) + yellow(n - 1)
  }
  return yellow(n) + green(n) + white(n)
}

console.log(total(0));
console.log(total(1));
console.log(total(2));
console.log(total(3));
console.log(total(4));
console.log(total(5));
/*
1
2
4
7
13
24
123
*/

const a = { b: 3 }

function foo(obj) {
  obj.b = 5

  return obj
}

const aa = foo(a)

console.log('a.b:', a.b)

console.log("aa.b:", aa.b)



function Ofo() { }

function Bick() {
  this.name = 'mybick'
}

var myBick = new Ofo()

Ofo.prototype = new Bick()

var youbick = new Bick()

console.log("myBick.name:", myBick.name)

console.log("youbick.name:", youbick.name)