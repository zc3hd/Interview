// 'use strict';




// // 007_JS_all
function parent() {
  console.log(arguments.callee);
}


// console.log()
// parent()


var arr = [1, 2, 3, 4, 5, 0];


// ;
// console.log(arr.splice(2,1,"a"))

// console.log(arr);


// arr.sort(function(a, b) {
//   // a:后面的值
//   // b:前面的值
//   console.log(a, b);
//   return b-a;
// });

// console.log(arr);
var arr_1 = arr.filter(function  (ele) {
	return ele;
});

console.log(arr_1);