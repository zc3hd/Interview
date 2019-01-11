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

* Object.defineProperty(obj, prop, descriptor)用来给对象定义属性
```
【数据(数据描述符)属性】
数据属性有4个描述内部属性的特性
Configurable:是否可以删除、能否修改属性的特性。
Enumerable：是否可枚举；即是否通过for-in循环或Object.keys()返回属性
Writable：能否修改属性的值
Value:该属性对应的值


【访问器(存取描述符)属性】
Configurable：同上
Enumerable：同上
Set:一个给属性提供 setter 的方法(给对象属性设置值时调用的函数)，如果没有 setter 则为 undefined。
Get:一个给属性提供 getter 的方法(访问对象属性时调用的函数,返回值就是当前属性的值)，
```

* 创建/修改/获取属性的方法
```
【Object.defineProperty()】
方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 函数执行完后返回这个对象。
var obj = new Object();
Object.defineProperty(obj, 'name', {
    configurable: false,
    writable: true,
    enumerable: true,
    value: '张三'
})


【Object.defineProperties()】
方法直接在一个对象上定义一个或多个新的属性或修改现有属性，并返回该对象。
var obj = new Object();
Object.defineProperties(obj, {
    name: {
        value: '张三',
        configurable: false,
        writable: true,
        enumerable: true
    },
    age: {
        value: 18,
        configurable: true
    }
})



【Object.getOwnPropertyDescriptor()】
该方法返回指定对象上一个自有属性对应的属性描述符。
var obj = new Object();
Object.defineProperty(obj, 'name', {
  configurable: false, // 不可修改数据属性
  enumerable: true,
  writable: true,
  value: '张三'
})
console.log(obj.name) //张三

var desc = Object.getOwnPropertyDescriptor(obj, 'name');
// 修改
desc.enumerable=false;
console.log(desc);

// 再次获取，打印没有修改
var desc_1 = Object.getOwnPropertyDescriptor(obj, 'name');
console.log(desc_1);


【Object. getOwnPropertyDescriptors()】
所指定对象的所有自身属性的描述符，如果没有任何自身属性，则返回空对象。
var person = {
    name: '张三',
    age: 18
}
var desc = Object.getOwnPropertyDescriptors(person);
```

* 各种场景下描述符属性的的扩展示例讲解
```
【configrubale】如果设置configrubale属性为false，则不可使用delete操作符(在严格模式下抛出错误), 不能再次修改所有内部属性值

var person = {};
Object.defineProperty(person, 'name', {
    configurable: false,
    value: 'John'
}) ;

// 严格模式下抛出错误
delete person.name   
// 'John'  没有删除
console.log(person.name) 

Object.defineProperty(person, 'name', {
    configurable: true  //报错
});

```

```
【访问器属性get和set】
设置属性，注意需要外面个变量来设置 obj属性被设置后的值，用于obj.a获取的时候返回；
var obj = {};
var aValue; 
Object.defineProperty(obj, 'a', {
  configurable: true,
  enumerable: true,
  get: function() {
    console.log("a被获取了")
    return aValue;
  },
  set: function(newValue) {
    console.log("a被设置了")
    aValue = newValue;
  }
});

obj.a //获取
obj.a=1 //设置
console.log(obj.a);  //获取
```

```
【全局定义变量】
var a = 1; // a属于window, 相当于window.a
var d = Object.getOwnPropertyDescriptor(window, 'a');
// {
//     configurable: false,
//     value: 1,
//     writable: true,
//     enumerable: true
// }

a = 1; //a相当于window的一个属性, window.a
var d = Object.getOwnPropertyDescriptor(window, 'a');
// {
//     configurable: true,   // 此时configurable属性值为true
//     value: 1,
//     writable: true,
//     enumerable: true
// }
注意：只有使用var, let等操作符才是定义变量，而不使用var，直接a=1;,这样a的含义为window的一个属性，并不是我们所说的变量的概念。使用 var定义的任何变量，其configurable属性值都为false,定义对象也是一样

var b = {
    name: 'bbb'
}
var d = Object.getOwnPropertyDescriptor(window, 'b');
console.log(d)
// {
//     configurable: false
//     value: 1,
//     writable: true,
//     enumerable: true
// }

var b = {
    name: 'bbb'
}
var d = Object.getOwnPropertyDescriptor(b, 'name');
console.log(d)
// {
//     configurable: true
//     writable: true,
//     enumerable: true
//     value: 'bbb'
// }
使用字面量定义的对象,该对象内部的属性的数据描述符属性都为true
```

```
【Writable】当writable为false(并且configrubale为true),[[value]]可以通过defineeProperty修改, 但不能直接赋值修改
```

* 简单的数据绑定
```
 <div class="app">
    <p>
      input1=>
      <input type="text" id="input1">
    </p>
    <p>
      input2=>
      <input type="text" id="input2">
    </p>
    <div>
      我每次比input2的值加1=>
      <span id="span"></span>
    </div>
  </div>

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
      【核心】在这，就是被设置的时候，通知所有相关的DOM进行数据更改；
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
```

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

### 11.常用数组方法

* push/pop, shift/unshift, split/join, slice/splice/concat, sort/reverse, map/reduce, forEach, filter

```
slice(2):从下标为2后全部截取出来新的数组
slice(2,4):包左不包右面，截取出来新数组
slice(-3)：从后截取三个出来

splice(2,1):去除一个元素，原数组被生成新数组，返回删除的元素
splice(2,1,"a"):改变旧数组，生成新数组。将删除的元素换为后面的元素；返回删除的元素；
```

```
arr.sort(function(a, b) {
  return 小于0; // 倒着排列，倒序
  return 0;  // 原来的顺序
  return 大于0;  // 正序
});

a:后面的值
b:前面的值

升序
arr.sort(function(a, b) {
  return a-b;
});

倒序
arr.sort(function(a, b) {
  return b-a;
});

随机
arr.sort(function(a, b) {
  return Math.random() > .5 ? -1 : 1;
});


arr.reverse():把原来的数组倒着排列一次，不会生成新的数组；
```

```
返回一个新的数组
arr.map(function(ele){
  return ele*ele;
});

reduce:每个元素执行后面的函数fn，执行函数fn的第一个值是reduce的第二个参数0；
var items = [10, 120, 1000];
// our fn function
var fn = function add(sumSoFar, item) { return sumSoFar + item; };
// do the job
var total = items.reduce(fn, 0);
console.log(total); // 1130
```

```
filter()实例：筛选排除掉所有的小值​
function isBigEnough(element) {
return element >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
console.log(filtered);//[ 12, 130, 44 ]


var arr = [1, 2, 3, 4, 5, 0];
var arr_1 = arr.filter(function  (ele) {
  return ele;
});
console.log(arr_1); // [1, 2, 3, 4, 5]  

0没有返回，return 0就相当于是 return;
```
