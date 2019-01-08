// 'use strict';




// // 007_JS_all
// function parent(param1, param2, param3) {
//   child(param1, param2, param3);
// }

// function child() {
//   console.log(arguments); // { '0': 'mqin1', '1': 'mqin2', '2': 'mqin3' }
//   console.log(arguments.callee); // [Function: child]
//   console.log(child.caller); // [Function: parent]
// }

// parent('mqin1', 'mqin2', 'mqin3');



// function P () {
// 	var p_1 ="1";
// 	return function  () {
// 		console.log(p_1);
// 		p_1 = null;

// 		console.log(arguments.callee);
// 	}
// }


// P()();

// console.log(Object.prototype)