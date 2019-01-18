'use strict';

function App() {}
App.prototype = {
  init: function() {
    var me = this;

    // 
















  },
};
new App().init();


// var o1 = { name: "o1" };
// console.log(o1);
// var o2 = new Object({ name: 'o2' });
// console.log(o2);


// function M() {
//   this.name = 'o3'
// }
// var o3 = new M();
// console.log(o3);



// var o4 = Object.create({ name: "o4" });
// console.log(o4);



// var new2 = function(Func) {
//   var obj = Object.create(Func.prototype);

//   var func_obj = Func.call(obj);
//   if (typeof func_obj == 'object') {
//     return func_obj;
//   }
//   return obj;
// }



// function FN(argument) {
//   // body... 
// }
// FN.prototype.hi = function(argument) {
//   console.log(hi);
// };

// var obj = Object.create(FN.prototype);
// FN.call(obj);

// console.log(obj.__proto__ == FN.prototype);


function FN() {
	this.a =1;
}

var obj = {};

// FN.call(obj);
// console.log()

// console.log(obj);



function FN() {
  this.a =1;
  console.log(this.b);
}

// var obj = new FN();
// console.log(obj);
var obj = {b:10};
// ;
console.log(FN.call(obj))

// console.log(obj); //{a:1}



function _call(fn, obj) {
	// this = obj;
	for(var key in obj){
		fn.prototype[key] = obj[key];
	}
	var fn_obj = new fn();
	// return fn_obj;

	for(var _key in fn_obj){
		obj[_key] = fn_obj[_key];
	}
}
// _call(FN,obj)

// console.log(obj);