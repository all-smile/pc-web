import defaultSettings from '@/settings/index'
const { title = '' } = defaultSettings || {}

/**
 * js获取文件后缀
 */
export const getSuffix = function (fileName) {
  var fileNameArray = fileName.split('.')
  return fileNameArray[fileNameArray.length - 1]
}

/**
 * 检查文件后缀，是否有这个图标，没有的话，给unknow
 * console.log(isHasSuffix('doc'))
 */
export const isHasSuffix = suffix => {
  let suffixArray = ['xls', 'doc', 'docx', 'ppt', 'pptx', 'avi', 'rar', 'mp3', 'mp4', 'zip', 'html', 'pdf', 'eps', 'xlsx']
  suffix = suffix.toLowerCase()
  return suffixArray.indexOf(suffix) === -1 ? 'unknow' : suffix
}

export const getPageTitle = (pageTitle) => {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

// 双指针去重, 返回去重后数组的长度
export const returnUnrepeatedLen = (arr) => {
  if (Array.isArray(arr) && arr.length > 0) {
    let left = 0;
    for (let right = 0; right < arr.length; right++) {
      // 1、如果左指针和右指针一样，说明有重复的元素，这个时候，左指针不动，右指针继续向右移动，
      // 2、如果左右指针指向的值不一样，就把右指针指向艾昂的值往前移动，并把右指针的值赋给左指针
      if (arr[left] !== arr[right]) {
        arr[++left] = arr[right]
      }
    }
    return ++left
  } else {
    return 0
  }
}

// 求一个0~n的数组nums里面在[0, n]范围里缺少的数字，nums中所有数字都独一无二
export const onlyOnce = (arr) => {
  console.log(1231321);
  if (Array.isArray(arr) && arr.length > 0) {
    let xor = 0
    for (let index = 0; index < arr.length; index++) {
      xor ^= arr[index] ^ index
    }
    return xor ^ arr.length
  } else {
    return null
  }
}

// 判断是否是有效括号
export const isAvailableBrackets = (str) => {
  let stack = [] // 定义栈
  // 定义括号集
  const brackets = {
    '(': ')',
    '[': ']',
    '{': '}'
  }
  const leftBrackets = Object.keys(brackets)
  const rightBrackets = Object.values(brackets)
  for (let i = 0; i < str.length; i++) {
    // 如果是左括号，把对应的右括号压栈
    // 如果是右括号，判断栈是否为空
    if (leftBrackets.includes(str.charAt(i))) {
      stack.push(brackets[str.charAt(i)])
    } else if (rightBrackets.includes(str.charAt(i))) {
      if (stack.length === 0) {
        return false
      } else {
        let stackTop = stack.pop() // 栈顶元素出栈
        if (stackTop === str.charAt(i)) {
          continue
        } else {
          return false
        }
      }
    }
  }
  // 遍历结束之后，判断栈是否为空
  if (stack.length === 0) {
    return true
  } else {
    return false
  }
}

// 一维数字数组排序
export const arrSort = (arr) => {
  arr.sort((a, b) => { return a - b });
  return [...arr]
}

// 两个一维数字数组求交集
// 也可以使用map解决，创建json, key: value
export const getMixed = (arr1, arr2) => {
  arr1.sort((a, b) => { return a - b })
  arr2.sort((a, b) => { return a - b })
  let i = 0
  let j = 0
  let list = [] // 存放相同数组元素
  // 当其中一个数组遍历结束就跳出循环
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      // 如果i指向的值小于j指向的值，说明i指向的值小了，i往后移一步
      i++
    } else if (arr1[i] > arr2[j]) {
      // 如果i指向的值大于j指向的值，说明j指向的值小了，j往后移一步
      j++
    } else {
      // 如果i指向的值等于j指向的值， 说明这两个值是重复的元素，存入list中，i和j同时后移
      list.push(arr1[i])
      i++
      j++
    }
  }
  return [...list]
}
