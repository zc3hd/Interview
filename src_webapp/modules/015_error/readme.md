# 错误监控类

### 前端错误的分类
```
及时运行错误：代码错误
资源加载错误
```

### 错误的捕获方式
* 及时运行错误，代码错误
```
1. try...catch:
2. window.onerror冒泡的错误捕获
```

* 资源加载错误：不会冒泡。所以window.onerror响应不到。
```
1.object.onerror:img标签，script标签也可以加这个事件。
$("img").error(function(e){
    console.log(e);
});

2.performance.getEntries() 返回所有加载资源的信息的数组。
performance.getEntries().forEach( function(ele, index) {
  console.log(ele);
});

3.Error事件捕获：捕获阶段可以拿到错误。必须是先注册，在进行事件监听。
window.addEventListener("error",function(e){},true);
```

* 跨域的JS可以被捕获到么？错误提示是什么？怎么处理？

### 错误上报的基本原理


