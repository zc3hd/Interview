'use strict';

function App() {}
App.prototype = {
  init: function() {
    var me = this;

    // document.getElementById("box").style.height
    // console.log(document.getElementById("box").style.height);


    // // console.log(document.getElementById("box").currentStyle.height);





    // console.log(window.getComputedStyle(document.getElementById("box")).height)
    // console.log(document.getElementById("box").getBoundingClientRect().height)









    // console.log($('#box').width())
    // window.addEventListener("click", function() {
    //   console.log("window")
    // }, true);

    // document.addEventListener("click", function() {
    //   console.log("document")
    // }, true);

    // document.documentElement.addEventListener("click", function() {
    //   console.log("HTML")
    // }, true);

    // document.body.addEventListener("click", function() {
    //   console.log("body")
    // }, true);

    // document.getElementById("box").addEventListener("click", function() {
    //   console.log("box")
    // }, true);

    var ev = document.getElementById("box");
    var eve = new Event("cc");
    ev.addEventListener('cc', function(e) {
    	console.log(e);
      console.log('cc_ev');
    });

    //执行
    ev.dispatchEvent(eve);



















  },
};
new App().init();
