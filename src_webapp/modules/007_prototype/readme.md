# 原型链类

### 创建对象有几种方法

```
【字面量，或Object构造函数】
var o1 = { name: "o1" };
var o2 = new Object({ name: 'o2' });

【构造函数】
function M() {
  this.name = 'o3'
}
var o3 = new M();

【对象进行原型对象的挂载】
var o4 = Object.create({ name: "o4" });
```

### 原型、构造函数、实例、原型链

![./img/001.png](./img/001.png)

### instanceof原理

* 就是前面的对象是否继承后面的对象的原型，哪怕是多层。
* 内部原理就是找对象的__proto__的地址和后面的对象的prototype或__proto__的地址是一样的。

### new实现原理

* 改变this指向。
* 原理：
```
1.一个对象被创建
2.执行后面的构造函数，把构造函数的内部的属性挂载在当前这个对象上。其实就是改变构造函数的this指向，并执行构造函数。call
3.构造函数执行后会返回一个对象或者没有。如果有，那么这个对象就代替我们一开始的对象而return输出。如果没有，就return出我们创建的那个对象。

var new2 = function(Func) {
  1.创建个对象
  var obj = Object.create(Func.prototype);

  2.改变Func内部属性指向到obj，这个时候其实obj就是Func的实例了。并执行接收
  var func_obj = Func.call(obj);

  3.判断回来的是不是对象，是就输出
  if (typeof func_obj == 'object') {
    return func_obj;
  }

  4.返回我们的实例
  return obj;
}
```

* Object.create(Func.prototype)创建的对象不一样：
```
Object.create(Func.prototype）就是把后面的这个对象，挂载为新生成对象的原型上，即prototype上。

所以创建一个实例可以这样：
function FN(argument) {
}
FN.prototype.hi = function(argument) {
  console.log(hi);
};
-----------------------------
var obj = new FN();
-----------------------------
var obj = Object.create(FN.prototype);
FN.call(obj);

obj.__proto__ == FN.prototype  // true
```
