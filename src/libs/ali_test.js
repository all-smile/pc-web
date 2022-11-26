// 1
// 实现加减乘除链式调用，类似 jQuery 式用法

// 输出90
// console.log(myCalculator(121).add(1).minus(2));

/* function myCalculator(initNum) {
  return {
    add: (n) => {
      console.log("add", initNum + n);
      return this.myCalculator(initNum + n)
    },
    minus: (n) => {
      console.log("minus",initNum - n);
      return this.myCalculator(initNum - n)
    }
  };
}

console.log(myCalculator(121).add(1).minus(2)); */

/*
// 2.
function observer(obj, path, cb) {
  // your code
  path.forEach((key) => {
    let value = "";
    if (key) {
      const _key = key.split(".");
      if (_key.length > 1) {
        let tmp = obj;
        _key.forEach((k) => {
          // console.log('k',k);
          // console.log('tmp[k]',tmp[k]);
          // if (tmp[k] && typeof tmp[k] === 'object') {
          // }
          observer(tmp, [k], cb);
          tmp = tmp[k];
        });
        value = tmp;
      } else {
        value = obj[key];
      }
      // value = obj[key];
      // console.log("key", key);
      console.log("obj", obj);

      Object.defineProperty(obj, key, {
        get() {
          return value;
        },
        set(newV) {
          if (newV !== value) {
            cb && cb(newV, value);
            value = newV;
          }
        },
      });
    }
  });
}

// 以下是用例
var o = {
  a: 1,
  b: 2,
  c: {
    x: 1,
    y: 2,
  },
};

observer(o, ['a',"c.x"], (v, prev) => {
  console.log("newV=", v, " oldV=", prev);
});

o.a = 2; // 2, 1
// o.b = 3; // 不打印
o.c.x = 3; // 3, 1
o.c.y = 3; // 不打印


*/

// 3.
// 1 ，1 ，2 ，3 ，5 ，8， 13 ，21 ，34 ......

const fbn = (n) => {
  if (n == 1 || n == 2) {
		return 1
  } else {
		return fbn(n-2) + fbn(n-1)
	}
}
console.time('fbn')
console.log('fbn(40)=', fbn(40))
console.timeEnd('fbn')

// 利用数组记录过往的值，直接使用，避免重复计算
const fbn2 = (n) => {
  let arr = new Array(n + 1); // 定义 n + 1 长度的数组
  arr[1] = 1;
  arr[2] = 1;
  for (let i = 3; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2]
  }
  return arr[n]
}

console.time('fbn2')
console.log('fbn2(40)=', fbn2(40))
console.timeEnd('fbn2')


const fbn3 = (n) => {
  if (n === 1 || n === 2) {
    return 1;
  }
  let pre1 = 1 // pre1，pre2记录前面两项
  let pre2 = 1
  let tmp = ''

  for (let i = 3; i <= n; i++) {
    tmp = pre1 + pre2 // 2
    pre1 = pre2 // 1
    pre2 = tmp // 2
  }
  return pre2
}

console.time('fbn3')
console.log('fbn3(40)=', fbn3(40))
console.timeEnd('fbn3')

/*

function getIndexByNum(num) {
  if (num < 1) {
    console.log('不是斐波那契数');
		return
  }
  if (num <= 2) {
    return num
  }

  let pre1 = 2
  let pre2 = 1
  let tmp = ''

  let flag = true
  let index = 3
  while (flag) {
    // const val = fbn(index)
    const val = pre1 + pre2 // 3
    tmp = pre1 // 2
    pre1 = val // 3
    pre2 = tmp // 2
    console.log('pre1=', pre1, 'pre2=',pre2);
    if (val == num) {
      flag = false
    } else {
      index++
    }
  }
  return index
}

console.log('fbn-index=', getIndexByNum(8))
*/