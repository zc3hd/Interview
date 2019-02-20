# 面向对象

### 类的声明
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

### 类的实例
```
new FN_1();
```

### 类的继承

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
【2.实例作为原型对象的继承】
缺点：就是被继承的类的属性有对象的时候，比如下面的arr,被继承的时候，是把属性的对象地址继承过去。实例化的时候，实例们都是引用的同一个地址。所以修改一个实例的该属性值，其他实例也会变化。
function P(argument) {
  this.name = "p";
  this.arr = [1,2,3];
}
P.prototype.p_fn = function() {
  console.log("p_fn");
};

function S () {
}
S.prototype= new P();

var sl_1 = new S();
var sl_2 = new S();
sl_1.arr.push("a");
console.log(sl_2.arr);  //[1,2,3,"a"]
--------------------------------------
【3.call+prototype】解决上面问题1+2
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

