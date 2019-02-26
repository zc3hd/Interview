# ES6

### 变量
* let:块级变量，形成作用域，闭包。不允许在域内重新赋值。使用在for循环内的异步，闭包实现。
* const：定义常量,初始化必须赋值，以后不允许改变。也是不允许重复声明。

### 解构赋值

* 解构的变量需要和后面数据的key进行对应
* 需要对解构前，被解构的对象有key:val；
* 目的就是快速声明一个解构形式，把变量进行赋值；
```
let node = {
    type: "Identifier",
    name: "foo"
};
const { type, name } = node;
type  = 1;
```

* 提前赋值的话，需要进行小括号包裹进行赋值；
```
let node = {
    type: "Identifier",
    name: "foo"
},
type = "Literal",
name = 5;
单独赋值：就是前面没有对内部变量类型的声明；
({ type, name } = node);

console.log(type); // "Identifier"
console.log(name); // "foo"
```

* 解构赋值既是对变量赋值，又是返回一个对象，可以作为参数传入。
```
let node = {
    type: "Identifier",
    name: "foo"
};
function outputInfo(value) {
    console.log(value === node); // true
}
var { type, name } = {};
outputInfo({ type, name } = node);
```

* 也可以设置默认值
```
var {time=12,id=0}={};
console.log(time); // 12
```

* 多层嵌套就是看你解构到哪层
```
let obj = {
  a: {
    aa: 'aa',
    bb: 'bb'
  }
};
let { a } = obj;
console.log(a);  // {aa: 'aa',bb: 'bb'}
```

* 数组解构，就是通过位置标识来确认要解构的值是在哪里
```
let colors = [ "red", "green", "blue" ];
let [ , , thirdColor ] = colors;
console.log(thirdColor); // "blue"
```

* 如果有对应的变量声明，那就按照变量进行找
```
let a = 1,
    b = 2;
[ a, b ] = [ b, a ];
console.log(a); // 2
console.log(b); // 1
```

* 同样，数组嵌套的话，也是看解构到哪里了。
```
let colors = [ "red", [ "green", "lightgreen" ], "blue" ];
let [ firstColor, [ secondColor ] ] = colors;

console.log(firstColor); // "red"
console.log(secondColor); // "green"
```

### Map

* map对象上有多个方法，极其方便的操作数据
```
var map = new Map();
map.set('one', 1);
----------------------------------------------
var map = new Map([['one',1], ['two', 2], ['three', 3]]);
for(var name of map){
    console.log(name);
}
one,1
two,2
three,3
----------------------------------------------
console.log(map.size);  3  
map.clear();
console.log(map.size);  0
----------------------------------------------
console.log(map.has("one")); //true
map.delete("one");
console.log(map.has("one")); //false
----------------------------------------------
for(var [a,b] of map.entries()){
    console.log(a,b);
}

----------------------------------------------
map.forEach(function(value, key, mapObj) {
    console.log(value + '---' + key + '---' + mapObj);
    //value - Map对象里每一个键值对的值
    //key - Map对象里每一个键值对的键
    //mapObj - Map对象本身
    console.log(this); //this === window
});
map.forEach(function(value, key, mapObj) {
    console.log(value + '---' + key + '---' + mapObj);
    console.log(this);    //this === map
}, map)
----------------------------------------------
map.get(1); //'one'

for(var name of map.keys()){
    console.log(name);
}

for(var val of map.values()){
    console.log(val);
}
```

### 箭头函数

* 简化函数
```
var f = () => 5;
==
var f = function() { return 5};
-------------------------------------------------
【有参数】
var sum = ( a, b) => a + b;
==
var sum = function( a, b) {
    return a +b;
}
-------------------------------------------------
多行代码，需要用{}包起来
var sum = (a, b) => { 
    console.log(a,b);
    return a+b;
}
-------------------------------------------------
返回对象
var get_obj = id => ({id: id, anme: "Temp"});
```

* 用处：
```
[1,2,3].map(function(x){
    return x*x;
});
[1,2,3].map(x => x*x);
--------------------------------------------
var arr = [];
[1, 2, 3].map(x => arr.push(x * x));

--------------------------------------------
配合解构赋值，把变量进行数组话
const numbers = (...nums) => nums; 
numbers(1,2,3,4,5,6,7,8,9);  //[1,2,3,4,5,6,7,8,9]
```

### this指向问题

* 涉及到箭头函数在哪里的问题，箭头函数内部的this,永远为定义箭头时，所在函数的this.任何方法改变不了。
* 这个this指person
```
let person = {
  name: 'jike',
  init: function() {
    console.log(this);  // 调用时的对象(函数)
    document.body.onclick = () => {
      alert(this.name);               
    }
  }
}
person.init();  //this-->person对象
person.init.call(this);  //this-->windows
--------------------------------------------------------
var person = {
    name:'jike',
    init:()=>{
        console.log(this); // 创建时所在函数的this，就是window
        document.body.onclick = ()=>{
            alert(this.name);                  
        }
    }
}
person.init();  //this-->window
person.init.call({});  //this-->window
--------------------------------------------------------
function foo() {
  console.log(this);  //外面函数的this,直接调用就是widow
  setTimeout(() => {
    console.log('id:', this.id); //创建时的this,就是外面函数的this
  }, 100);
}

var id = 21;
foo.call({ id: 42 });  // 被指向其他对象，所以打印是{ id: 42 }；打印为42
-------------------------------------------------------
function foo() {
  setTimeout(function() {
    console.log('id:', this.id);  // 就是调用setTimeout函数的this,就是window
  }, 100);
}

var id = 21;
foo.call({ id: 42 });  
//虽然foo的this发生改变，但是setTimeout的this还是window；var id = 21;全局变量，打印为21
--------------------------------------------------------
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);  //this就是Timer对象
  // 普通函数
  setInterval(function () {  //this就是window
    this.s2++;
  }, 1000);
}
var timer = new Timer();
setTimeout(() => console.log('s1: ', timer.s1), 3100);  //3
setTimeout(() => console.log('s2: ', timer.s2), 3100);  //0

3s后
**
setInterval(() => this.s1++, 1000); 已经执行三次，this为timer对象
**
setInterval(function () {  this.s2++;}, 1000); 尽管执行三次，但是window上没有这个值。也就是说，setInterval改变的是window上s2的值，不是timer的s2，所以打印是最后打印的是timer对象上的s2值。
```

* 到这，知道function的this就是谁调用它，就是谁。()=>{}就是一直往上找所在函数的this;
* 除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。
* 由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。
* 箭头函数没有原型属性，所以就不能做构造函数。

### 类

```
class Person {
  constructor(name = 'aa', age = 0) {
    this.name = name;
    this.age = age;
  }
  showName() {
    console.log(this.name);
    return this.name;
  }
  showAge() {
    return this.age;
  }
}
var p1=new Person('aaa',10);
var p2=new Person('bbb',20);
console.log(p2.showName==p1.showName);
console.log(p1.constructor==Person);

---------------------------------------------
class Worker extends Person {
  constructor(name, age, job = '扫地的') {
    super(name, age);
    this.job = job;
  }
  showJob() {
    return this.job;
  }
}
var w1 = new Worker('mmm', 56);
w1.showName()
```

