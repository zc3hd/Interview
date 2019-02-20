# HTML meta

### DOCTYPE
* DTD：文档类型定义的语法规则的定义，用来定义XML和HTML的文件类型。
* DOCTYPE：告诉浏览器我是什么文档类型的DTD规范，常见；
```
HTML5 : <!DOCTYPE html>
HTML 4.01 Strict/Transitional 严格模式、传统模式
严格不包括展示性和废弃的一些元素（font）
```

* meta标签共有两个属性，分别是http-equiv属性和name属性。

### 1.name

* keywords(关键字):用于告诉搜索引擎，你网页的关键字。
```
<meta name="keywords" content="Lxxyx,博客，文科生，前端">
```

* description(网站内容的描述):用于告诉搜索引擎，你网站的主要内容。
```
<meta name="description" content="文科生，热爱前端与编程。目前大二，这是我的前端博客">
```

* viewport(移动端的窗口):视口，用于改变body默认值最小宽度（980px）,满足屏幕宽度。
```
<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1.0,minimum-scale=1.0,user-scalable=0">
```

* robots(定义搜索引擎爬虫的索引方式):robots用来告诉爬虫哪些页面需要索引，哪些页面不需要索引。content的参数有all,none,index,noindex,follow,nofollow。默认是all。
```
<meta name="robots" content="all">

1.none : 搜索引擎将忽略此网页，等价于noindex，nofollow。
2.noindex : 搜索引擎不索引此网页。
3.nofollow: 搜索引擎不继续通过此网页的链接索引搜索其它的网页。
4.all : 搜索引擎将索引此网页与继续通过此网页的链接索引，等价于index，follow。
5.index : 搜索引擎索引此网页。
6.follow : 搜索引擎继续通过此网页的链接索引搜索其它的网页。
```

* revisit-after:如果页面不是经常更新，为了减轻搜索引擎爬虫对服务器带来的压力，可以设置一个爬虫的重访时间。如果重访时间过短，爬虫将按它们定义的默认时间来访问。
```
<meta name="revisit-after" content="7 days" >
```

* renderer(双核浏览器渲染方式):renderer是为双核浏览器准备的，用于指定双核浏览器默认以何种方式渲染页面。比如说360浏览器。举例：
```
<meta name="renderer" content="webkit"> //默认webkit内核
<meta name="renderer" content="ie-comp"> //默认IE兼容模式
<meta name="renderer" content="ie-stand"> //默认IE标准模式
```

### 2.http-equiv

* content-Type:用于设定网页字符集，便于浏览器解析与渲染页面举例
```
<meta http-equiv="content-Type" content="text/html;charset=utf-8">  //旧的HTML，不推荐
<meta charset="utf-8"> //HTML5设定网页字符集的方式，推荐使用UTF-8
```

* X-UA-Compatible:用于告知浏览器以何种版本来渲染页面。（一般都设置为最新模式，在各大框架中这个设置也很常见。）
```
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/> //指定IE和Chrome使用最新版本渲染当前页面
```

* cache-control:
* 1.指导浏览器如何缓存某个响应以及缓存多长时间。
```
<meta http-equiv="cache-control" content="no-cache">

1.no-cache: 先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存。
2.no-store: 不允许缓存，每次都要去服务器上，下载完整的响应。（安全措施）
3.public : 缓存所有响应，但并非必须。因为max-age也可以做到相同效果
4.private : 只为单个用户缓存，因此不允许任何中继进行缓存。（比如说CDN就不允许缓存private的响应）
5.maxage : 表示当前请求开始，该响应在多久内能被缓存和重用，而不去服务器重新请求。例如：max-age=60表示响应可以再缓存和重用 60 秒
```

* 2.用于禁止当前页面在移动端浏览时，被百度自动转码。虽然百度的本意是好的，但是转码效果很多时候却不尽人意。所以可以在head中加入例子中的那句话，就可以避免百度自动转码了。
```
<meta http-equiv="Cache-Control" content="no-siteapp" />
```

* expires网页到期时间:用于设定网页的到期时间，过期后网页必须到服务器上重新传输
```
<meta http-equiv="expires" content="Sunday 26 October 2016 01:00 GMT" />
```

* refresh(自动刷新并指向某页面):网页将在设定的时间内，自动刷新并调向设定的网址。
```
<meta http-equiv="refresh" content="2；URL=http://www.lxxyx.win/"> //意思是2秒后跳转向我的博客
```

* Set-Cookie:如果网页过期。那么这个网页存在本地的cookies也会被自动删除。
```
<meta http-equiv="Set-Cookie" content="User=Lxxyx; path=/; expires=Sunday, 10-Jan-16 10:00:00 GMT">
```

--------------------

* sessionStorage 、localStorage 和 cookie 之间的区别
```
1)、存储内容是否发送到服务器端：当设置了Cookie后，数据会发送到服务器端，造成一定的宽带浪费；web storage,会将数据保存到本地，不会造成宽带浪费；

(2)、数据存储大小不同：Cookie数据不能超过4K,适用于会话标识；
web storage数据存储可以达到5M;

(3)、数据存储的有效期限不同：cookie只在设置了Cookid过期时间之前一直有效，即使关闭窗口或者浏览器；
essionStorage,仅在关闭浏览器之前有效；
localStorage,数据存储永久有效；

(4)、作用域不同：cookie和localStorage是在同源同窗口中都是共享的；sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；
```

### 3.DNS预解析

* DNS 作为互联网的基础协议，其解析的速度似乎很容易被网站优化人员忽视。现在大多数新浏览器已经针对DNS解析进行了优化，典型的一次DNS解析需要耗费 20-120 毫秒，减少DNS解析时间和次数是个很好的优化方式。DNS Prefetching 是让具有此属性的域名不需要用户点击链接就在后台解析，而域名解析和内容载入是串行的网络操作，所以这个方式能 减少用户的等待时间，提升用户体验 。
* 默认情况下浏览器会对页面中和当前域名（正在浏览网页的域名）不在同一个域的域名进行预获取，并且缓存结果，这就是隐式的 DNS Prefetch。如果想对页面中没有出现的域进行预获取，那么就要使用显示的 DNS Prefetch 了。

```
1. 用meta信息来告知浏览器, 当前页面要做DNS预解析:
<meta http-equiv="x-dns-prefetch-control" content="on" />
2. 在页面header中使用link标签来强制对DNS预解析: 
<link rel="dns-prefetch" href="http://bdimg.share.baidu.com" />
```
