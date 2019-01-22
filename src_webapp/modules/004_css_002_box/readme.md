### CSS盒模型

#### 标准模型+IE模型
* 标准模型：宽高（width，height）=文本宽高   没有padding，border；
* IE模型：宽高（width，height）=文本宽高+padding+border；

#### 设置盒模型
* 标准模型：box-sizing:content-box; 默认
* IE模型：box-sizing:border-box;

#### 边距重叠

* 兄弟：上下DOM的20px会重叠
```
  >.box {
    width: 100px;
    height: 100px;
    background-color: #fff;
    margin-bottom: 20px;
  }
  >.box_1 {
    margin-top: 20px;
    width: 100px;
    height: 100px;
    background-color: #100;
  }
```

* 父子关系，子DOM的10px超过父DOM出去。
```
  >.box_2 {  【父DOM没有高度】
    width: 100%;
    background-color: #444;
    >.son{
      width: 200px;
      height: 200px;
      margin-top: 10px;  【会超出去】
      background-color: #fff;
    }
  }
```

* 无论是本身的DOM的margin，还是超出的父DOM的margin。遇见了就会重叠
```
  >.box_1 {
    margin-top: 20px;
    width: 100px;
    height: 100px;
    background-color: #100;
    margin-bottom: 10px;  【本身的】
  }
  >.box_2 {
    width: 100%;
    background-color: #444;
    >.son{
      width: 200px;
      height: 200px;
      margin-top: 10px;  【超出去的】
      background-color: #fff;
    }
  }
```

#### BFC：块级格式化上下文  Block Fromatting Context

* 解决：
```
1.BFC区域的边距在垂直方向上不发生重叠
2.BFC的区域不会与浮动元素的边距重叠
3.BFC在页面上是独立的容器，里面外面的元素不会相互影响
4.计算父级BFC元素高度的时候，子元素为浮动元素也会参与计算。
```

#### 如何创建BFC

* 给发生重叠的DOM，加一个父级DOM，设置BFC
```
float的值不为none
position的值不为static或者relative
display的值为 table-cell, table-caption, inline-block, flex, 或者 inline-flex中的其中一个
overflow的值不为visible
```
* 推荐使用：overflow：hidden

#### BFC使用场景

* 修改上面的情况：涉及到规则的1/3/4
* 左右布局：规则2。FBC区域与外面的浮动元素,不会与浮动元素的边距重叠，。
```
<div class="box_4">
  <div class="left"></div>
  <div class="right"></div>
</div>
  >.box_4{
    width: 100%;
    background-color: #777;
    >.left{
      float: left;
      width: 100px;
      height: 100px;
      background-color: red;
    }
    >.right{
      height: 200px;
      background-color: #fff;
      overflow: hidden;  【FBC区域与外面的浮动元素。不会与浮动元素重叠】
    }
  }
```
* 父级内部有浮动元素，父级高度就不会撑起来，子DOM的margin也会撑出去，父级DOM想撑起来或不想被超出去，父级设置BFC。见box_5

#### 理解
* 如果说任何有上面情况的margin的DOM，怎么创建BFC？给当前DOM新增个父级，父级设置BFC。设置BFC的话，父级就成为块级格式化上下文。然后父级的DOM的高度计算就是把子DOM的margin全部算在内，外面相互之间也不再会发生影响。
