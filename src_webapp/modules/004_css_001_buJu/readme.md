# 页面布局

### 页面布局

* 高度已知，三栏布局，左右各300px,中间自适应。
* 浮动，绝对定位，flexbox，表格布局，网格布局。

#### 优缺点
* 浮动：脱离文档流的。清除浮动。兼容性好。中间的模块完全撑开的。
```
  >.box_1 {
    >.left {
      float: left;
      width: 300px;
      height: 100px;
      background-color: blue;
    }
    >.right {
      float: right;
      width: 300px;
      height: 100px;
      background-color: blue;
    }
    // 这个盒子里面就不好使用定位
    >.center {
      height: 100%;
    }
  }
```

* 定位：快捷。可使用性差。
```
  >.box_2 {
    position: relative;
    >div {
      height: 100%;
      position: absolute;
      top: 0;
    }
    >.left {
      left: 0;
      width: 300px;
    }
    >.right {
      right: 0;
      width: 300px;
    }
    // 左右距离边界的距离
    >.center {
      left: 300px;
      right: 300px;
    }
  }
```

* flex:解决上面两个问题。移动端flex布局。单元格会同时增高。
```
Flex容器（flex container），简称"容器"。
它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称"项目"。
1.容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。
2.主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；
3.交叉轴的开始位置叫做cross start，结束位置叫做cross end。
4.项目默认沿主轴排列。
5.单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

以下6个属性设置在容器上：
flex-direction　　容器内项目的排列方向(默认横向排列)　　
flex-direction: row | row-reverse | column | column-reverse;

flex-wrap　　容器内项目换行方式
flex-wrap: nowrap | wrap | wrap-reverse;

flex-flow　　以上两个属性的简写方式
flex-flow: <flex-direction> || <flex-wrap>;

justify-content　　项目在主轴上的对齐方式，其实就是在主轴上怎么排列，就是如何安排这些项目。

justify-content: flex-start | flex-end | center | space-between | space-around;
flex-start：在主轴上由左或者上开始排列
flex-end：在主轴上由右或者下开始排列
center：在主轴上居中排列
space-between：在主轴上左右两端或者上下两端开始排列
space-around：
每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。


align-items项目在交叉轴上如何对齐，就就是在Y方向上怎么排列
align-items: flex-start | flex-end | center | baseline | stretch;


align-items: flex-start | flex-end | center | baseline | stretch;
align-content:定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
```

* table:兼容性非常好。单元格会同时增高。
```
  >.box_4 {
    display: table;
    >div {
      display: table-cell;
      height: 100%;
    }
    >.left {
      width: 300px;
    }
    >.center {
    }
    >.right {
      width: 300px;
    }
  }
```

* grid:代码减少很多，高度不会增加。
```
display: grid;
grid-template-rows: 100px;
grid-template-columns: 300px auto 300px;
```

#### 去掉高度已知
* 浮动：文本被遮挡。

#### 总结

* 语义化：section article代码素养
* 布局理解深刻
* 网格布局要学习

#### 4.need

* 3：左右宽度固定，中间自适应
* 3：上下高度固定，中间自适应
* 
* 2：左固定，右自适应
* 2：左自适应，右固定
* 2：上固定，下自适应
* 2：上自适应，下固定

* 定位
* 定位+盒子模型
* flex



* px和em的区别
```
相同点：px和em都是长度单位；
异同点：px的值是固定的，指定是多少就是多少，计算比较容易。em得值不是固定的，并且em会继承父级元素的字体大小。
浏览器的默认字体高都是16px。所以未经调整的浏览器都符合: 1em=16px。那么12px=0.75em, 10px=0.625em。
```
