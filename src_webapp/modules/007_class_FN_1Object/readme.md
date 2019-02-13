### Object.defineProperty

* Object.defineProperty(obj, prop, descriptor)用来给对象定义属性
```
【数据属性】
数据属性有4个描述内部属性的特性
Configurable:是否可以删除、能否修改属性的特性。
Enumerable：是否可枚举；即是否通过for-in循环或Object.keys()返回属性
Writable：能否修改属性的值
Value:该属性对应的值


【访问器属性】
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
    enumerable: true,
    writable: true,
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


var desc_1 = Object.getOwnPropertyDescriptor(obj, 'name');
console.log(desc_1); // 再次获取，打印没有修改


【Object. getOwnPropertyDescriptors()】
所指定对象的所有自身属性的描述符，如果没有任何自身属性，则返回空对象。
var person = {
    name: '张三',
    age: 18
}
var desc = Object.getOwnPropertyDescriptors(person);
```

* 各种场景下,数据属性的的扩展示例讲解
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
【访问器属性】
设置属性，注意需要外面来个变量来设置 obj属性被设置后的值，用于obj.a获取的时候返回；

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

### var a=1 为什么不可以被删除？ a=1可以被删除？
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
使用字面量定义的对象,该对象内部的属性的数据描述符configurable属性都为true
```

```
【Writable】当writable为false(并且configrubale为true),[[value]]可以通过defineeProperty修改, 但不能直接赋值修改
```

### 简单的数据双向绑定
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

### 实例.propertyIsEnumerable("key")
* 用来检测实例化对象上的某一属性是否可遍历，也就是能不能用for..in、forEach/map/filter循环来取到.
```
var obj = new Object();
Object.defineProperty(obj, 'name', {
  configurable: false,
  enumerable: false,
  writable: true,
  value: '张三'
});
obj.propertyIsEnumerable("name"))
```

### 实例.hasOwnProperty("key")

* 用于检查某一属性是不是挂载于实例化的对象上，来自父亲继承的属性为false；
```
function FN (argument) {
  this.a = 1;
}
FN.prototype={
  b:1
};
var fn = new FN();

console.log(fn.hasOwnProperty("a")); //ture
```
