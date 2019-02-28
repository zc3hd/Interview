# 通信类

### 什么是同源策略及限制

```
源：HTTP协议、IP、端口。
限制:不是一个源的文档，没有权力操作另外一个源的文档。
方面：
1.无法操作cookie.localStorage和indexDB
2.DOM无法获取
3.AJAX不能发送
```

### 前后端是如何通信的

* ajax:同源下的通信
* websocket:不受同源策略的限制
* CORS：支持同源，也支持跨域。

### 如何创建ajax

```
【拿到xhr】
var httpobj = null;
try {
  httpobj = new ActiveXObject("Msxml2.XMLHTTP");
}
// 
catch (e) {
  try {
    httpobj = new ActiveXObject("Microsoft.XMLHTTP");
  }
  // 
  catch (e1) {
    httpobj = new XMLHttpRequest();
  }
}
var xhr = httpobj;

// 开启
xhr.open("post", "xxx", true);
// 设置请求头
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");

// 拼接数据
var content = '';
for (var key in daya) {
  content += key + '=' + daya[key] + '&';
}
content = content.slice(0, content.length - 1);

// 发送
xhr.send(content);

// 响应：
// xhr.onreadystatechange
xhr.onload = function() { 
  // xhr.status == 200||xhr.status == 304||xhr.status == 206
  if (xhr.readyState == 4 && xhr.status == 200) {
    JSON.parse(xhr.responseText)
  }
};
```

* axios请求的设置
```
【1】
前端：
axios默认的请求内容类型：Content-Type: application/json;charset=UTF-8

后台：
app.use(bodyParser.json());

【2】
前端：
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded
let param = new URLSearchParams();
param.append('name', me.obj.name);
param.append('ps', me.obj.ps);
me.$ajax({data: param})

后台：
app.use(bodyParser.urlencoded({ extended: false }));
```

### 跨域

* JSONP：非正式传输协议。
* 发现凡是拥有”src”这个属性的标签都拥有跨域的能力，比如`<script>、<img>、<iframe>`;
* 就是本地写好回调函数，动态生成一个script标签，写入src的路径把函数名传过去，说到底回来的脚本，里面执行的代码就是执行这个函数。相当于是异步加载JS，异步执行我们已经写好的回调函数。
* ajax和jsonp其实本质上是不同的东西。ajax的核心是通过XmlHttpRequest获取非本页内容，而jsonp的核心则是动态添加script标签来调用服务器提供的js脚本。
```
// 得到航班信息查询结果后的回调函数
var flightHandler = function(data){
    alert('你查询的航班结果是：票价 ' + data.price + ' 元，' + '余票 ' + data.tickets + ' 张。');
};

// 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码）
var url = "http://flightQuery.com/jsonp/flightResult.aspx?code=CA1998&callback=flightHandler";

// 创建script标签，设置其属性
var script = document.createElement('script');
script.setAttribute('src', url);

// 把script标签加入head，此时调用开始
document.getElementsByTagName('head')[0].appendChild(script);
```

* hash:就是www.baidu.com/#号后面的值，改变时不会刷新页面的。
* (www.baidu.com/?search=10,改变search后面的值页面就会刷新。)
* 实现：A页面里,通过iframe引入B页面。在A页面的JS拿到B的iframe的src,修改值。在B页面的JS内写onhashchange的响应函数，拿到A传的数据
```
【A页面】
var iframe_b = document.getElementById('iframe_b');
iframe_b.src = iframe_b.src + '#user=admin';

【B页面】监听
window.onhashchange = function () {
    var data = window.location.hash;
};
```

* postMessage:H5中东西
```
【A页面】
window.postMessage(data,"http://B.html");

【B页面】
window.addEventListener("message",function(ev){
  ev.origin // http://A.html
  ev.source // A页面的window
  ev.data. 
},false);
```

* WebSocket: 我们使用Socket.io，它很好地封装了webSocket接口，提供了更简单、灵活的接口，也对不支持webSocket的浏览器提供了向下兼容。

* CORS:通信标准。可理解为支持跨域通信的AJAX。浏览器在识别发送一个跨域请求时，会在头部加一个orgin，支持跨域通信。
```
res.writeHead(200, {
    "Content-Type": "text/html; charset=UTF-8",
    "Access-Control-Allow-Origin":'http://localhost',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type'
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});
```

* 前端webpack/browserify设置服务代理

### 敲入URL发生的事情
* 1.用户输入URL地址
* 2.浏览器解析URL解析出主机名
* 3.浏览器将主机名转换成服务器ip地址（浏览器先查找本地DNS缓存列表 没有的话 再向浏览器默认的DNS服务器发送查询请求 同时缓存）
* 4.浏览器将端口号从URL中解析出来
* 5.浏览器建立一条与目标Web服务器的TCP连接（三次握手）
* 6.浏览器向服务器发送一条HTTP请求报文
* 7.服务器向浏览器返回一条HTTP响应报文
* 8.关闭连接 浏览器解析文档
* 9.如果文档中有资源 重复6 7 8 动作 直至资源全部加载完毕

### TCP连接三次握手

* A:我说的话，你听见了么？
* B：听见了，我说的你听见了么？（回复A的问题，提出自己的问题）；
* A：听见了，我们开始说话吧。
