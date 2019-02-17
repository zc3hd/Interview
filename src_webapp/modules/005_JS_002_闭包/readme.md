# 作用域

* js里边叫函数作用域，就是一个变量在全函数里有效．比如有个变量p1在函数最后一行定义，第一行也有效，但是值是undefined.

# 闭包

* 定义：外部可以调用函数内部的函数，闭包包的是变量
* 原因：为什么要包起来？实现变量名的私有化，在外界需要的时候又可以访问改变。
* 缺点：闭包的数据常驻内存，不清除的话，会使内存溢出
```
function test_fn() {
  var _num = 0;
  return function() {
    _num++;
    console.log(_num);
  }
}
var fn = test_fn();
fn();1
fn();2
fn();3

fn这个变量相当于接受了一个带有初始化变量的函数，
每次执行的时候就把内部的变量进行进行一次计算。
下次执行的时候，内部的变量再次被执行。
一直会持有内部的变量和状态。
这就是闭包。
```

* 应用:保存变量的数据
* 如何应用：创建函数，传入变量，达到保存变量的目的
```
1.DOM事件绑定
for (var i = 0; i < spans.length; i++) {
  spans[i].onmouseover = function(num) {
    return function() {
      console.log(num);
    };
  }(i);
}
可以看到onmouseover后面这个函数自执行，返回个带有初始化状态变量的函数，
也是就是每个函数内部的i，被保存下来。

2.for()循环里的异步函数
for (var i = 0; i < arr.length; i++) {
  setTimeout(function(argument) {
      console.log(i);
    }, 1000);
}
for循环里嵌套异步，我们在回调函数内需要拿到的数据进行运算，就需要做一个闭包，才能进行参数初始化的保存。所以要写成：
for (var i = 0; i < arr.length; i++) {
  (function fn(num) {
    setTimeout(function(argument) {
      console.log(num);
    }, 1000);
  })(i);
}
写个闭包函数，把数据的状态初始化保证在函数内部。或者用arr.forEach;
因为forEach后面的函数就形成一个闭包，就不需要再写闭包了。
arr.forEach(function(ele, index) {
    setTimeout(function(argument) {
      console.log(ele,index);
    }, 1000);
});
```

### fn内置参数fn.caller, arguments.callee和arguments分别是什么?

```
function parent(param1, param2, param3) {
  child(param1, param2, param3);
}

function child() {
  console.log(arguments); // { '0': 'mqin1', '1': 'mqin2', '2': 'mqin3' }
  console.log(arguments.callee); // [Function: child] 雇员
  console.log(child.caller); // [Function: parent]  雇主
}

parent('mqin1', 'mqin2', 'mqin3');
```
