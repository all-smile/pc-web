var strs = ["flower", "flow", "flight"]
function longestComPreFix(strArr) {
  if (strArr == null || strArr.length == 0) {
    return ""
  }
  // 默认第一个字符串是公共前缀
  var pre = strArr[0]
  var i = 1
  while (i < strArr.length) {
    // 不断截取
    while (strArr[i].indexOf(pre) != 0) {
      pre = pre.substring(0, pre.length - 1)
    }
    i++
  }
  return pre
}
console.log(longestComPreFix(strs)); // fl