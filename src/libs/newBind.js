// 实现bind方法
Function.prototype.newBind = function (o) {
  if (typeof this != 'function') {
    throw new TypeError("error")
  }
  var that = this;
  var arr = Array.prototype.slice.call(arguments, 1)
  // 原型链 空函数桥接
  var bridgeF = function () { }
  newF = function () {
    // console.log(this instanceof newF);
    // console.log([...arguments]);
    // that.apply(o, [...arr, ...arguments])
    if (this instanceof bridgeF) {
      that.apply(this, [...arr, ...arguments])
    } else {
      that.apply(o, [...arr, ...arguments])
    }
  }
  bridgeF.prototype = that.prototype
  newF.prototype = new bridgeF
  return newF
  // return function () {
  //   console.log([...arguments]);
  //   that.apply(o, [...arr, ...arguments])
  // }
}

function person(a, b, c) {
  console.log(this.name);
  console.log("abc", a, b, c);
}
person.prototype.collection = "收藏"

var obj = {
  name: "xiao"
}

// person.newBind(obj, "test", "aa")("xixi")
var bibi = person.newBind(obj, "test", "aa")
var b = new bibi("xixi")
console.log("b.collection", b.collection);


/*
undefined
newBind.js?9854:31 abc test aa xixi
newBind.js?9854:42 b.collection 收藏
*/

