// 'use strict';


function myVue(options) {
  this._init(options);
};

myVue.prototype._init = function(options) {
  this.$options = options;
  this.$el = document.querySelector(options.el);
  this.$data = options.data;
  this.$methods = options.methods;

  // 给每个属性的收集 DOM相关的节点。
  this._binding = {};

  // 设置属性值的监听
  this._obverse(this.$data);


  this._complie(this.$el);
}

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
          console.log(`更新${newVal}`);
          if (value !== newVal) {
            value = newVal;

            // 值改变的时候，每个和该值有关系的DOM相应属性都要及时变化。
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

// 模板解析，实质就是给属性进行和该属性绑定有关的DOM订阅者的收集。
// 订阅者：就是和该属性绑定的DOM
// 更新：订阅者就是更新DOM实际要更新的属性。
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

    // 给DOM绑定方法
    if (node.hasAttribute('v-click')) {
      node.onclick = (function() {
        var attrVal = nodes[i].getAttribute('v-click');

        // 方法是我们设置的方法，指定到我们需要指向的对象，就是 me.$data，
        // 方法内部操作的对象就是 me.$data，
        // 那么函数改变的时候，就是改变me.$data 下的number属性，
        // 这个属性也可以看到，被监听了。
        return me.$methods[attrVal].bind(me.$data);
      })();
    }

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

    // v-bind
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

    // {{}}
    var reg = /^\{{2}([a-zA-Z]*)\}{2}$/;
    if (reg.test(node.innerHTML)) {
    	// statement
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

function Watcher(name, el, vm, exp, attr) {
  this.name = name; //指令名称，例如文本节点，该值设为"text"
  this.el = el; //指令对应的DOM元素
  this.vm = vm; //指令所属myVue实例
  this.exp = exp; //指令对应的值，本例如"number"
  this.attr = attr; //绑定的属性值，本例为"innerHTML"

  this.update();
}

Watcher.prototype.update = function() {

	//  就是 DOM的真实被替换的值 被 替换成 我们绑定的值
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
