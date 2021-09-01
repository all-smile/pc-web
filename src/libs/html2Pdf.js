import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
// 将base64转换为文件对象
const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  // 转换成file对象
  return new File([u8arr], filename, { type: mime })
  // 转换成成blob对象
  // return new Blob([u8arr],{type:mime});
}

// 导出页面为PDF格式
export const htmlToPdf = (element, fileName, callback = null) => {
  html2Canvas(element, {
    allowTaint: true, // 允许污染
    scale: 2 // 画质
  }).then(function (canvas) {
    let contentWidth = canvas.width
    let contentHeight = canvas.height
    let pageHeight = contentWidth / 592.28 * 841.89
    let leftHeight = contentHeight
    let position = 0
    let imgWidth = 595.28
    let imgHeight = 592.28 / contentWidth * contentHeight
    let pageData = canvas.toDataURL('image/jpeg', 1.0)
    let PDF = new JsPDF('', 'pt', 'a4')
    if (leftHeight < pageHeight) {
      PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
    } else {
      while (leftHeight > 0) {
        PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        leftHeight -= pageHeight
        position -= 841.89
        if (leftHeight > 0) {
          PDF.addPage()
        }
      }
    }
    // 将pdf输入为base格式的字符串
    let buffer = PDF.output('datauristring')
    // 将base64格式的字符串转换为file文件
    let myfile = dataURLtoFile(buffer, fileName + '.pdf')
    let filelist = [myfile]
    callback && callback(filelist)
    // PDF.save(fileName + '.pdf') // 保存本地pdf
  })
}
export const htmlToPdfSave = (element, fileName, callback = null) => {
  html2Canvas(element, {
    allowTaint: true, // 允许污染
    scale: 2 // 画质
  }).then(function (canvas) {
    let contentWidth = canvas.width
    let contentHeight = canvas.height
    let pageHeight = contentWidth / 592.28 * 841.89
    let leftHeight = contentHeight
    let position = 0
    let imgWidth = 595.28
    let imgHeight = 592.28 / contentWidth * contentHeight
    let pageData = canvas.toDataURL('image/jpeg', 1.0)
    let PDF = new JsPDF('', 'pt', 'a4')
    if (leftHeight < pageHeight) {
      PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
    } else {
      while (leftHeight > 0) {
        PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        leftHeight -= pageHeight
        position -= 841.89
        if (leftHeight > 0) {
          PDF.addPage()
        }
      }
    }
    // 将pdf输入为base格式的字符串
    let buffer = PDF.output('datauristring')
    // 将base64格式的字符串转换为file文件
    let myfile = dataURLtoFile(buffer, fileName + '.pdf')
    let filelist = [myfile]
    PDF.save(fileName + '.pdf') // 保存本地pdf
  })
}
