# 常用数组方法

### push/pop, shift/unshift

```
【改变原数组,不创建新数组，有返回值】
push():返回操作后数组的长度
pop():返回被删除元素

shift():从第一个删除，返回第一个元素；
unshift():从前添加一个元素，返回改变数组后的长度；
```

### slice/splice

```
【不改变原来数组，返回一个新的数组】：随意的抽取数组的项目
slice(2):从下标为2后全部截取出来新的数组
slice(2,4):包左不包右面，截取出来新数组
slice(-3)：从后截取三个出来
slice():快速复制的为一个新的数组

【改变原来的数组，返回一个新的数组】：随意改变原来的数组元素，删除内部元素。
splice(2,0,"a")：原数组增加一个元素，返回[];
splice(2,1):原数组删除某个元素，，返回删除的元素的数组
splice(2,1,"a"):原数组改变，将删除的元素换为后面的元素；返回删除的元素的数组；
arr.splice(0,arr.length):源数组被清空元素，返回新数组
```

### sort/reverse
```
【对数组的引用。请注意，数组在原数组上进行排序，不生成副本】
arr.sort(function(a, b) {  a:后面的值、b:前面的值
  return 小于0; // 倒着排列，倒序  越来越小
  return 0;  // 原来的顺序
  return 大于0;  // 正序   越来越大
});

升序
arr.sort(function(a, b) {
  return a-b;
});

倒序
arr.sort(function(a, b) {
  return b-a;
});

随机
arr.sort(function(a, b) {
  return Math.random() > .5 ? -1 : 1;
});


arr.reverse():把原来的数组倒着排列一次，不会生成新的数组；
```

### map/reduce
```
【原数组不动，返回一个新的数组】
应用：返回新数组，里面每个元素重新计算；优势就是不用forEach这么麻烦

arr.map(function(ele){
  return ele*ele;
});
arr.map(ele=>ele) 复制一个数组


reduce:每个元素执行后面的函数fn，执行函数fn的第一个值是reduce的第二个参数0；
var items = [10, 120, 1000];
var fn = function add(sumSoFar, item) { 
    return sumSoFar + item; 
};
var total = items.reduce(fn, 0);
console.log(total); // 1130
```

### filter
```
【原数组不动，返回一个新的数组】
应用：返回新数组，过滤一些元素；优势就是不用forEach这么麻烦

filter()实例：筛选排除掉所有的小值​
function isBigEnough(element) {
   【这里只要一个ture|false】
    return element >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
console.log(filtered);//[ 12, 130, 44 ]


var arr = [1, 2, 3, 4, 5, 0];
var arr_1 = arr.filter(function  (ele) {
  return ele;【0没有返回，return 0就相当于是 return;】
});
console.log(arr_1); // [1, 2, 3, 4, 5]  
```

### 应用
* 判断一个字符串中出现次数最多的字符，统计这个次数
```
var str = 'asdfssaaasasasasaa';
var json = {};
for (var i = 0; i < str.length; i++) {
    if(!json[str.charAt(i)]){
       json[str.charAt(i)] = 1;
    }else{
       json[str.charAt(i)]++;
    }
};
var iMax = 0;
var iIndex = '';
for(var i in json){
    if(json[i]>iMax){
         iMax = json[i];
         iIndex = i;
    }
}        
console.log('出现次数最多的是:'+iIndex+'出现'+iMax+'次');
```

* 数组去重
```
var arr = [2,3,4,4,5,2,3,6],
   arr2 = [];
for(var i = 0;i< arr.length;i++){
    if(arr2.indexOf(arr[i]) < 0){
        arr2.push(arr[i]);
    }
}

var arr = [2,3,4,4,5,2,3,6];
var arr2 = arr.filter(function(element,index,self){
return self.indexOf(element) === index;
});

```
