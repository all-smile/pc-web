import defaultSettings from '@/settings/index'
const { title = '' } = defaultSettings || {}

function isPrototype(value) {
  const Ctor = value && value.constructor
  const proto = (typeof Ctor == 'function' && Ctor.prototype) || Object.prototype

  return value === proto
}

export const setStore = (name, content) => {
  try {
    if (content === undefined) {
      localStorage.removeItem(name)
    } else {
      localStorage.setItem(name, JSON.stringify(content))
    }
  } catch (e) {
    console.log('setStore error!')
  }
}

export const getStore = name => {
  try {
    let result = localStorage.getItem(name)
    return result ? JSON.parse(result) : null
  } catch (e) {
    console.log('getStore error!')
    return null
  }
}

export const removeStore = name => {
  try {
    localStorage.removeItem(name)
  } catch (e) {
    console.log('removeStore error!')
  }
}

export const clearStore = () => {
  try {
    localStorage.clearAll()
  } catch (e) {
    console.log('clearStore error!')
  }
}

/**
* 设置sessionstorage
*/
export const setItem = (key, value) => {
  try {
    sessionStorage.setItem(key, value)
  } catch (e) {
    console.log('setItem error!')
  }
}

/**
* 获取sessionstorage
*/
export const getItem = (key) => {
  try {
    return sessionStorage.getItem(key)
  } catch (e) {
    console.log('getItem error!')
  }
}

/**
* 删除sessionstorage
*/
export const removeItem = (key) => {
  try {
    sessionStorage.removeItem(key)
  } catch (e) {
    console.log('removeItem error!')
  }
}

/**
* 清空sessionstorage
*/
export const clearItem = () => {
  try {
    sessionStorage.clear()
  } catch (e) {
    console.log('removeItem error!')
  }
}

/**
* 获取cookie
*/
export const getCookie = name => {
  try {
    return Cookies.get(name)
  } catch (e) {
    console.log('getCookie error!')
    return null
  }
}

/**
* 设置cookie
* 默认0.5天过期
*/
export const setCookie = (name, value, option = {}) => {
  try {
    Cookies.set(name, value, option)
  } catch (e) {
    console.log('setCookie error!')
  }
}

/**
* 删除cookie
*/
export const removeCookie = (name, option = {}) => {
  try {
    Cookies.remove(name, option)
  } catch (e) {
    console.log('removeCookie error!')
  }
}

/**
* 清空all cookies
*/
export const clearCookie = function () {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  if (keys) {
    for (var i = keys.length; i--;) {
      document.cookie =
        keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  }
}

/**
* 退出清空cookies，清空storege
*/
export const clearCookiesStorege = function () {
  // clearStore()
  clearItem()
  // clearCookie();
}


/**
 * 判断是否是合法的url
 */
export const checkUrl = str => {
  var RegUrl = new RegExp()
  RegUrl.compile('^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&?/.=]+$')
  if (!RegUrl.test(str)) {
    return false
  }
  return true
}

/**
* 判断是否是合法的Email
*/
export const checkEmail = str => {
  var re = /^[a-zA-Z0-9_\.\-]{1,50}(-*)@[a-zA-Z0-9_\.\-]{1,50}(-*)\.[a-zA-Z0-9_\.\-]{1,50}(-*)$/
  /// ^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
  return !!re.test(str)
}

/**
* 判断是否合法的手机号码
*/
export const checkPhone = phone => {
  phone = trim(phone, 'g')
  var reg = /^(?=.*\d)[\d+_-]+$/
  return !!reg.test(phone)
  // return true // 不让校验
}

/**
* 判断是否合法的电话，(外贸国外号居多，放松验证))
*/
export const checkTel = tel => {
  tel = trim(tel, 'g')
  var reg = /^(?=.*\d)[\d+_-]+$/
  return !!reg.test(tel)
  // return true // 2019-1-2 按用户要求，不要验证
}

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
// 这里使用双指针解决
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

// 判断数组之间的关系, 元素顺序也必须一致
export const arrayInclude = (arrA, arrB) => {
  // 对数组arrA和arrB进行升序排序
  arrA.sort((a, b) => a - b)
  arrB.sort((a, b) => a - b)
  console.log(arrA, arrB);
  for (let i = 0; i < arrA.length; i++) {
    if (arrB.includes(arrA[i])) {
      // findIndex方法用于找到当前值的索引
      let index = arrB.findIndex(value => arrA[i] === value)
      if (index !== i) return -1 // 解决case 4
      // 以下两句，数组A，B中对应索引的值都删除掉
      arrB.splice(index, 1)
      arrA.splice(i, 1)
      // 上面的索引删除了，所以要继续遍历当前这个
      i--
    }
  }
  // 当B属于A时，返回2
  if (arrA.length > arrB.length) {
    return 2;
  }
  // 当A属于B时，返回1
  else if (arrA.length < arrB.length) {
    return 1;
  }
  // 当两者相等时，返回0
  else if (arrA.length === arrB.length) {
    return 0;
  }
}

/**
 * 判断数组元素的包含关系，不要求顺序一致
 * 数组中不存在重复元素
 * arrA包含arrB
 * 用于验证路由权限
*/
export const arrayIncludeV2 = (arrA, arrB) => {
  let flag = true
  for (let i = 0; i < arrB.length; i++) {
    if (!arrA.includes(arrB[i])) {
      flag = false
      break
    }
  }
  return flag
}

/**
 * 判断是否是对象
 */
export const isObject = (obj, isEffective = false) => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    if (isEffective) {
      return !!Object.keys(obj).length
    } else {
      return true
    }
  } else {
    return false
  }
}

/**
* 判断是否是数组类型，
* 并且是否是有效数组
*/
export const isArray = (array, isEffective = false) => {
  if (Object.prototype.toString.call(array) === '[object Array]') {
    if (isEffective) {
      return array.length > 0
    } else {
      return true
    }
  } else {
    return false
  }
}

/**
* 判断是否是字符串类型
*/
export const isString = (str, isEffective = false) => {
  if (Object.prototype.toString.call(str) === '[object String]') {
    if (isEffective) {
      return !!str
    } else {
      return true
    }
  } else {
    return false
  }
}

/**
* 判断是否是数值类型
*/
export const isNumber = num => {
  if (Object.prototype.toString.call(num) === '[object Number]') {
    return true
  } else {
    return false
  }
}

/**
* 判断是否是布尔类型
*/
export const isBoolean = boolean => {
  if (Object.prototype.toString.call(boolean) === '[object Boolean]') {
    return true
  } else {
    return false
  }
}
/**
* 判断对象是否有属性
*/
export const isEmptyObject = function (obj) {
  return typeof obj === 'object' && Object.keys(obj).length === 0
}
export const delEmptyStr = function (content, recurse) {
  for (var i in content) {
    if (content[i] === '') {
      delete content[i]
    } else if (recurse && typeof content[i] === 'object') {
      delEmptyStr(content[i], recurse)
    }
  }
}
export const delEmptyObj = function (content, recurse) {
  for (var i in content) {
    if (isEmptyObject(content[i])) {
      delete content[i]
    } else if (recurse && typeof content[i] === 'object') {
      delEmptyObj(content[i], recurse)
    }
  }
}
export const delEmptyStrObj = function (content, recurse) {
  delEmptyStr(content, recurse)
  delEmptyObj(content, recurse)
}

/**
 *  判断是否包含中文
 * @param {String} str
 * @returns {Boolean}
 */
export const hasHan = function (str) {
  let reg = /[\u4e00-\u9fa5]/g
  return reg.test(str)
}

/**
* 延时
* @param {number} duration
* @returns {Promise}
*/
export const sleep = function (duration = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, duration)
  })
}


export const deDuplication = function (arr) {
  try {
    // 返回新数组(去重后的数组)
    return Array.from(new Set(arr)) // es6
  } catch (err) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
      if (arr.indexOf(arr[i]) === i) {
        newArr.push(arr[i])
      }
    }
    console.log(err)
    return newArr
  }
}

// 四舍五入
export const roundNum = function (number = 0, decimal = 0) {
  // 处理有的后端给我们科学计数法的数字
  if (typeof (number) == 'string' && (number.indexOf('e') > 0 || number.indexOf('E') > 0)) {
    return new Decimal(number)
  }

  function accMul(arg1, arg2) {
    let m = 0
    let s1 = String(arg1)
    let s2 = String(arg2)
    try { m += s1.split('.')[1].length } catch (e) { }
    try { m += s2.split('.')[1].length } catch (e) { }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  }
  return Math.round(accMul(number, Math.pow(10, decimal))) / Math.pow(10, decimal)
}

export const throttle = function (func, duration) {
  let prev = 0
  let timer = null
  return function () {
    let now = Date.now()
    let ctx = this
    let args = arguments
    clearTimeout(timer)

    if (now - prev > duration) {
      func.apply(ctx, args)
      prev = Date.now()
    } else {
      timer = setTimeout(() => {
        func.apply(ctx, args)
      }, duration)
    }
  }
}


/**
 * 批注圆点色彩
 */
export const commentsColor = flag => {
  let colors = [
    '#909399',
    '#FF7165',
    '#5EA3F6',
    '#FFB735',
    '#37CBE3',
    '#8BD867',
    '#9B80F2',
    '#763626',
    '#FD8EC4',
    '#BFBF17'
  ]
  return 'color:' + colors[flag - 1]
}

export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16 | 0
    let v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * 标签背景色
 */
let tagsBgColors = [
  '#FF7165',
  '#5EA3F6',
  '#FFB735',
  '#37CBE3',
  '#8BD867',
  '#9B80F2',
  '#763626',
  '#FD8EC4',
  '#BFBF17',
  '#909399',
  '#D0021B'
]

export const tagsBgColor = colorId => {
  let str = 'color:#fff;background-color:'
  return str + tagsBgColors[colorId - 1]
}

export const isPc = () => {
  const ua = navigator.userAgent
  const moveDevices = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod"
  ]
  let flag = true;
  for (let i = 0; i < moveDevices.length; i++) {
    if (ua.indexOf(moveDevices[i]) !== -1) {
      flag = false;
      break
    }
  }
  return flag
}

export const closeCurWebPage = () => {
  if (!isPc()) {
    window.opener = null
    window.open("about:blank", "_self", "").close()
  }
  if (navigator.userAgent.indexOf(Firefox) !== -1 || navigator.userAgent.indexOf("Chrome") !== -1) {
    // 浏览器键入url方式打开的网页
    window.location.href = "about:blank"
    window.close()
  } else {
    // 脚本打开的网页
    window.opener = null
    window.open("about:blank", "_self", "")
    window.close()
  }
}

// 阿拉伯数字转罗马数字
export function intToRoman(num) {
  let map = {
      1: 'I',
      5: 'V',
      10: 'X',
      50: 'L',
      100: 'C',
      500: 'D',
      1000: 'M'
  }
  // 标识位数
  let digits = 1
  // 结果
  let result = ''
  while(num) {
      let current = num % 10
      if (current < 4) {
          result = map[digits].repeat(current) + result
      } else if (current === 4) {
          result = map[digits] + map[digits * 5] + result
      } else if (current > 4 && current < 9) {
          result = map[digits * 5] + map[digits].repeat(current - 5) + result
      } else {
          result = map[digits] + map[digits * 10] + result
      }
      digits *= 10
      num = Math.trunc(num/10)
  }
  return result
};

// 罗马数字转为阿拉伯数字
export function romanToInt(s) {
  let map = {
      'I': 1,
      'V': 5,
      'X': 10,
      'L': 50,
      'C': 100,
      'D': 500,
      'M':1000
  }
  let index = 0
  let result = 0
  let len = s.length
  while(index < len) {
      let current = map[s[index]]
      result += current
      if (index > 0) {
          let before = map[s[index-1]]
          if ((current === 5 || current === 10) && before === 1) {
              result -= 2
          }
          if ((current === 50 || current === 100) && before === 10) {
              result -= 20
          }
          if ((current === 500 || current === 1000) && before === 100) {
              result -= 200
          }
      }
      index++
  }
  return result
};