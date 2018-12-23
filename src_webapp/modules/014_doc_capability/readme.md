# 页面性能类

### 提升页面性能的方法有哪些？

* 1.资源要压缩合并，减少HTTP请求。

-------------

* 2.非核心代码使用异步加载，异步加载的方式，区别。
```
【方式】
1.动态异步脚本。页面动态添加script标签。
2.defer
3.async

【区别】
1.defer:都是异步加载，在HTML解析完成后执行，有多个JS的话，按顺序进行执行。
2.async:都是异步加载，加载完成后就开始执行，和执行顺序和加载顺序都没有关系。
```

* 【defer】:head标签内有defer异步加载的JS，可以看到body内的HTML解析完成后（包括DOM树怎么渲染，同步的脚本下载完成后的执行后），才执行异步的脚本。但是异步的脚本其实早就开始下载了。
* 使用：就是所有的脚本都可以写defer异步加载的方式。
```
<head>
  <script src="./test_derfer_1.js" type="text/javascript" defer></script>
  <script src="./test_derfer_2.js" type="text/javascript" defer></script>
</head>

<body>
  <div class="app">
    <div class="box" id="box"></div>
  </div>
  <script src="./index.js" type="text/javascript"></script>
</body>
------------------------
1
df_1
df_2
```

* 【async】：head头部放入async异步加载的JS，async_1.js较大，可以看到输出的结果就是这样异步加载的脚本，只要它下载下了，就要开始执行，不管你DOM树有没有渲染好或你同步的JS有没有执行的。
* 使用：单独的JS的内容，不依赖其他文件的JS。可以让它下载后执行。

-------------

* 3.浏览器缓存，缓存的分类，和原理
* 分类：HEAD内设置
```
强缓存：在一定时间内，不问，直接请求，直接拿过来就用。
Expires : 服务端端的绝对过期时间，有可能客户端时间和浏览器不一样。
Cache-Control:max-age = 3600 【相对时间，3600秒内不会向服务器拿这个文件】，以这个为主。

协商缓存：强缓超出过期时间，浏览器有这个副本，不确定能不能用，需要请求下，304
Last-Modified :上次服务器带的这个时间。下次浏览器请求时，会用这个if Modified-Since字段，把Last-Modified字段的val时间传给服务器。问能不能我们这个副本能不能用。缺点；就是传回去的时间肯定是不一样的。所有有下面：
if-None-Match:把上次Etag的hash值作为该字段的值，传回去，就知道哪次副本的版本还能不能用。
```

-------------

* 4.CDN加速
* 5.预解析DNS

