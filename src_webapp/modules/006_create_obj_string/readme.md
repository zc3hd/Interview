# 字符操作的常用方法

### substring(start,stop)

* start,stop为下标
* 产生新的字符串，不改变原字符串；
* 截取出来的字符串，为包左不包右
```
var str='0123456789';

str.substring(0,0) //'';
str.substring(0,1) // a

str.substring()   //复制
str.substring(-1) //-1转为0，复制
str.substring(3)  //从下标为3一直向后截取出

str.substring(3,2)  // start>stop,会换位
str.substring(2,-2) // 换位，截取
```

### substr(start [, length ])

*  start 下标
*  length 截取长度
```
str.substr()  //复制
str.substr(1)  // 从1往后截取

str.substr(10)  //''

str.substr(-1)  //9 从后截取一个 

str.substr(0,5) // 从下标0开始，往后5个截取
str.substr(0,0) // 从下标0开始，往后0个截取  不截取
```
