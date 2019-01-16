// $('#sp_2')[0].on('error',function (e) {
// 	console.log(e);
// });


// document.getElementById("sp_2").addEventListener("error", function(e) {
//   console.log(e);
// }, false);


// document.getElementById("img").onerror = function(e) {
//   console.log(e);
// };

// document.getElementById("sp_2").onerror = function(e) {
//   console.log(e);
// };


// performance.getEntries().forEach( function(ele, index) {
// 	console.log(ele);
// });
// function add (num) {

// }

// 
// $("img").error(function(e){
// 	console.log(e);
// });
var img = new Image()
img.src = 'http://www.baidu.com/test.js';
img.onerror = function(e) {
  console.log(e);
};

window.addEventListener("error", function(e) {
  console.log(e)
}, true);



// var all = 0;
// var add = function  (num) {
// 	all+=num;
// 	return add;
// };
// add.all = 0;
// add(10)(20)(10)(20)(30);
// console.log(all);

// window.onerror = function (e) {
// 	console.log(e);
// };
