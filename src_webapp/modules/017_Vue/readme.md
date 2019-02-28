# vue

### less(css的预编译)
```
style-loader!css-loader!less-loader

<style lang="less">
1、可以用变量，例如（$变量名称=值）；
2、节点式书写
3、函数
```

### vue特性
```
1.轻量级的框架
2.双向数据绑定
3.指令
4.插件化
```

### vuex
* vue框架中状态管理机
* 场景有：管理全局的数据状态和传递数据，传递方法；
```
【1】
Vue.use(Vuex);
export default new Vuex.Store({
  // getters: getters,
  state: state,
  // actions: actions,
  mutations: mutations,
});

【2】在main.js引入store，注入
import store from './store.js';
new Vue({
  el: '#app',
  // 这样的模式可以先测试为单个模块
  render: h => h(App),
  // router: router,
  // =====================vuex
  store:store,
});

【3】使用
computed:{
  $x_add_btn_name: function() {
      return this.$store.state.add_btn_name;
  },
}
me.$store.commit('user_suc', { _id: data._id });
```
* 它集中于MVC模式中的Model层，规定所有的数据操作必须通过 action – mutation – statechange 的流程来进行，再结合Vue的数据视图双向绑定特性来实现页面的展示更新;

### vue生命周期

```
【创建前/后】
1.beforeCreated：vue实例的挂载元素$el和数据对象data都为undefined，还未初始化。
2.在created阶段，vue实例的数据对象data有了，$el还没有进行挂载

【载入前/后】
1.beforeMount：vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。
2.mounted：vue实例挂载完成，data.message成功渲染。

【更新前/后】当data变化时，会触发beforeUpdate和updated方法。

【销毁前/后】1.在执行destroy方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在
```

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

### vue.cli自定义的组件
```
1.在components目录新建你的组件文件
（smithButton.vue），export default {}

2.在需要用的页面（组件）中导入：
import smithButton from ‘../components/smithButton.vue’

3.注入到vue的子组件的components属性上面,
components:{smithButton}

4.在template视图view中使用，驼峰命名，使用为-
<smith-button>  </smith-button> 
```

### 混入mixins

* 就是把常用的数据和方法提前为公共，混入组件内部进行使用；我自己感觉，其实直接写个全局对象就行了。
* 混入选项为数据data,混入选项为对象时，例如 methods, components 和 directives，将被混合为同一个对象。两个对象键名冲突时，取组件对象的键值对。发生冲突时取组件内的属性
* 混入钩子函数，混入对象的钩子函数在组件的钩子函数之前调用;
* 也可以全局注册混入对象。注意使用！ 一旦使用全局混入对象，将会影响到 所有 之后创建的 Vue 实例。使用恰当时，可以为自定义对象注入处理逻辑。

### $nextTick

* 用法：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
* 异步说明：Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。
* 异步执行的运行机制：
```
（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
（4）主线程不断重复上面的第三步。
```
* 事件循环：简单来说，Vue 在修改数据后，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。
* created、mounted：需要注意的是，在 created 和 mounted 阶段，如果需要操作渲染后的试图，也要使用 nextTick 方法。注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
```
showsou(){
  this.showit = true
  this.$nextTick(function () {
    // DOM 更新了
    document.getElementById("keywords").focus()
  })
}
```

* Vnode:https://segmentfault.com/a/1190000013314893
* 可能你还没有注意到，Vue异步执行DOM更新。只要观察到数据变化，Vue将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个watcher被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作上非常重要。然后，在下一个的事件循环“tick”中，Vue刷新队列并执行实际 (已去重的) 工作。
* 简而言之，就是在一个事件循环中发生的所有数据改变都会在下一个事件循环的Tick中来触发视图更新，这也是一个“批处理”的过程。（注意下一个事件循环的Tick有可能是在当前的Tick微任务执行阶段执行，也可能是在下一个Tick执行，主要取决于nextTick函数到底是使用Promise/MutationObserver还是setTimeout）
* nextTick函数其实做了两件事情，一是生成一个timerFunc，把回调作为microTask或macroTask参与到事件循环中来。二是把回调函数放入一个callbacks队列，等待适当的时机执行。（这个时机和timerFunc不同的实现有关）
```
if (typeof Promise !== 'undefined' && isNative(Promise)) {
    /*使用Promise*/
    var p = Promise.resolve()
    var logError = err => { console.error(err) }
    timerFunc = () => {
        p.then(nextTickHandler).catch(logError)
        // in problematic UIWebViews, Promise.then doesn't completely break, but
        // it can get stuck in a weird state where callbacks are pushed into the
        // microTask queue but the queue isn't being flushed, until the browser
        // needs to do some other work, e.g. handle a timer. Therefore we can
        // "force" the microTask queue to be flushed by adding an empty timer.
        if (isIOS) setTimeout(noop)
    }
} else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
    )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    /*新建一个textNode的DOM对象，用MutationObserver绑定该DOM并指定回调函数，在DOM变化的时候则会触发回调,该回调会进入主线程（比任务队列优先执行），即textNode.data = String(counter)时便会触发回调*/
    var counter = 1
    var observer = new MutationObserver(nextTickHandler)
    var textNode = document.createTextNode(String(counter))
    observer.observe(textNode, {
        characterData: true
    })
    timerFunc = () => {
        counter = (counter + 1) % 2
        textNode.data = String(counter)
    }
} else {
    // fallback to setTimeout
    /* istanbul ignore next */
    /*使用setTimeout将回调推入任务队列尾部*/
    timerFunc = () => {
        setTimeout(nextTickHandler, 0)
    }
}
```
* 值得注意的是，它会按照Promise、MutationObserver、setTimeout优先级去调用传入的回调函数。前两者会生成一个microTask任务，而后者会生成一个macroTask。（微任务和宏任务）
* 之所以会设置这样的优先级，主要是考虑到浏览器之间的兼容性（IE没有内置Promise）。另外，设置Promise最优先是因为Promise.resolve().then回调函数属于一个微任务，浏览器在一个Tick中执行完macroTask后会清空当前Tick所有的microTask再进行UI渲染，把DOM更新的操作放在Tick执行microTask的阶段来完成，相比使用setTimeout生成的一个macroTask会少一次UI的渲染。


### vue spa的实现原理

* 随着 ajax 的流行，异步数据请求交互运行在不刷新浏览器的情况下进行。而异步交互体验的更高级版本就是 SPA —— 单页应用。
* 【spa】单页应用不仅仅是在页面交互是无刷新的，连页面跳转都是无刷新的，为了实现单页应用，所以就有了前端路由。
* 类似于服务端路由，前端路由实现起来其实也很简单，就是匹配不同的 url 路径，进行解析，然后动态的渲染出区域 html 内容。
* 但是这样存在一个问题，就是 url 每次变化的时候，都会造成页面的刷新。那解决问题的思路便是在改变 url 的情况下，保证页面的不刷新。

### vue-router实现原理 

##### 1.hash模式
* 在 2014 年之前，大家是通过 hash 来实现路由，url hash 就是类似于：`http://www.xxx.com/#/login`;
* 这种 #后面 hash 值的变化，并不会导致浏览器向服务器发出请求，浏览器不发出请求，也就不会刷新页面。
* 另外每次 hash 值的变化，还会触发hashchange 这个事件，然后我们便可以监听hashchange来实现更新页面部分内容的操作：
```
function matchAndUpdate () {
   // todo 匹配 hash 做 dom 更新操作
}
window.addEventListener('hashchange', matchAndUpdate)
```

##### 2.history模式
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
1.vue-router模块的router-link、router-view组件。active-class

2.动态路由？怎么获取传过来的动态参数？ 
对path属性加上/:id。
router对象的params.id {{$route.params | json}}

3.vue-router有哪几种导航钩子？    
【1】全局导航钩子:router.beforeEach(to,from,next)，前置钩子/后置钩子afterEach
【2】组件内的钩子:beforeRouteEnter/beforeRouteUpdate/beforeRouteLeave
【3】配置路由钩子:beforeEnter/afterEach
```

### Vue的template编译

* 首先，通过compile编译器把template编译成AST语法树
* AST会经过generate（将AST语法树转化成render funtion字符串的过程）得到render函数，render的返回值是VNode，VNode是Vue的虚拟DOM节点，里面有（标签名、子节点、文本等等）;这里的Vnode其实就是我们订阅者；（和绑定属性相关的DOM节点）

### VUE数据双向绑定原理
* 就是做了三件事：
```
1.属性监听：把data上的所有属性进行获取值的监听，值改变时通知所有订阅者进行更新数据。
2.模板解析：
 2.1解析的过程就是把和属性相关的所有的DOM订阅者收集，以便为属性监听时可以进行订阅者更新。
 2.2 所有指令相关的DOM进行我们设置的事件进行绑定；
```
* vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

### mvvm框架
* Mvvm定义MVVM是Model-View-ViewModel的简写。即模型-视图-视图模型。
* 【模型】指的是后端传递的数据。
* 【视图】指的是所看到的页面。
* 【视图模型】mvvm模式的核心，它是连接view和model的桥梁。

* 它有两个方向：
* 一是将【模型】转化成【视图】，即将后端传递的数据转化成所看到的页面。实现的方式是：数据绑定。(模板解析过程中的指令解析和赋值、绑定方法。)
* 二是将【视图】转化成【模型】，即将所看到的页面转化成后端的数据。实现的方式是：DOM 事件监听。（发布订阅者模式，收集Vnode,进行DOM节点属性的更新）
* 这两个方向都实现的，我们称之为数据的双向绑定。

* 在MVVM的框架下视图和模型是不能直接通信的。它们通过ViewModel来通信，ViewModel通常要实现一个observer观察者，
* 当数据发生变化，ViewModel能够监听到数据的这种变化，然后通知到对应的视图做自动更新，
* 而当用户操作视图，ViewModel也能监听到视图的变化，然后通知数据做改动，还是数据改动嘛；






