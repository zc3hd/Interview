'use strict';

function App() {}
App.prototype = {
  init: function() {
    var me = this;


    // var _2 = 1;
    // console.log(_2);


    // console.log(Number(true));
    // console.log(Number());

    // var str = '123456789';
    // str.slice(2,3);
    // console.log(str.slice(2,3));
    // console.log(str.slice(-3));

    // $('.dom_1').offsetHeight;
    // console.log($('.dom_1')[0].offsetHeight);
    // console.log($('.dom_1')[0].offsetLeft);
    // console.log($('.dom_1')[0].scrollHeight);

    // var f =0;
    // function fn() {
    //   var a = f = 1;
    // }
    // // fn();
    // console.log(fn());
    // console.log(f);




    // var a = 1;
    // function fn() {
    //   console.log(a);
    //   var a = 0;
    // }
    // fn();




    // var a = 1;
    // function fn() {
    //   console.log(a);
    //   a = 0;
    // }
    // fn();




    // /[abc]/.test("d");
    // console.log(/[12345]/.test("1a"));

    // console.log(/[^12345]/.test(13))
    // console.log(/[a-zA-Z]/.test("0z"))

    // var regMobile2 = /(13[0-9]|145|147|15[0-9]|18[0-9]|170)/;
    // console.log(regMobile2.test("131a"));



    // =======================================
    // console.log(/^chuan$/.test("achuan"));
    // console.log(/^1*$/.test(1+"1"));
    // console.log(/^a{2,}$/.test("aa"));


    // *********************************************闭包
    // function test_fn() {
    //   var _num = 0;

    //   return function() {
    //     _num++;
    //     console.log(_num);
    //   }
    // }

    // var fn = test_fn();
    // fn();
    // fn();
    // fn();
    // =======================================
    // var fn = function test_fn(_num) {

    //   return function() {
    //     _num++;
    //     console.log(_num);
    //   }
    // }(0)

    // // var fn = test_fn();
    // fn();
    // fn();
    // fn();





    var arr = ["a", "b", "c"];

    // arr.forEach(function(ele, index) {
    //     setTimeout(function(argument) {
    //       console.log(ele,index);
    //     }, 1000);
    // });

    // for (var i = 0; i < arr.length; i++) {
    //   (function fn(num) {
    //     setTimeout(function(argument) {
    //       console.log(num);
    //     }, 1000);
    //   })(i)

    // }



    // var obj = {
    //   a: 0,
    //   b: 1,
    //   c: 2
    // };
    // for (var key in obj) {
    //   // var cc = function fn(num) {
    //   //   return $.get(`${num}.txt`)
    //   //     .then(function(data) {
    //   //       console.log(data);
    //   //     });
    //   // }(key);
    //   $.get(`${obj[key]}.txt`)
    //     .then(function(data) {
    //       console.log(data);
    //     });
    // }





































  },
};
new App().init();
