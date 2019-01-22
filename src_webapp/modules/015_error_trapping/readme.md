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

3.Error事件捕获：捕获阶段可以拿到错误。必须是最先放在head里注册，进行事件监听。
window.addEventListener("error",function(e){},true);
```

### 跨域的JS如何捕获
* 跨域的JS可以被捕获到么？错误提示是什么？怎么处理？
* 但是对于跨域调用的js脚本，onerror事件只会给出很少的报错信息：error: Script error.这个简单的信息很明显不足以看出脚本的具体错误，所以我们可以使用crossorigin属性，使得加载的跨域脚本可以得出跟同域脚本同样的报错信息：

```
1.在客户端设置：在script标签上增加crossorigin属性。
2.在服务端设置：Access-Control-Allow-Origin:*
nodejs express配置：
app.all('/test', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

nginx配置：
location ^~ /test {
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Credentials' 'true';
    add_header 'Access-Control-Allow-Methods' 'OPTION, POST, GET';
    add_header 'Access-Control-Allow-Headers' 'X-Requested-With, Content-Type';
}
```

### 错误上报的基本原理

* 1.采用ajax通信方式上报
* 2.利用Image对象上报:其实把所有的连接，新建new Image(),src访问，错误捕获。优点：不需要借助任何第三方插件，
```
var img = new Image();
img.src = 'http://www.baidu.com/test.js';
img.onerror = function(e) {
  console.log(e);
};
```

