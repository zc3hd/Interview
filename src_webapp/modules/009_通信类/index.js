'use strict';

function App() {}
App.prototype = {
  init: function() {
    var me = this;
  },
};
new App().init();



// function getHttpObj() {
//   var httpobj = null;
//   try {
//     httpobj = new ActiveXObject("Msxml2.XMLHTTP");
//   }
//   // 
//   catch (e) {
//     try {
//       httpobj = new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     // 
//     catch (e1) {
//       httpobj = new XMLHttpRequest();
//     }
//   }
//   return httpobj;
// }

// var xhr = getHttpObj();


// // 
// xhr.open("post", "xxx", true);
// //缺少这句，后台无法获取参数  
// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");

// var content = '';
// for (var key in daya) {
//   content += key + '=' + daya[key] + '&';
// }
// content = content.slice(0, content.length - 1);
// xhr.send(content);


// // xhr.onreadystatechange
// xhr.onload = function(argument) {
//   if (xhr.readyState == 4 && xhr.status == 200) {
//     JSON.parse(xhr.responseText)
//   }
// };
