var arr = [
  { id: 1, name: "部门A", parentId: 0 },
  { id: 3, name: "部门C", parentId: 1 },
  { id: 4, name: "部门D", parentId: 1 },
  { id: 5, name: "部门E", parentId: 2 },
  { id: 6, name: "部门F", parentId: 3 },
  { id: 7, name: "部门G", parentId: 2 },
  { id: 8, name: "部门H", parentId: 4 },
  { id: 18, name: "部门K", parentId: 4 },
];

// 方法一
function arrToTree01(arr) {
  arr.forEach((item) => {
    // 复杂数据类型浅拷贝，地址引用，修改一个的同时修改所有引用
    let children = arr.filter((v) => item.id === v.parentId);
    // item.children = children.length > 0 ? (item.children = JSON.parse(JSON.stringify(children))) : []; // 深拷贝，解除引用
    item.children = children.length > 0 ? (item.children = children) : [];
  });
  return arr;
}

// console.log('arrToTree01', arrToTree01(arr));

