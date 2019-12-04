# 事件类

## DOM事件的级别

* DOM标准的定义标准
```
DOM0 dom.onclick = function(){}
DOM1 这个标准没有设计和事件相关的东西

DOM2 dom.addEventListener('click',function(){},true)  
【true,是在捕获阶段执行，false是在冒泡阶段执行】

DOM3 dom.addEventListener('keyup',function(){},true)  丰富了事件类型
```

## DOM事件模型

* 捕获：从上到下
* 冒泡：从下到上

## DOM事件流

* 捕获-->目标阶段-->冒泡

## DOM事件流的具体流程

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

## event对象的常见应用

```js
//阻止默认行为，例如a的转跳；右键点击
ev.preventDefault() 

//阻止冒泡的行为
ev.stopPropagation() 

//一个DOM不小被多次绑定事件，只执行写这行代码，不执行其他函数
ev.stopImmediatePropagation()

//事件委托中，事件绑定的DOM
ev.currentTarget

// 事件的交互对象，委托的对象。点击的对象。
ev.target


//JS设置盒模型的宽高
原生JS只能拿到内联样式的宽和高，为100px。head的link的方式拿不到。
dom.style.width

//IE有个方法可以拿到渲染后的样式,其他浏览器不支持
dom.currentStyle.width

//全部支持：拿到的是100px
window.getComputedStyle(dom).width

// 主要是算绝对位置，能拿到四个值、这次拿到的是数值100
dom.getBoundingClientRect().width

// JQ能拿到dom的宽和高，为数值100。
$('#box').width()


// 直接设置样式
e.target.style

// 属性
e.target.getAttribute('key');
e.target.setAttribute('key', 2);

// 类名的获取和设置
e.target.className
e.target.className = 'cc asd';

// 子节点的获取的设置
e.target.innerHTML
e.target.innerHTML = `<i>cc</i>`;


// DOM定位
e.target.parentNode;
// 下一个兄弟DOM
e.target.nextElementSibling || e.target.nextSibling;
// 上一个兄弟DOM
e.target.previousElementSibling || e.target.previousSibling;
// 第一个子DOM
e.target.firstElementChild || e.target.firstChild;
// 最后一个子DOM
e.target.lastElementChild || e.target.lastChild;
// 所有的子DOM数组
e.target.children;


// DOM操作
var d = document.createElement("div");
// 复制
var newBox = box.cloneNode(true);
// 从后添加DOM
b.appendChild(d);
// 从前面添加一个 
b.insertBefore(d2, null);
// 删除
var box = document.getElementById("box");
var box2 = document.getElementById("box2");
// 删除父节点下指定的DOM
box.removeChild(box2);
// 删除自己
box.parentNode.removeChild(box);
```

## 自定义事件

* 真心搞不懂这个有什么用。
```
var DOM = document.getElementById("box");
var eve = new Event("cc");
DOM.addEventListener('cc',function(){
    ...
});

//执行
DOM.dispatchEvent(eve);

CustomEvent事件对象，后面可以接一个参数。
```



