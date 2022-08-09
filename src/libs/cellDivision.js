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
    if (n === 0 || n === 1) return 0;
    return green(n - 1);
  };

  var green = function (n) {
    // 设置出口， 边界条件
    if (n === 0) return 0;
    return white(n - 1);
  };

  var white = function (n) {
    // 设置出口， 边界条件
    if (n === 0) return 1;
    return white(n - 1) + green(n - 1) + yellow(n - 1);
  };
  return yellow(n) + green(n) + white(n);
}

console.log("0=", total(0));
console.log("1=", total(1));
console.log("2=", total(2));
console.log("3=", total(3));
console.log("4=", total(4));
console.log("5=", total(5));
console.log("6=", total(6));
console.log("30=", total(30));
/*
1
2
4
7
13
24
123
*/

function total02(n) {
  if (n <= 0) {
    return 1;
  }
  if (n < 3) {
    return 2 * n;
  }
  if (n >= 3) {
    return 2 * total02(n - 1) - total02(n - 4);
  }
}
console.log("归纳法：");
console.log("0=", total02(0));
console.log("1=", total02(1));
console.log("2=", total02(2));
console.log("3=", total02(3));
console.log("4=", total02(4));
console.log("5=", total02(5));
console.log("6=", total02(6));
console.log("30=", total02(30));
console.log("50=", total02(50));

/*
归纳法：
0= 1
1= 2
2= 4
3= 7
4= 13
5= 24
6= 44
50= 19426970897100
*/


/*
// this

const a = { b: 3 }

function foo(obj) {
  obj.b = 5

  return obj
}

const aa = foo(a)

console.log('a.b:', a.b)

console.log("aa.b:", aa.b)


// 原型

function Ofo() { }

function Bick() {
  this.name = 'mybick'
}

var myBick = new Ofo()

Ofo.prototype = new Bick()

var youbick = new Bick()

console.log("myBick.name:", myBick.name)

console.log("youbick.name:", youbick.name) */
