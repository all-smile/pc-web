// 1、手写实现原生JSON.stringify

var str = ''
var arr = []
function jsonStr(obj = {}) {
  for (const key in obj) {
    arr.push(`"${key}":${obj[key]}`)
  }
  str = arr.join(',')
  return `{${str}}`
}
var obj = {
  a: 1,
  b: 2
}
console.log("jsonStr =", jsonStr(obj))
console.log("JSON.stringify =", JSON.stringify(obj))
console.log(jsonStr(obj) === JSON.stringify(obj))




// 2、输入: s = "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3

function getChiStr(str = "") {
  var target = []
  var maxStrLen = 0
  var arr = [str.substring(0, 1)]
  for (let i = 1; i < str.length; i++) {
    if (!arr.includes(str[i])) {
      arr.push(str[i])
    } else {
      var tmpstr = arr.join("")
      var tem = tmpstr.length
      if (tem > maxStrLen) {
        maxStrLen = tem
      }
      target.push(tmpstr)
      arr = Object.assign([])
      arr.push(str[i])
    }
  }
  return maxStrLen

}

console.log(getChiStr("abcabcbb"))




