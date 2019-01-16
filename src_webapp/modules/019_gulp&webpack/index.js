#!/usr/bin/env node

// 'use strict';


// var util = require('util');
// var EventEmitter = require('events').EventEmitter;

// function MyEmitter() {
//   EventEmitter.call(this);
// } // 构造函数

// util.inherits(MyEmitter, EventEmitter); // 继承




// var em = new MyEmitter();
// em.on('hello', function(data) {
//   console.log('收到事件hello的数据:', data);
// });
// setTimeout(function(argument) {
//   // 接收事件，并打印到控制台
//   em.emit('hello', 'EventEmitter传递消息真方便!');
// },200);







// var domain = require('domain');
// var myDomain = domain.create();
// myDomain.on('error', function(err) {
//   console.log('domain接收到的错误事件:', err);
// }); // 接收事件并打印
// myDomain.run(function() {
//   // fn();
// });






// var emitter3 = new MyEmitter();
// emitter3.on('newListener', function(name, listener) {
//     console.log("新事件的名字:", name);
//     console.log("新事件的代码:", listener);
//     setTimeout(function(){ console.log("我是自定义延时处理机制"); }, 1000);
// });
// emitter3.on('hello', function(){
//     console.log('hello　node');
// });



// const fs = require('fs')

// //流的方式读取文件
// var readStream = fs.createReadStream('readme.md');

// var str = ''; /*保存数据*/
// var count = 0;  /*次数*/
// readStream.on('data', function(chunk) {   
//   str += chunk;   
//   count++;

// })

// //读取完成
// readStream.on('end', function(chunk) {   
//   console.log(count);   
//   console.log(str);
// })

// //读取失败
// readStream.on('error', function(err) {   
//   console.log(err);
// });



// var fs = require("fs");
// var data = '我是从数据库获取的数据，我要保存起来11\n';

// // 创建一个可以写入的流，写入到文件 output.txt 中
// var writerStream = fs.createWriteStream('output.txt');

// for(var i=0;i<100;i++){
//     writerStream.write(data,'utf8');
// }

// //标记写入完成
// writerStream.end();

// // 接受完成
// writerStream.on('finish',function(){
//     console.log('写入完成');
// });

// //失败
// writerStream.on('error',function(){
//     console.log('写入失败');
// });


// var fs = require("fs");
// // 创建一个可读流
// var readerStream = fs.createReadStream('readme.md');
// // 创建一个可写流
// var writerStream = fs.createWriteStream('output.txt');

// // 管道读写操作
// // 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
// readerStream.pipe(writerStream);
// console.log("程序执行完毕");



// var cp = require('child_process');
// var child = cp.spawn('ls'); // 执行命令
// child.stdout.on('data', (data) => {
//   console.log(data.toString());
// });
// child.stdout.pipe(process.stdout);
