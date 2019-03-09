### CSS移动


* position: relative; transform: translate(30px, 30px);都是相对自己的位置在移动，有什么区别呢？

* 从页面布局的角度看效果是一样的。
* 从动画角度来说使用transform时，可以让 GPU 参与运算，动画的 FPS 更高。position时，最小的动画变化的单位是1px，transform参与时，可以做到更小（动画效果更加平滑）position 是为页面布局而生的。transform 是为动画而生的。
功能都一样。
* 但是translate不会引起浏览器的重绘和重排，这就相当nice了。这点就很牛逼了。页面不会Repaint（没有重新计算render tree）
