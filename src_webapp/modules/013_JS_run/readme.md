# JS 运行机制

### 如何理解单线程
* JS是单线程，同一时间只能做一件事
* 异步。node叫非阻塞IO。

### 什么是任务队列
* 事件队列：任务队列。分为同步任务、异步任务。加载完JS，整个线程优先处理同步任务，再处理异步任务。无论你的同步有多少，异步多及时。都是这样。也有同步队列，和异步队列。
* node叫事件环机制，就是我理解的事件调度中心，优先处理先来用户的请求。
* 同步任务，或者异步返回一个无限循环，后面的任务都会被阻塞。
* JS有个timer模块，遇到time函数，会记住函数的执行时机开始倒计时，到了该执行的时间后，才把函数插入异步队列。

### 什么是Event loop 事件循环
* 【同步队列】，执行完成时，i=4,然后异步队列没有函数，timer等待时间到达，就是把函数推入异步队列，再等待一个【事件循环】的东西，再开始执行异步队列，所有是4个4.
```
for (var i = 0; i < 4; i++) {
  setTimeout(function () {
    console.log(i);  // 4*4
  },0);
}
```
* 【事件循环】：先把【同步队列】的函数放【运行栈】上执行，执行完成，有个【东西】就去看【异步队列】上有没有函数，timer模块把到时间的函数，放入【异步队列】，这个【东西】就会把【异步队列】的函数拿到运行栈上执行，执行完成后，再次重复前面的过程。这个【东西】和返回查看同步队列和异步的过程，叫事件循环。

### 异步任务
* SetTimeout/setinterval
* DOM的事件：浏览器有单独模块去接受这个函数，GUI监听用户点击某个按钮触发函数的时候，这个模块就会把这个函数推到【异步队列】中，【事件循环】会监测、拿走、执行这个函数。
* ES6中的promise。

----------------------

# 宏任务、微任务

* 先看代码
```
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');
```

* 正确答案是：script start, script end, promise1, promise2, setTimeout
* 每个线程都会有它自己的event loop(事件循环)，所以都能独立运行。然而所有同源窗口会共享一个event loop以同步通信。event loop会一直运行，来执行进入队列的宏任务。一个event loop有多种的宏任务源（译者注：event等等），这些宏任务源保证了在本任务源内的顺序。但是浏览器每次都会选择一个源中的一个宏任务去执行。这保证了浏览器给与一些宏任务（如用户输入）以更高的优先级。

### 宏任务（task）

* 浏览器为了能够使得JS内部task与DOM任务能够有序的执行，会在一个task执行结束后，在下一个 task 执行开始前，对页面进行重新渲染 
* task->渲染->task->...
* 鼠标点击会触发一个事件回调，需要执行一个宏任务，然后解析HTMl。
* setTimeout的作用是等待给定的时间后为它的回调产生一个新的宏任务。这就是为什么打印‘setTimeout’在‘script end’之后。
* 因为打印script end是第一个宏任务里面的事情，而‘setTimeout’是另一个独立的任务里面打印的。

### 微任务（Microtasks ）

* 微任务通常来说就是需要在当前 task 执行结束后立即执行的任务，比如对一系列动作做出反馈，或者是需要异步的执行任务而又不需要分配一个新的 task，这样便可以减小一点性能的开销。
* 只要执行栈中没有其他的js代码正在执行且每个宏任务执行完，微任务队列会立即执行。
* 如果在微任务执行期间微任务队列加入了新的微任务，会将新的微任务加入队列尾部，之后也会被执行。
* 微任务包括了mutation observe的回调还有接下来的例子promise的回调。
* 一旦一个pormise有了结果，或者早已有了结果（有了结果是指这个promise到了fulfilled或rejected状态），他就会为它的回调产生一个微任务，这就保证了回调异步的执行即使这个promise早已有了结果。
* 所以对一个已经有了结果的promise调用.then(yey, nay)会立即产生一个微任务。这就是为什么‘promise1’,'promise2'会打印在‘script end’之后，
* 因为所有微任务执行的时候，当前执行栈的代码必须已经执行完毕。‘promise1’,'promise2'会打印在‘setTimeout’之前是因为所有微任务总会在下一个宏任务之前全部执行完毕。


```
// Let's get hold of those elements
var outer = document.querySelector('.outer');
var inner = document.querySelector('.inner');

// Let's listen for attribute changes on the
// outer element
//监听element属性变化
new MutationObserver(function() {
  console.log('mutate');
}).observe(outer, {
  attributes: true
});

// Here's a click listener…
function onClick() {
  console.log('click');

  setTimeout(function() {
    console.log('timeout');
  }, 0);

  Promise.resolve().then(function() {
    console.log('promise');
  });

  outer.setAttribute('data-random', Math.random());
}

// …which we'll attach to both elements
inner.addEventListener('click', onClick);
outer.addEventListener('click', onClick);
```

* 谷歌
```
click
promise
mutate
click
promise
mutate
timeout
timeout
```

