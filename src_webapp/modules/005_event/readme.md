# 事件类

### DOM事件的级别

* DOM标准的定义标准
```
DOM0 dom.onclick = function(){}
DOM1 这个标准没有设计和事件相关的东西

DOM2 dom.addEventListener('click',function(){},true)  
【true,是在捕获阶段执行，false是在冒泡阶段执行】

DOM3 dom.addEventListener('keyup',function(){},true)  丰富了事件类型
```

### DOM事件模型

* 捕获：从上到下
* 冒泡：从下到上

### DOM事件流

* 捕获-->目标阶段-->冒泡

### DOM事件流的具体流程

```
捕获
window
-->document
-->html
-->body
-->dom

window.addEventListener("click", function() {
  console.log("window")
}, true);

document.addEventListener("click", function() {
  console.log("document")
}, true);

document.documentElement.addEventListener("click", function() {
  console.log("HTML")
}, true);

document.body.addEventListener("click", function() {
  console.log("body")
}, true);

document.getElementById("box").addEventListener("click", function() {
  console.log("box")
}, true);
```

### event对象的常见应用

```
阻止默认行为，例如a的转跳；右键点击
ev.preventDefault() 

阻止冒泡的行为
ev.stopPropagation() 

一个DOM不小被多次绑定事件，只执行写这行代码，不执行其他函数
ev.stopImmediatePropagation()

事件委托中，事件绑定的DOM
ev.currentTarget

事件的交互对象，委托的对象。点击的对象。
ev.target
```

### 自定义事件

* 真心搞不懂这个有什么用。
```
var ev = document.getElementById("box");
var eve = new Event("cc");
ev.addEventListener('cc',function(){
    ...
});

//执行
ev.dispatchEvent(eve);

CustomEvent事件对象，后面可以接一个参数。
```
