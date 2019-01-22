# vue

### less(css的预编译)
```
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
```

### VUE特性
* 1.轻量级的框架
* 2.双向数据绑定
* 3.指令
* 4.插件化

### vuex
```
vue框架中状态管理机。

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
```

### vue生命周期的理解

```
【创建前/后】
1.在beforeCreated阶段，vue实例的挂载元素$el和数据对象data都为undefined，还未初始化。
2.在created阶段，vue实例的数据对象data有了，$el还没有进行挂载

【载入前/后】
1.在beforeMount阶段，vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。
2.在mounted阶段，vue实例挂载完成，data.message成功渲染。

【更新前/后】当data变化时，会触发beforeUpdate和updated方法。

【销毁前/后】1.在执行destroy方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在
```

### vue.cli中怎样使用自定义的组件
```
第一步：在components目录新建你的组件文件（smithButton.vue），script一定要export default {}

第二步：在需要用的页面（组件）中导入：import smithButton from ‘../components/smithButton.vue’

第三步：注入到vue的子组件的components属性上面,components:{smithButton}

第四步：在template视图view中使用，<smith-button>  </smith-button>

问题有：smithButton命名，使用的时候则smith-button。
```

### Vue的template编译

* 首先，通过compile编译器把template编译成AST语法树（abstract syntax tree 即 源代码的抽象语法结构的树状表现形式），compile是createCompiler的返回值，createCompiler是用以创建编译器的。另外compile还负责合并option。| 就是解析模板，把那些指令要在那些DOM节点上，相应的指令响应那些函数；
* 
* AST会经过generate（将AST语法树转化成render funtion字符串的过程）得到render函数，render的返回值是VNode，VNode是Vue的虚拟DOM节点，里面有（标签名、子节点、文本等等）;这里的Vnode其实就是我们订阅者；（和绑定属性相关的DOM节点）

---------

### vue-router实现原理  spa的实现原理
##### 1.hash模式

* 随着 ajax 的流行，异步数据请求交互运行在不刷新浏览器的情况下进行。而异步交互体验的更高级版本就是 SPA —— 单页应用。
* 【spa】单页应用不仅仅是在页面交互是无刷新的，连页面跳转都是无刷新的，为了实现单页应用，所以就有了前端路由。
* 类似于服务端路由，前端路由实现起来其实也很简单，就是匹配不同的 url 路径，进行解析，然后动态的渲染出区域 html 内容。
* 但是这样存在一个问题，就是 url 每次变化的时候，都会造成页面的刷新。那解决问题的思路便是在改变 url 的情况下，保证页面的不刷新。在 2014 年之前，大家是通过 hash 来实现路由，url hash 就是类似于：
```
http://www.xxx.com/#/login
```
* 这种 #。后面 hash 值的变化，并不会导致浏览器向服务器发出请求，浏览器不发出请求，也就不会刷新页面。另外每次 hash 值的变化，还会触发hashchange 这个事件，通过这个事件我们就可以知道 hash 值发生了哪些变化。然后我们便可以监听hashchange来实现更新页面部分内容的操作：
```
function matchAndUpdate () {
   // todo 匹配 hash 做 dom 更新操作
}
window.addEventListener('hashchange', matchAndUpdate)
```

##### 2.history 模式

* 14年后，因为HTML5标准发布。多了两个 API，pushState 和 replaceState，通过这两个 API 可以改变 url 地址且不会发送请求。
* 同时还有 popstate 事件。通过这些就能用另一种方式来实现前端路由了，但原理都是跟 hash 实现相同的。
* 用了 HTML5 的实现，单页路由的 url 就不会多出一个#，变得更加美观。但因为没有 # 号，所以当用户刷新页面之类的操作时，浏览器还是会给服务器发送请求。为了避免出现这种情况，所以这个实现需要服务器的支持，需要把所有路由都重定向到根页面。
```
function matchAndUpdate () {
   // todo 匹配路径 做 dom 更新操作
}
window.addEventListener('popstate', matchAndUpdate)
```

### vue-router应用
```
1.active-class是哪个组件的属性？
vue-router模块的router-link组件。
vue用来写路由一个插件。router-link、router-view

2.动态路由？怎么获取传过来的动态参数？ 
对path属性加上/:id。
使用router对象的params.id {{$route.params | json}}

3.vue-router有哪几种导航钩子？    
【1】全局导航钩子:router.beforeEach(to,from,next)，前置钩子/后置钩子afterEach
【2】组件内的钩子:beforeRouteEnter/beforeRouteUpdate/beforeRouteLeave
【3】配置路由钩子:beforeEnter/afterEach
```

------------------------

### mvvm框架
* Mvvm定义MVVM是Model-View-ViewModel的简写。即模型-视图-视图模型。
* 【模型】指的是后端传递的数据。
* 【视图】指的是所看到的页面。
* 【视图模型】mvvm模式的核心，它是连接view和model的桥梁。

* 它有两个方向：一是将【模型】转化成【视图】，即将后端传递的数据转化成所看到的页面。实现的方式是：数据绑定。
* 二是将【视图】转化成【模型】，即将所看到的页面转化成后端的数据。实现的方式是：DOM 事件监听。这两个方向都实现的，我们称之为数据的双向绑定。
* 
* 总结：在MVVM的框架下视图和模型是不能直接通信的。它们通过ViewModel来通信，ViewModel通常要实现一个observer观察者，当数据发生变化，ViewModel能够监听到数据的这种变化，然后通知到对应的视图做自动更新，而当用户操作视图，ViewModel也能监听到视图的变化，然后通知数据做改动，这实际上就实现了数据的双向绑定。

### VUE数据双向绑定原理
* 就是做了三件事：
```
1.属性监听：把data上的所有属性进行获取值的监听，值改变时通知所有订阅者进行更新数据。
2.模板解析：
 2.1解析的过程就是把和属性相关的所有的DOM订阅者收集，以便为属性监听时可以进行订阅者更新。
 2.2 所有指令相关的DOM进行我们设置的事件进行绑定；
```
* vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

### 混入mixins:

* 就是把常用的数据和方法混入组件内部。
* 混入选项为数据data,混入选项为对象时，例如 methods, components 和 directives，将被混合为同一个对象。两个对象键名冲突时，取组件对象的键值对。发生冲突时取组件内的属性
* 混入钩子函数，混入对象的钩子函数在组件的钩子函数之前调用;
* 也可以全局注册混入对象。注意使用！ 一旦使用全局混入对象，将会影响到 所有 之后创建的 Vue 实例。使用恰当时，可以为自定义对象注入处理逻辑。

### 指令directive

* 全局指令
```
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```
* 局部指令
```
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

* 四个钩子函数
```
bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
unbind：只调用一次，指令与元素解绑时调用。
```



