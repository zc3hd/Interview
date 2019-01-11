// 'use strict';




// obj.name = 1;
// console.log(obj.name);

// // // 007_JS_all
// function parent() {
//   console.log(arguments.callee);
// }


// // console.log()
// // parent()


// var arr = [1, 2, 3, 4, 5, 0];


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
// var arr_1 = arr.filter(function  (ele) {
// 	return ele;
// });

// console.log(arr_1);




// var obj = new Object();
// Object.defineProperty(obj, 'name', {
//   configurable: false,
//   enumerable: true,
//   writable: true,
//   value: '张三'
// })

// console.log(obj.name) //张三

// var desc = Object.getOwnPropertyDescriptor(obj, 'name');
// desc.enumerable=false;
// console.log(desc);


// var desc_1 = Object.getOwnPropertyDescriptor(obj, 'name');
// console.log(desc_1);




// var person = {
//     name: '张三',
//     age: 18
// }
// var desc = Object.getOwnPropertyDescriptors(person);
// console.log(desc) // 结果如下图


// var person = {};
// Object.defineProperty(person, 'name', {
//     configurable: false,
//     value: 'John'
// }) ;

// // 严格模式下抛出错误
// delete person.name   
// // 'John'  没有删除
// console.log(person.name) 


// Object.defineProperty(person, 'name', {
//     configurable: true  //报错
// });



var DOM_1 = document.getElementById('input1');
var DOM_2 = document.getElementById('input2');
var oSpan = document.getElementById('span');
var obj = {};
Object.defineProperties(obj, {
  val1: {
    configurable: true,
    get: function() {
      DOM_1.value = 0;
      DOM_2.value = 0;
      oSpan.innerHTML = 0;
      return 0
    },
    set: function(newValue) {

      DOM_2.value = newValue;
      oSpan.innerHTML = Number(newValue) ? Number(newValue) : 0
    }
  },
  val2: {
    configurable: true,
    get: function() {
      DOM_1.value = 0;
      DOM_2.value = 0;
      oSpan.innerHTML = 0;
      return 0
    },
    set: function(newValue) {
    	
      DOM_1.value = newValue;
      oSpan.innerHTML = Number(newValue) + 1;
    }
  }
})
DOM_1.value = obj.val1;

DOM_1.addEventListener('keyup', function() {
  obj.val1 = DOM_1.value;
}, false)
DOM_2.addEventListener('keyup', function() {
  obj.val2 = DOM_2.value;
}, false)
