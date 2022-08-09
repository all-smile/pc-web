// var test_npm = require('xiaojuntao-npm-test001');
// console.log(test_npm)
// console.log(test_npm.f1(11));
// console.log(test_npm.name)

/* function testV8() {
  this[100] = 'test-100'
  this[1] = 'test-1'
  this["D"] = 'foo-D' // 字符串key
  this["B"] = 'foo-B'
  this[50] = 'test-50'
  this[9] = 'test-9'
  this[8] = 'test-8'
  this[3] = 'test-3'
  this[5] = 'test-5'
  this["4"] = 'test-4' // 整型key
  this["A"] = 'foo-A'
  this["C"] = 'foo-C'
  this[4.5] = "foo-4.5" // 非整型key
}

const testObj = new testV8()

for (const key in testObj) {
  console.log(`key:${key}, value:${testObj[key]}`)
} */

function testV8(properties, elements) {
  //添加可索引属性

  for (let i = 0; i < elements; i++) {
    this[i] = `element${i}`;
  }

  //添加常规属性

  for (let i = 0; i < properties; i++) {
    const prop = `property${i}`;

    this[prop] = prop;
  }
}

// const testobj = new testV8(15, 10);

// // %DebugPrint(testobj);

// for (let key in testobj) {
//   console.log(`${key}:${testobj[key]}`);
// }

const testobj1 = new testV8(100, 200);

// const testobj2 = new testV8(12, 13);

// testobj2.new = "new";
// console.log(testobj1);
// 打印 testobj1 详细的运行时信息
// %DebugPrint(testobj1);

console.log("===============================");
// const testArr = [1, "hello", true, function () {
//   return 1;
// }];
// %DebugPrint(testArr);

/* const arr = [1, 2, 3, 4];
arr.push(5);
// arr[1999] = 1999;
%DebugPrint(arr); */

/* const o = ["a", "b", "c"];
console.log(o[1]); // 'b'.

delete o[1];
console.log(o[1]); // undefined
o.__proto__ = { 1: "B" };
console.log(o[0]); // 'a'.
console.log(o[1]); // 'B'. 但如何确定要访问原型链？
console.log(o[2]); // 'c'.
console.log(o[3]) % // undefined

%DebugPrint(o); */
