// 'use strict';




// obj.name = 1;
// console.log(obj.name);

// // // 007_JS_all
// function parent() {
//   console.log(arguments.callee);
// }


// // console.log()
// // parent()


var arr = [1, 2, 3, 4, 5, 6];
// var _arr = arr;

// console.log(arr.splice(2,0,'a'))


var arr = [2,3,4,4,5,2,3,6];
var arr2 = arr.filter(function(element,index,self){
	// console.log(self.indexOf(element));
	return 1;
});
// // splice(2,0,"a")
console.log(arr);



// console.log(total,items); // 1130

// arr.sort(function(a, b) {
//   // a:后面的值
//   // b:前面的值
//   console.log(a, b);
//   return b-a;
// });

// console.log(arr);
// var arr_1 = arr.filter(function  (ele) {
// 	return ele;
// });

// console.log(arr_1);

















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