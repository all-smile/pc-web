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