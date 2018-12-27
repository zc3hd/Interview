# JS vue数据双向绑定原理

#### 实现原理
* 就是做了两件事：
```
1.属性监听：把data上的所有属性进行获取值的监听，值改变时通知所有订阅者进行更新数据。
2.模板解析：解析的过程就是把和属性相关的所有的DOM订阅者进行收集，以便为属性监听时可以进行订阅者更新。
```

#### 实现过程

* 初始化函数
```
function myVue(options) {
  this._init(options);
};
myVue.prototype._init = function(options) {
  this.$options = options;
  this.$el = document.querySelector(options.el);
  this.$data = options.data;
  this.$methods = options.methods;

  // 给每个属性的收集 DOM订阅者。
  this._binding = {};

  // 设置属性值的监听
  this._obverse(this.$data);
    
  // 模板解析：就是绑定属性和订阅者。view与model进行绑定。视图view就是我们的指令，model就是真实的DOM。
  this._complie(this.$el);
}
```

* 设置函数属性监听
```
myVue.prototype._obverse = function(obj) {
  var value;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {


      this._binding[key] = {
        _directives: []
      };

      value = obj[key];
      if (typeof value === 'object') {
        this._obverse(value);
      }

      var binding = this._binding[key];

      Object.defineProperty(this.$data, key, {
        enumerable: true,
        configurable: true,

        // 值被获取的时候执行这个函数。初始化不执行
        get: function() {
          console.log(`获取${value}`);
          return value;
        },

        // 值改变的时候才会执行这个函数。初始化不执行
        // 什么叫值改变：就是你输入，或者点击函数增加都会改变。
        set: function(newVal) {

          if (value !== newVal) {
            value = newVal;

            // 值改变的时候，每个和该值有关系的DOM(订阅值)相应属性及时变化。
            binding._directives.forEach(function(item) {
                // 更新
              item.update();
            })
          }
        }

      })
    }
  }
}
```

* 模板解析的过程就是 view和model绑定，
* 绑定收集：实质就是给属性进行和该属性绑定有关的DOM订阅者的收集。就是view的指令，与该指令绑定的model（DOM）的相应绑定，全局进行收集
* 订阅者：就是和该属性绑定的DOM
* 订阅者更新：订阅者就是更新DOM实际要更新的属性。
```
myVue.prototype._complie = function(root) {
  var me = this;
  var nodes = root.children;
  // 下面有节点的话 nodes.length 就是节点的个数
  // 没有就是undefined

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (node.children.length) {
      this._complie(node);
    }

    // 【v-click】主要给DOM绑定方法onclick方法，具体就是绑定我们设置好的方法
    // 他不是数据双向绑定的出入口。不需要收集这个model，只要绑定方法就行。
    if (node.hasAttribute('v-click')) {
      node.onclick = (function() {
        var attrVal = nodes[i].getAttribute('v-click');

        // 方法是我们设置的方法，指定到我们需要指向的对象，就是 me.$data，
        // 方法内部操作的对象就是 me.$data，
        // 那么函数改变的时候，就是改变me.$data 下的number属性，这个属性通过上面可以看到被设置监听。监听变化的时候，就进行订阅者的通知。

        return me.$methods[attrVal].bind(me.$data);
      })();
    }
    
    // 【v-model】绑定input方法，数据双向绑定入口，收集这个model input的watcher
    if (node.hasAttribute('v-model') && (node.tagName == 'INPUT' || node.tagName == 'TEXTAREA')) {
      
      // 初始化的时候，
      node.addEventListener('input', (function(key) {
        
        var attrVal = node.getAttribute('v-model');

        // number 这个属性，收集和相关的 DOM 这个订阅者。
        me._binding[attrVal]._directives.push(new Watcher(
          'input',
          node, // DOM input
          me,
          attrVal,// 指令绑定的值 number
          'value' // 绑定的这个值，要替换 DOM的 value属性
        ))

        return function() {
            // 当时就把值改变了。
          me.$data[attrVal] = nodes[key].value;
        }
      })(i));


    }

    // 【v-bind】数据双向绑定的出口，收集这个h3的watcher
    if (node.hasAttribute('v-bind')) {
      var attrVal = node.getAttribute('v-bind');
      me._binding[attrVal]._directives.push(new Watcher(
        'h3',
        node,
        me,
        attrVal,
        'innerHTML'
      ))
    }

    
    // 【{{}}】数据双向绑定的出口，收集这个h3的watcher
    var reg = /^\{{2}([a-zA-Z]*)\}{2}$/;
    if (reg.test(node.innerHTML)) {
        var attrVal = node.innerHTML.match(reg)[1];

        me._binding[attrVal]._directives.push(new Watcher(
        'h3',
        node,
        me,
        attrVal,
        'innerHTML'
      ));
    }

  }
}
```

* 上面的模板解析就是收集我们的watcher(model、DOM),那么收集到这个DOM，能做什么事情？
```
function Watcher(name, el, vm, exp, attr) {
  this.name = name; 
  this.el = el; //指令对应的DOM元素
  this.vm = vm; //指令所属myVue实例
  this.exp = exp; //指令对应的值，数据中的属性值，本例如"number"
  this.attr = attr; //绑定的属性值，DOM真实要替换的属性，本例为"innerHTML"

  this.update(); //构造函数内部执行函数，就是收集的时候就执行一次。
}

Watcher.prototype.update = function() {
  // DOM的真实被替换的属性 被 替换成data的属性
  this.el[this.attr] = this.vm.$data[this.exp];
}

window.onload = function() {
  var app = new myVue({
    el: '#app',
    data: {
      number: 0
    },
    methods: {
      increment: function() {
        this.number++;
      },
    }
  });
}
```
