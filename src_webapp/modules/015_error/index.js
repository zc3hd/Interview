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


// 
$("img").error(function(e){
	console.log(e);
});


window.addEventListener("error",function(e){
	console.log(e)
},true);



// window.onerror = function (e) {
// 	console.log(e);
// };
