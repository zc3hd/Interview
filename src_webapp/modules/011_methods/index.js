'use strict';



// function maopao(arr) {
//   for (var i = 0; i < arr.length - 1; i++) {
//     for (var j = i + 1; j < arr.length; j++) {
//       // 如果前面的大,交换位置
//       var temp = [];

//       // 其实是选最小值，>的话会把小的放在前面，一直会把最小的放在前面。
//       if (arr[i] > arr[j]) {
//         temp = arr[i];
//         arr[i] = arr[j];
//         arr[j] = temp;
//       }
//     }
//   }
//   return arr;
// }
// var arr = [1, 9, 3, 7, 2, 8, 3, 99, 44, 1, 6];
// maopao(arr);
// console.log("冒泡排序");
// console.log(arr);





// function selectSort(arr) {
//   var minIndex;
//   var temp;
//   // 循环
//   for (var i = 0; i < arr.length - 1; i++) {
//     minIndex = i;
//     // 找到从i开始到最后的最小的数
//     for (var j = i + 1; j < arr.length; j++) {
//       if (arr[j] < arr[minIndex]) {
//         minIndex = j;
//       }
//     }

//     temp = arr[i];
//     arr[i] = arr[minIndex];
//     arr[minIndex] = temp;
//   }
//   return arr;
// }
// var arr3 = [99, 9, 3, 7, 24, 8, 3, 3, 3, 3, 3, 99, 44, 1, 6];

// console.log(selectSort(arr3));







// var arr = [1, 9, 3, 7, 2, 8, 3, 99, 44, 1, 6];
// function quick_sort(arr) {
// 	if (arr.length<=1) {
// 		return arr;
// 	}
//   var index = Math.floor(arr.length / 2);
//   var mid_item = arr.splice(index, 1)[0];
//   // console.log(mid_item);

//   var left_arr = [];
//   var right_arr = [];
//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i] < mid_item) {
//       left_arr.push(arr[i]);
//     }
//     // 
//     else {
//       right_arr.push(arr[i]);
//     }
//   }
//   // console.log(left_arr, right_arr);

//   return quick_sort(left_arr).concat(mid_item, quick_sort(right_arr));
// }

// console.log(quick_sort(arr));




// function shellSort(arr) {
//   var len = arr.length,
//       temp,
//       gap = 1;
//       while (gap < len/3) {
//         gap = gap*3 + 1;
//       }
//       console.log(gap);
//       console.log('xxxx');
//       for (gap; gap > 0; gap = Math.floor(gap/3)) {
//       	console.log(gap);
//         for (var i = gap; i < len; i++) {
//           temp = arr[i];
//           for (var j = i-gap; i >= 0 && arr[j] > temp; j-=gap) {
//             arr[j + gap] = arr[j];
//           }
//           arr[j + gap] = temp;
//         }
//         console.log('------------------------------')
//       }
//       return arr;
// }

// let arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

// console.log(shellSort(arr)); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]