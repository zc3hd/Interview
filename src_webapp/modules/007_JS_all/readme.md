# 高级话题

### 1.类的声明、类定义
```
function FN(argument) {
}
FN.prototype.hi = function(argument) {
  console.log(hi);
};

【es6】
class FN_1{
  constructor(){
    this.name = "name";
  }
  hi(){  //函数之间没有逗号
    console.log(1);
  }
}
```

### 2.类的实例
```
new FN_1();
```

### 3.类的继承

```
【1.call继承】
缺点：构造函数上的属性就挂载过来了。但是原型上的函数是没有挂载过来。
function P(argument) {
  this.name = "p";
}
P.prototype.p_fn = function() {
  console.log("p_fn");
};

function s_1 () {
  // 构造函数上的属性就挂载过来了。但是原型上的函数是没有挂载过来。
  P.call(this);
}
s_1.prototype.s_fn = function(argument){
  console.log("s_fn");
};
--------------------------------------
【2.prototype继承】
缺点：就是被继承的类的属性有对象的时候，比如下面的arr,被继承的时候，是把属性的对象地址继承过去。实例化的时候，实例们都是引用的同一个地址。所以修改一个实例的该属性值，其他实例也会变化。
function P(argument) {
  this.name = "p";
  this.arr = [1,2,3];
}
P.prototype.p_fn = function() {
  console.log("p_fn");
};

function s_1 () {
}
s_1.prototype= new P();

var sl_1 = new s_1();
var sl_2 = new s_1();
sl_1.arr.push("a");
console.log(sl_2.arr);  //[1,2,3,"a"]
--------------------------------------
【4.call+prototype】解决上面问题1+2
function P(argument) {
  this.name = "p";
}
P.prototype.p_fn = function() {
  console.log("p_fn");
};

function s_1 () {
  P.call(this);
}
s_1.prototype= P.prototype;
s_1.prototype.constructor = s_1;

这样写的缺点：因为父子的原型对象引用是同一个地址，修改s_1.prototype.constructor上的属性，那么父级上的这个属性也就被修改了。就没法区别被继承类的实例对象的构造函数是谁了。


【4.call+Object.create(prototype)】解决上面问题3
解决：挂这个中间层，在中间层新的对象上重新开constructor的属性。这样就完美解决。
s_1.prototype= Object.creat(P.prototype);
s_1.prototype.constructor = s_1;
```

* ES6继承
```
class Worker extends Person {
  constructor(name, age, job = '扫地的') {
    super(name, age);
    this.job = job;
  }
  showJob() {
    return this.job;
  }
}
```

### 4.作用域

* js里边叫函数作用域，就是一个变量在全函数里有效．比如有个变量p1在函数最后一行定义，第一行也有效，但是值是undefined.

### 5.this

* 当前执行对象。执行上下文；
* 构造函数：是指实例对象，不是构造函数；

### 6.apply, call和bind有什么区别?

* 都是把前面的函数应用到后面的对象上。
* apply,call是直接执行函数调用，apply和call的区别是apply接受数组作为参数，而call是接受逗号分隔的无限多个参数列表；
* bind是绑定，执行需要再次调用

### 7.caller, callee和arguments分别是什么?

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

### 8.闭包

* 函数作用域。
* 应用：接受外部参数，返回子函数，把接受的数据保存下来。参数内部的一些运算。
* 缺点：数据长存，内存溢出；
```
function P () {
  var p_1 ="1";
  return function  () {
    console.log(p_1);
    p_1 = null;

    console.log(arguments.callee); // 雇员，就是自己嘛；
  }
}
P()();
```

* 解决：在子函数内部，把不需要的变量引用减数-1；设为null;需要挂载挂载对象的用Weakset和WeakMap;

### 9.defineProperty, hasOwnProperty, isEnumerable都是做什么用的？

* Object.defineProperty(obj, prop, descriptor)用来给对象定义属性,有value,writable,configurable,enumerable,set/get等
* isEnumerable用来检测某一属性是否可遍历，也就是能不能用for..in循环来取到.
* hasOwnProperty 用于检查某一属性是不是存在于对象本身，继承来的父亲的属性不算

### 10.设计模式

* 1.单例：
```
var obj = {name: 'michaelqin', age: 30};
```

* 2.工厂模式：就是同样形式参数返回不同的实例
```
function Person() { this.name = 'Person1'; }
function Animal() { this.name = 'Animal1'; }

function Factory() {}
Factory.prototype.getInstance = function(className) {
    return eval('new ' + className + '()');
}

var factory = new Factory();
var obj1 = factory.getInstance('Person');
var obj2 = factory.getInstance('Animal');
console.log(obj1.name); // Person1
console.log(obj2.name); // Animal1
```

* 3.代理：就是新建个类调用老类的接口,包一下
* 4.观察者模式：就是事件模式，比如按钮的onclick这样的应用.
```
// 发布者
function Publisher() {
        this.listeners = [];
    }
Publisher.prototype = {
    'addListener': function(listener) {
        this.listeners.push(listener);
    },

    'removeListener': function(listener) {
        delete this.listeners[listener];
    },

    'notify': function(obj) {
        for(var i = 0; i < this.listeners.length; i++) {
            var listener = this.listeners[i];
            if (typeof listener !== 'undefined') {
                listener.process(obj);
            }
        }
    }
}; 

// 订阅者
function Subscriber() {

}
Subscriber.prototype = {
    'process': function(obj) {
        console.log(obj);
    }
};　


var publisher = new Publisher();
publisher.addListener(new Subscriber());
publisher.addListener(new Subscriber());
publisher.notify({name: 'michaelqin', ageo: 30}); // 发布一个对象到所有订阅者
publisher.notify('2 subscribers will both perform process'); // 发布一个字符串到所有订阅者
```

