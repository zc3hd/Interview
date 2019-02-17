# node

### 1.特性

##### 1.1 同步异步
* 单线程、非阻塞IO、事假环机制
* V8是node虚拟机，js运行环境；
* node是单线程的，异步是通过一次次的循环事件队列来实现的．同步则是说阻塞式的IO,这在高并发环境会是一个很大的性能问题，所以同步一般只在基础框架的启动时使用，用来加载配置文件，初始化程序什么的．
* node是没有web容器。根据访问的路径做出相应地址的文件读取，适合做路由设计

##### 1.2 异步流程控制
* 多层嵌套回调
* 为每一个回调写单独的函数，函数里边再回调 
* 用第三方框架比方async, q, promise等

##### 1.3 express

* 路由设计
```
// 配置前缀
me.api_pro = '/api/plan';
me.router = require('express').Router(); 路由组件
me.router.post('/list.do', function(req, res) {   
});
// 生成
me.app.use(me.api_pro, me.router);
```

* 路由参数获取
```
/users/:name   使用req.params.name获取
```

* express response有哪些常用方法
```
res.download() 弹出文件下载
res.end() 结束response

res.json() 返回json
res.jsonp() 返回jsonp

res.redirect() 重定向请求
res.render() 渲染模板

res.send() 返回多种形式数据
res.sendFile 返回文件
res.sendStatus() 返回状态
```

##### 1.3 mongoDB && mongoose
* mongoDB 非结构性数据库。mongoose对象化操作数据库
* mongoose：文档模式-->model模型--->实例；model模型方法 和 实例 方法
```
【文档模型】
var animalSchema = new mongoose.Schema({
    "name" : String,
    "type" : String
});

定义【实例（文档、对象）】方法：
animalSchema.methods.zhaotonglei = function(callback){
    this.model('Animal').find({"type":this.type},callback);
}

【model模型】
var Animal = mongoose.model('Animal', animalSchema);

【model模型】的方法
Animal
 .findOne({"name":"小白"},function(err,dog){
    可以使用新定义的 【实例】方法
    dog.zhaotonglei(function(err,result){
        console.log(result);
    });
 });
```

### 2.全局对象

* process, console, Buffer和exports

### 3.核心模块

* EventEmitter, Stream, FS, Net和全局对象

### 3.EventEmitter

* 如何实现EventEmitter？
* 主要分三步：定义一个子类，调用构造函数，继承EventEmitter
```
var util = require('util');
var EventEmitter = require('events').EventEmitter;

// 构造函数
function MyEmitter() {
  EventEmitter.call(this);
} 
// 继承
util.inherits(MyEmitter, EventEmitter); 

var em = new MyEmitter();
em.on('hello', function(data) {
  console.log('收到事件hello的数据:', data);
});
setTimeout(function(argument) {
  // 接收事件，并打印到控制台
  em.emit('hello', 'EventEmitter传递消息真方便!');
},200);
```

* 应用：
```
1) 模块间传递消息 
2) 回调函数内外传递消息 
3) 处理流数据，因为流是在EventEmitter基础上实现的. 
```

* EventEmitter中的newListenser事件有什么用处?
* newListener可以用来做事件机制的反射，特殊应用，事件管理等．当任何on事件添加到EventEmitter时，就会触发newListener事件，基于这种模式，我们可以做很多自定义处理；
```
var emitter3 = new MyEmitter();

新注册的事件，都会被这个监听到
emitter3.on('newListener', function(name, listener) {
    console.log("新事件的名字:", name);
    console.log("新事件的代码:", listener);
    setTimeout(function(){ console.log("我是自定义延时处理机制"); }, 1000);
});

emitter3.on('hello', function(){
    console.log('hello　node');
});
```

### 4.node的错误捕获

*  domain来统一处理错误事件
```
var domain = require('domain');
var myDomain = domain.create();

// 接收事件并打印
myDomain.on('error', function(err) {
  console.log('domain接收到的错误事件:', err);
}); 

// 开始运行下面的函数
myDomain.run(function() {
  var emitter1 = new MyEmitter();
  emitter1.emit('error', '错误事件来自emitter1');
  var emitter2 = new MyEmitter();
  emitter2.emit('error', '错误事件来自emitter2');
});
```

### 5.Stream

###### 1.什么是Stream?
* stream是基于事件EventEmitter的数据管理模式．由各种不同的抽象接口组成，主要包括可写，可读，可读写，可转换等几种类型．

###### 2.Stream有什么好处?
* 非阻塞式数据处理提升效率，片断处理，节省内存，管道处理方便可扩展等.

###### 3.demo:读取流
```
const fs = require('fs')

//流的方式读取文件
var readStream = fs.createReadStream('readme.md');

var str = ''; /*保存数据*/
var count = 0;  /*次数*/
readStream.on('data', function(chunk) {   
  str += chunk;   
  count++;

})

//读取完成
readStream.on('end', function(chunk) {   
  console.log(count);   
  console.log(str);
})

//读取失败
readStream.on('error', function(err) {   
  console.log(err);
});
```

##### 4.demo:流写入
```
var fs = require("fs");
var data = '我是从数据库获取的数据，我要保存起来11\n';

// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('output.txt');

for(var i=0;i<100;i++){
    writerStream.write(data,'utf8');
}

//标记写入完成
writerStream.end();

// 接受完成
writerStream.on('finish',function(){
    console.log('写入完成');
});

//失败
writerStream.on('error',function(){
    console.log('写入失败');
});
```

##### 5.demo:可读流---->可写流
```
var fs = require("fs");
// 创建一个可读流
var readerStream = fs.createReadStream('readme.md');
// 创建一个可写流
var writerStream = fs.createWriteStream('output.txt');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);
console.log("程序执行完毕");
```

### 6.文件系统

##### 6.1.读取文件的方式
```
1) POSIX式低层读写 
2) 流式读写 
3) 同步文件读写 
4) 异步文件读写
```

##### 6.2.如何读取JSON文件
* require('data.json')：直接得到js对象。如果多个模块都加载了同一个json文件，那么其中一个改变了js对象，其它跟着改变，这是由node模块的缓存机制造成的，只有一个js模块对象
* 第二种是读入文件入内容，然后用JSON.parse(content)转换成js对象。而且各模块互不影响，因为他们都是独立的，是多个js对象.

### 7.网络系统

```
var http = require('http'); // 加载http模块

http.createServer(function(req, res) {
    // 200代表状态成功, 文档类型是给浏览器识别用的
    res.writeHead(200, {'Content-Type': 'text/html'}); 
    
    // 返回给客户端的html数据
    res.write('hw'); 
    res.end(); 
}).listen(3000); 
```

### 8.child-process

##### 1.什么？
* ode是异步非阻塞的，这对高并发非常有效．可是我们还有其它一些常用需求，比如和操作系统shell命令交互，调用可执行文件，创建子进程进行阻塞式访问或高CPU计算等，child-process就是为满足这些需求而生的．child-process顾名思义，就是把node阻塞的工作交给子进程去做．

##### 2. exec,execFile,spawn和fork都是做什么用的?
*  exec可以用操作系统原生的方式执行各种命令
*  execFile是执行一个文件
*  spawn是流式和操作系统进行交互
*  fork是两个node程序(javascript)之间时行交互.

##### 3. 实现简单的命令行交互程序
```
var cp = require('child_process');

// 执行命令
var child = cp.spawn('ls'); 

// 把执行的命令的后的返回拿到这里
child.stdout.on('data', (data) => {
  console.log(data.toString());
});

// 这句的意思是将子进程的输出(我们要执行这个命令)作为当前程序的输入流，然后重定向到当前程序的标准输出，即控制台
child.stdout.pipe(process.stdout);
```

##### 4.两个node程序之间怎样交互?

```
1) fork-parent.js
var cp = require('child_process');
var child = cp.fork('./fork-child.js');
// 接收儿子来的信息注册的事件
child.on('message', function(msg){
    console.log('老爸从儿子接受到数据:', msg);
});

// 给儿子发送信息
child.send('我是你爸爸，送关怀来了!');

2) fork-child.js

// 外面注册的事件
process.on('message', function(msg){
    console.log("儿子从老爸接收到的数据:", msg);

    // 向外发送
    process.send("我不要关怀，我要银民币！");
});
```
