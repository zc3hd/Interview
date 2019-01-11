function App(argument) {
  var me = this;

  // 
  me.padding = 5;
  // 
  me.box_num = 600;

  me.obj = {
    // 点击的DOM
    ac_dom: null,
    // 点击DOM的下标
    ac_index: -1,
    // 即将要去的位置的下标
    go_index: -1,

    // 移动过程中的中心点
    ac_x_mid: 0,
    ac_y_mid: 0,


    // DOM的位置
    ac_dom_x: 0,
    ac_dom_y: 0,

    // 点击的位置
    x_0: 0,
    y_0: 0,
  };

  // 加载开关
  me.load_key = false;


  // 盒子属性
  me.box_data = [];

  // 图片下标和样式的对应；
  me.img_style_obj = {};
}
App.prototype = {
  init: function(argument) {
    var me = this;
    me._bind();

    // 初始化数据
    me._init();
    // 初始化样式
    me._init_style();

    // 响应
    // me._resize();

    // 排列和收集
    me._item_pos();

    // 事件
    me._item_ev();



    me._start();
  },
  _bind: function(argument) {
    var me = this;
    var fns = {
      _init: function() {



        // 盒子
        me.box_w = me._get_num();
        me.box_h = me._get_num();

        // console.log(me.box_w);

        // 图片的宽
        me.img_w = me.box_w - me.padding * 2 * 3;
        me.img_h = me.box_h - me.padding * 2 * 3;

        // me._get_num();
      },
      // 拿到最小数据
      _get_num: function() {
        // $("body").css('width');
        var min = $("body").width() < $("body").height() ? $("body").width() : $("body").height();
        // console.log(min);
        return min < me.box_num ? min : me.box_num;
      },
      // 初始化样式
      _init_style: function() {
        // 盒子样式初始化
        $('#box')
          .css({
            width: `${me.box_w}px`,
            height: `${me.box_h}px`,
          });

        // 图片盒子内衬
        $('#box>.item')
          .css('padding', `${me.padding}px`);

        // 图片背景大小
        $('#box>.item>.img')
          .css('backgroundSize', `${me.img_w}px ${me.img_h}px`);


        var doms = $('#box>.item');
        me.box_data.length = 0;
        for (var index = 0; index < doms.length; index++) {

          // 图片盒子
          $(doms[index])
            .css({
              top: `${Math.floor(index / 3)*me.box_h / 3}px`,
              left: `${index % 3*me.box_w / 3}px`,
            });

          // 盒子数据收集
          me.box_data.push({
            // 起始
            left_0: index % 3 * me.box_w / 3,
            // 终止
            left_1: index % 3 * me.box_w / 3 + me.box_w / 3,



            // 起始
            top_0: Math.floor(index / 3) * me.box_h / 3,
            // 终止
            top_1: Math.floor(index / 3) * me.box_h / 3 + me.box_h / 3,
          });


          // 设置图片位置
          $(doms[index])
            .children('.img')
            .css({
              backgroundRepeat: 'no-repeat',
              backgroundPosition: `-${index % 3*me.img_w / 3}px -${Math.floor(index / 3)*me.img_h / 3}px`,
            });


          // 收集对应数据
          me.img_style_obj[index] = `
            background-size:${me.img_w}px ${me.img_h}px;
            background-repeat:no-repeat; 
            background-position:-${index % 3*me.img_w / 3}px -${Math.floor(index / 3)*me.img_h / 3}px;
          `;
        }
        // console.log(me.img_style_obj);
      },
      // _resize: function(argument) {
      //   $(window).on('resize', function(argument) {
      //     me.load_key = true;
      //     // 初始化数据
      //     me._init();
      //     // 初始化样式
      //     me._init_style();
      //   });
      // },


      // ============================================================.
      _start: function() {
        var doms = $('#box>.item');
        var arr_index = [];
        for (var index = 0; index < doms.length; index++) {
          arr_index.push(index);
        }
        $('#start').on('click', function() {
          arr_index.sort(function(a, b) {
            return Math.random() > .5 ? -1 : 1;
          });
          for (var index = 0; index < doms.length; index++) {
            $(`#item_${index}`)
              .children('.img')
              .attr({
                '_index': arr_index[index],
                'style': me.img_style_obj[arr_index[index]]
              });
          }

        });
      },
      // ============================================================

      // 模块排列
      _item_pos: function() {
        var doms = $('#box>.item');

        for (var index = 0; index < doms.length; index++) {

          // 图片盒子排列
          $(doms[index])
            .css({
              top: `${Math.floor(index / 3)*me.box_h / 3}px`,
              left: `${index % 3*me.box_w / 3}px`,
            })
            // 标识
            .attr('_index', index)
            .attr('id', `item_${index}`);



          // 设置图片位置标识
          $(doms[index])
            .children('.img')
            // 标识
            .attr('_index', index);
        }
      },
      // 拖拽
      _item_ev: function() {

        me.ac_dom = null;
        me.ac_dom_x = 0;
        me.ac_dom_y = 0;
        me.x_0 = 0;
        me.y_0 = 0;
        // 点击-记录
        $('#box')
          .on('mousedown', '.item', function(e) {

            // console.log(e.touches[0]);
            // 目标DOM
            me.ac_dom = e.currentTarget;
            
            $(me.ac_dom).addClass('ac');

            // DOM的位置
            me.ac_dom_x = $(me.ac_dom).position().left;
            me.ac_dom_y = $(me.ac_dom).position().top;



            // console.log( me.ac_dom_x);

            // 点击的位置
            me.x_0 = e.clientX - $('#box').offset().left;
            me.y_0 = e.clientY - $('#box').offset().top;

            // console.log($('#box').offset());
          });

        // return;
        // 移动
        $('#box')
          .on('mousemove', function(e) {
            if (me.ac_dom == null) {
              return;
            }



            // 当前DOM的移动
            $(me.ac_dom)
              .css({
                left: `${me.ac_dom_x+(e.clientX-$('#box').offset().left)-me.x_0}px`,
                top: `${me.ac_dom_y+(e.clientY - $('#box').offset().top)-me.y_0}px`,
              });

            // 
            me._item_matching();

          });

        // 鼠标弹起
        $('#box')
          .on('mouseup', '.item', function(e) {
            // 匹配完成
            me._item_matched();

            // 全部成功
            me._item_over();
          });
      },
      // 匹配中.
      _item_matching: function() {
        me.ac_index = $(me.ac_dom).attr('_index');
        console.log(me.ac_index);

        // 拿到中心点
        me.obj.ac_x_mid = $(me.ac_dom).position().left + me.box_w / 3 / 2;
        me.obj.ac_y_mid = $(me.ac_dom).position().top + me.box_h / 3 / 2;

        // 
        me.box_data.forEach(function(ele, index) {
          if ((ele.left_0 < me.obj.ac_x_mid && me.obj.ac_x_mid < ele.left_1) && (ele.top_0 < me.obj.ac_y_mid && me.obj.ac_y_mid < ele.top_1)) {
            me.obj.go_index = index;
            return;

          }
        });
      },

      // 匹配完成
      _item_matched: function() {
        // 拿到ac_img的ID
        var ac_img = $(me.ac_dom).children('.img').attr('_index');
        var go_img = $(`#item_${me.obj.go_index}`).children('.img').attr('_index');

        // 当前DOM归位
        $(me.ac_dom)
          .css({
            left: `${me.box_data[me.ac_index].left_0}px`,
            top: `${me.box_data[me.ac_index].top_0}px`,
          })
          .removeClass('ac');

        // 当前DOM的img
        $(me.ac_dom)
          .children('.img')
          // 添加标识
          .attr({
            '_index': go_img,
            'style': me.img_style_obj[go_img]
          });



        // 目标DOM
        $(`#item_${me.obj.go_index}`)
          .children('.img')
          .attr({
            '_index': ac_img,
            'style': me.img_style_obj[ac_img]
          });


        // 参数初始化
        me.ac_dom = null;

        // 点击DOM的位置
        me.ac_dom_x = 0;
        me.ac_dom_y = 0;

        // 点击的位置
        me.x_0 = 0;
        me.y_0 = 0;


        // 点击DOM的下标
        me.ac_index = -1;
        // 目标DOM的ID
        me.go_index = -1;
      },

      // 完成
      _item_over: function() {
        var doms = $('#box>.item');
        var num = 0;
        for (var index = 0; index < doms.length; index++) {

          if ($(doms[index]).attr('_index') == $(doms[index]).children('.img').attr("_index")) {
            num++;
          }
        }

        if (doms.length == num) {
          setTimeout(function(argument) {
            alert("大兄弟，可以啊。完成了！");
          }, 0);
        }
      },
































    };
    for (var fn in fns) {
      me[fn] = fns[fn];
    }
  },
};


new App().init();
