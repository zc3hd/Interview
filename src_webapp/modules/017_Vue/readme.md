# vue

### 1.数据双向绑定原理
* 就是做了两件事：
```
1.属性监听：把data上的所有属性进行获取值的监听，值改变时通知所有订阅者进行更新数据。
2.模板解析：解析的过程就是把和属性相关的所有的DOM订阅者进行收集，以便为属性监听时可以进行订阅者更新。
3.实现过程：
```

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


### other
```
1.active-class是哪个组件的属性？
vue-router模块的router-link组件。

2.动态路由？怎么获取传过来的动态参数？ 
对path属性加上/:id。
使用router对象的params.id {{$route.params | json}}

3.vue-router有哪几种导航钩子？    
三种，一种是全局导航钩子：router.beforeEach(to,from,next)，作用：跳转前进行判断拦截。第二种：组件内的钩子；第三种：单独路由独享组件

4.less是什么？有哪几大特性？
答：css的预编译。
第一步：三个包（style-loader!css-loader!less-loader）
第二步：配置webpack.config.js，
{
  test: /\.less$/,
  loader: 'style-loader!css-loader!less-loader'
},
第三步：Vue <style lang="less">

有哪几大特性:
1、可以用变量，例如（$变量名称=值）；
2、节点式书写
3、函数


5、v-model是什么？怎么使用？vue中标签怎么绑定事件？
答：可以实现双向绑定，
指令（v-class、v-for、v-if、v-show、v-on）。vue的model层的data属性。
绑定事件：<input @click=doLog() />


6、axios是什么？怎么使用？
答：请求后台资源的模块。
返回在.then函数中如果成功，失败则是在.catch函数中

7、vuex是什么？怎么使用？哪种功能场景使用它？
答：vue框架中状态管理机。
在main.js引入store，注入。
export default new Vuex.Store({
  // getters: getters,
  state: state,
  // actions: actions,
  mutations: mutations,
});

import store from './store.js';
new Vue({

  el: '#app',
  // 这样的模式可以先测试为单个模块
  render: h => h(App),
  // router: router,
  // =====================vuex
  store:store,
});
场景有：管理全局的数据状态和传递数据，传递方法；


8、mvvm框架是什么？它和其它框架（jquery）的区别是什么？哪些场景适合？
答：一个model+view+viewModel框架，数据模型model，viewModel连接两个
区别：vue数据驱动，通过数据来显示视图层而不是节点操作。
场景：数据操作比较多的场景，更加便捷



12、自定义指令（v-check、v-focus）的方法有哪些？它有哪些钩子函数？还有哪些钩子函数参数？
答：
全局定义指令：
在vue对象的directive方法里面有两个参数，一个是指令名称，另外一个是函数。

组件内定义指令：
directives钩子函数：bind（绑定事件触发）、inserted(节点插入的时候触发)、update（组件内相关更新）
钩子函数参数：el、binding


13、说出至少4种vue当中的指令和它的用法？
答：v-if：判断是否隐藏；v-for：数据循环出来；v-bind:class：绑定一个属性；v-model：实现双向绑定

14、vue-router是什么？它有哪些组件？
答：vue用来写路由一个插件。router-link、router-view

15、导航钩子有哪些？它们有哪些参数？
答：导航钩子有：a/全局钩子和组件内独享的钩子。
b/beforeRouteEnter、afterEnter、beforeRouterUpdate、beforeRouteLeave

参数：有to（去的那个路由）、from（离开的路由）、next（一定要用这个函数才能去到下一个路由，如果不用就拦截）


16、Vue的双向数据绑定原理是什么？
答：vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。



```

```
17、请详细说下你对vue生命周期的理解？
答：
【创建前/后】
1.在beforeCreated阶段，vue实例的挂载元素$el和数据对象data都为undefined，还未初始化。
2.在created阶段，vue实例的数据对象data有了，$el还没有进行挂载

【载入前/后】
1.在beforeMount阶段，vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。
2.在mounted阶段，vue实例挂载完成，data.message成功渲染。

【更新前/后】当data变化时，会触发beforeUpdate和updated方法。

【销毁前/后】1.在执行destroy方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在
```

```
18、请说下封装 vue 组件的过程？
答：首先，组件可以提升整个项目的开发效率。能够把页面抽象成多个相对独立的模块，解决了我们传统项目开发：效率低、难维护、复用性等问题。
然后，使用Vue.extend方法创建一个组件，然后使用Vue.component方法注册组件。

20、vue-loader是什么？使用它的用途有哪些？
答：解析.vue文件的一个加载器，跟template/js/style转换成js模块。
用途：js可以写es6、style样式可以scss或less、template可以加jade等

21、请说出vue.cli项目中src目录每个文件夹和文件的用法？
答：assets文件夹是放静态资源；components是放组件；router是定义路由相关的配置;
view视图；app.vue是一个应用主组件；main.js是入口文件

```

```
22、vue.cli中怎样使用自定义的组件？
答：
第一步：在components目录新建你的组件文件（smithButton.vue），script一定要export default {}
第二步：在需要用的页面（组件）中导入：import smithButton from ‘../components/smithButton.vue’
第三步：注入到vue的子组件的components属性上面,components:{smithButton}
第四步：在template视图view中使用，<smith-button>  </smith-button>
问题有：smithButton命名，使用的时候则smith-button。
```

```
23、聊聊你对Vue.js的template编译的理解？
答：简而言之，就是先转化成AST树，再得到的render函数返回VNode（Vue的虚拟DOM节点）
详情步骤：

首先，通过compile编译器把template编译成AST语法树（abstract syntax tree 即 源代码的抽象语法结构的树状表现形式），compile是createCompiler的返回值，createCompiler是用以创建编译器的。另外compile还负责合并option。

然后，AST会经过generate（将AST语法树转化成render funtion字符串的过程）得到render函数，render的返回值是VNode，VNode是Vue的虚拟DOM节点，里面有（标签名、子节点、文本等等）

挑战一下：
1、vue响应式原理？
2、vue-router实现原理？
4、vue如何实现父子组件通信，以及非父子组件通信？
5、vuejs与angularjs以及react的区别？
6、vuex是用来做什么的？
7、vue源码结构
```

* 为什么要选vue？与其它框架对比的优势和劣势？
* 1.vue组件化开发，更单一功能模块进行组件化，更好的维护和叠加优化
* 2.更专注业务，因为直接是数据和view的写代码；
