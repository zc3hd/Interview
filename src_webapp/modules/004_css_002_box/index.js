'use strict';

function App() {}
App.prototype = {
  init: function() {
    var me = this;

    document.getElementById("box").style.height
    console.log(document.getElementById("box").style.height);


    // console.log(document.getElementById("box").currentStyle.height);
    




    console.log(window.getComputedStyle(document.getElementById("box")).height)
    console.log(document.getElementById("box").getBoundingClientRect().height)









    console.log($('#box').width())





















  },
};
new App().init();
