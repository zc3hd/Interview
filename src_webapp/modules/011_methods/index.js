'use strict';

function App() {}
App.prototype = {
  init: function() {
    var me = this;
  },
};
new App().init();



// function P(argument) {
// 	this.name = "p";
// }
// P.prototype.p_fn = function() {
//   console.log("p_fn");
// };

// function s_1 () {
// 	// 构造函数上的属性就挂载过来了。但是原型上的函数是没有挂载过来。
// 	P.call(this);
// }
// s_1.prototype.s_fn = function(argument){
// 	console.log("s_fn");
// };







// function P(argument) {
// 	this.name = "p";
// 	this.arr = [1,2,3];
// }
// P.prototype.p_fn = function() {
//   console.log("p_fn");
// };

// function s_1 () {
// }
// s_1.prototype= new P();


// var sl_1 = new s_1();
// var sl_2 = new s_1();

// sl_1.arr.push("a");
// console.log(sl_2.arr);
// // new s_1().hi();
// console.log(new s_1())






function P(argument) {
  this.name = "p";
  this.arr = [1, 2, 3];
}
P.prototype.p_fn = function() {
  console.log("p_fn");
};

function s_1() {
  P.call(this);
}
s_1.prototype = P.prototype;
s_1.prototype.constructor = s_1;



var sl_1 = new s_1();
var sl_2 = new s_1();
sl_1.arr.push("a");
console.log(sl_1.constructor);
// console.log(sl_2.arr);
