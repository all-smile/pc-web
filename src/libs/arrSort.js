var arr = [5, 1, 42, 10, 28]

// 冒泡排序
function bubbleSort(arr) {
  var temp = 0
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // 交换位置
        temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
}
// bubbleSort(arr)
console.log(arr);

// 快速排序
function Quicksort(left, right, arr) {
  var L = left
  var R = right
  if (left >= right) {
    return
  }
  // 选定中轴
  var pivot = arr[left]
  while (left < right) {
    while (left < right && arr[right] > pivot)
      right--
    if (left < right) {
      arr[left] = arr[right]
    }
    while (left < right && arr[left] <= pivot)
      left++
    if (left < right) {
      arr[right] = arr[left]
    }
    if (left >= right) {
      arr[left] = pivot
    }
  }
  // 左递归
  Quicksort(L, right - 1, arr)
  // 右递归
  Quicksort(right + 1, R, arr)

}

Quicksort(0, arr.length - 1, arr)
console.log(arr);
