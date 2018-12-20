/**
 * Created on 2017/12/13 BY zhanghongc
 */
var FN = {
  //获取cookie
  getCookie: function(c_name) {
    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1)
          c_end = document.cookie.length;
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ""
  },
  //设置cookie
  setCookie: function(c_name, value, expiredays, path) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ((path == null) ? "" : ";path=" + path + ";domain=capcare.com.cn");
  },
  //清除cookie
  clearCookie: function() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--;)
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  },
  //-------------------------------------------------获取浏览器url的参数
  getParam: function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
      return unescape(r[2]);
    return null;
  },
  //-------------------------------------------------数字保留两位小数 
  toDecimal: function(obj) {
    if (isNaN(obj.value)) {
      obj.value = ""
    } else {
      if (obj.getAttribute("data-name") == 1) {
        if (obj.value >= 1000) {
          obj.value = "999.99"
        }
      }
      obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
    }
  },
  //-------------------------------------------------时间戳转日期
  formatterDateDay: function(date, flag) {
    var me = this;
    if (!date) {;
      return false;
    } else {
      if (flag && flag == true) {
        var dt = new Date(date);
        return (dt.getFullYear() + "-" + me.reset_Num(dt.getMonth() + 1) + "-" + me.reset_Num(dt.getDate()));
      } else {
        var dt = new Date(date);
        return (dt.getFullYear() + "-" + me.reset_Num(dt.getMonth() + 1) + "-" + me.reset_Num(dt.getDate()) + " " + me.reset_Num(dt.getHours()) + ":" + me.reset_Num(dt.getMinutes()) + ':' + me.reset_Num(dt.getSeconds()));
      }
    }
  },
  // 转时分
  f_s_f: function(date) {
    var me = this;
    if (!date) {;
      return "无最新时间";
    } else {

      var dt = new Date(date);
      return (dt.getFullYear() + "-" + me.reset_Num(dt.getMonth() + 1) + "-" + me.reset_Num(dt.getDate()) + " " + me.reset_Num(dt.getHours()) + ":" + me.reset_Num(dt.getMinutes()));
    }
  },

  reset_Num: function(num) {
    if (num < 10) {
      return "0" + num;
    }
    return num;
  },
  // ---------------------------------------------时分秒修正 time h m s
  _time_fix: function(obj) {
    obj.h = obj.time.getHours() + '';
    obj.m = obj.time.getMinutes() + '';
    obj.s = obj.time.getSeconds() + '';

    if (obj.h.length == 1) {
      obj.h = '0' + obj.h;
    } else {
      obj.h = obj.h + '';
    }
    if (obj.m.length == 1) {
      obj.m = '0' + obj.m;
    } else {
      obj.m = obj.m + '';
    }
    if (obj.s.length == 1) {
      obj.s = '0' + obj.s;
    } else {
      obj.s = obj.s + '';
    }
  },
  //------------------------------------*------------设置datagrid中文显示
  setLangChina: function(id) {
    $('#' + id + '').datagrid('getPager').pagination({ //分页栏下方文字显示
      beforePageText: '第', //页数文本框前显示的汉字
      afterPageText: '页    共 {pages} 页',
      displayMsg: '当前显示：从第{from}条到{to}条 共{total}条记录',
      onBeforeRefresh: function(pageNumber, pageSize) {
        $(this).pagination('loading');
        //alert('pageNumber:'+pageNumber+',pageSize:'+pageSize);
        $(this).pagination('loaded');
      }
    });
  },
  //-------------------------------------------------获取窗口视口的大小
  getClient: function() {
    if (window.innerWidth != null) {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      }
    } else if (document.compatMode == "CSS1Compat") {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    } else {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    }
  },
  //-------------------------------------------------md5加密
  md5: function(psw) {
    return $.md5(psw.toLowerCase()).toLowerCase();
  },

  //验证手机号码
  checkPhone: function(phone, id) {
    // 手机
    var mobile_r = /^1[3|4|5|7|8]\d{9}$/,
      // 座机
      phone_r = /^0\d{2,3}-?\d{7,8}$/;

    if (mobile_r.test(phone) || phone_r.test(phone)) {

      return true;
    }
    // 
    else {
      // layer.msg('手机号码有误，请重新填写', { time: 1500 });
      layer.tips('号码有误，请重新填写!', id, {
        tips: [1, '#1E9FFF']
      });
      return false;
    }

  },
  // 验证邮箱
  check_mail: function(mail, id) {
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式

    //输入不能为空
    if (mail === "") {
      // layer.msg('输入不能为空!', { time: 1500 });
      layer.tips('该项不能为空！', id, {
        tips: [1, '#1E9FFF']
      });
      return false;
    }
    //正则验证不通过，格式不对
    else if (!reg.test(mail)) {
      layer.tips('验证不通过!', id, {
        tips: [1, '#1E9FFF']
      });
      return false;
    }
    // 
    else {
      return true;
    }
  },
  // 验证IP
  check_IP: function(ip, id) {
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    if (ip === "") {
      // layer.msg('输入不能为空!', { time: 1500 });
      layer.tips('该项不能为空！', id, {
        tips: [1, '#1E9FFF']
      });
      return false;
    }
    //正则验证不通过，格式不对
    else if (!reg.test(ip)) {
      // layer.msg('验证不通过!', { time: 1500 });
      layer.tips('验证不通过!', id, {
        tips: [1, '#1E9FFF']
      });
      return false;
    }
    // 
    else {
      return true;
    }
  },
  // 验证port
  check_port: function(port, id) {
    if (port === "") {
      // layer.msg('输入不能为空!', { time: 1500 });
      layer.tips('该项不能为空！', id, {
        tips: [1, '#1E9FFF']
      });
      return false;
    }
    //格式不对
    else if ((port < 0) || (port > 65535)) {
      // layer.msg('验证不通过!', { time: 1500 });
      layer.tips('验证不通过!', id, {
        tips: [1, '#1E9FFF']
      });
      return false;
    }
    // 
    else {
      return true;
    }
  },
  // 字符
  check_str: function(str, limit, id) {
    if (str === "") {
      // layer.msg('输入不能为空!', { time: 1500 });
      layer.tips('该项不能为空！', id, {
        tips: [1, '#1E9FFF']
      });
      return false;
    }
    //格式不对
    else if (str.indexOf(' ') != -1) {
      // layer.msg('输入超过限制', { time: 1500 });
      layer.tips('不可出现空字符!', id, {
        tips: [1, '#1E9FFF']
      });
      return false;
    }
    //格式不对
    else if (str.length > limit) {
      // layer.msg('输入超过限制', { time: 1500 });
      layer.tips('输入超过限制!', id, {
        tips: [1, '#1E9FFF']
      });
      return false;
    }
    // 
    else {
      return true;
    }
  },
  // 数字
  check_num: function(num, id) {

    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
    if (num === "" || num == null) {
      layer.tips('该项不能为空！', id, {
        tips: [1, '#1E9FFF']
      });
      $(id).val('');
      return false;
    }
    // 
    else if (isNaN(num)) {
      layer.tips('输入的不是数字', id, {
        tips: [1, '#1E9FFF']
      });
      return false;
    }
    // 
    else {
      return true;
    }
  },
  // 英文 数字 下划线 连接符
  check_no_z: function(str, id) {

    var reg = /^[A-Za-z0-9_-]+$/ig;
    if (str === "") {
      // layer.msg('输入不能为空!', { time: 1500 });
      layer.tips('该项不能为空！', id, {
        tips: [1, '#1E9FFF']
      });
      return false;
    }
    //正则验证不通过，格式不对
    else if (!reg.test(str)) {
      // layer.msg('验证不通过!', { time: 1500 });
      layer.tips('验证不通过!', id, {
        tips: [1, '#1E9FFF']
      });
      return false;
    }
    // 
    else {
      return true;
    }
  },


  // -------------------------------------------------测试ajax接口
  // -------------------------------------------------测试ajax接口
  // -------------------------------------------------测试ajax接口
  // -------------------------------------------------测试ajax接口
  test_ajax: function(root_path, arr) {
    arr.forEach(function(ele, index) {
      ele.url = root_path + ele.url;
      (function(ele) {
        var opt = {
          url: ele.url,
          dataType: "json",
          type: "POST",
        };
        if (ele.data) {
          opt.data = ele.data
        }
        $.ajax(opt)
          .done(function(data) {
            console.log(ele.name + '---done');
            console.log(data);
            console.log('\n');
          })
          .fail(function(data) {
            console.log(ele.name + '>>>-----fail');
          })
      })(ele)
    });
  },
  // -------------------------------------------------同源 or 跨域-AJAX发送
  // -------------------------------------------------同源 or 跨域-AJAX发送
  // -------------------------------------------------同源 or 跨域-AJAX发送
  // -------------------------------------------------同源 or 跨域-AJAX发送
  ajax: function(obj) {

    // ----同源请求
    // ----同源请求
    if (!conf.cors_key) {
      // 默认全部是POST请求
      var opts = {
        url: conf.root_path + obj.url,
        dataType: "json",
        type: "POST",
        // data: obj
      };

      // 存在
      if (obj.data != undefined) {
        opts.data = obj.data;
      }
      return $.ajax(opts)
        .fail(function(data) {

          var str = data.responseText;
          var key = str.indexOf('doctype');

          // 重新进行定向
          if (key == 2) {
            $(window.parent.window)[0].location = '/cors-mot/';
          }
        });
    }
    // ----跨域请求
    // ----跨域请求
    else {

      var xhr = getHttpObj();

      xhr.open("post", "http://localhost:" + conf.cors_port + conf.root_path + obj.url, true);
      //缺少这句，后台无法获取参数  
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");

      // 存在参数
      if (obj.data != undefined) {
        var content = "";
        // var content = "appid=11111&sign=222222222";
        for (var key in obj.data) {
          content += key + '=' + obj.data[key] + '&';
        }
        content = content.slice(0, content.length - 1);
        xhr.send(content);
      }
      // 没有参数
      else {
        xhr.send();
      }


      var timer = null;
      // 自己写的函数
      xhr.done = function(cb) {
        timer = setInterval(function() {
          // 拿到请求
          if (xhr.readyState == 4 && xhr.status == 200) {
            cb(JSON.parse(xhr.responseText));
            clearInterval(timer);
          }
          // 没有拿到数据
          else {

          }
        }, 1);
      };
      return xhr;

      // 响应的函数
      // xhr.onreadystatechange = function() {

      //   if (xhr.readyState == 4 && xhr.status == 200) {

      //     var arr = JSON.parse(xhr.responseText);

      //     // console.log(arr);
      //   }
      // };
    }


    function getHttpObj() {
      var httpobj = null;
      try {
        httpobj = new ActiveXObject("Msxml2.XMLHTTP");
      }
      // 
      catch (e) {
        try {
          httpobj = new ActiveXObject("Microsoft.XMLHTTP");
        }
        // 
        catch (e1) {
          httpobj = new XMLHttpRequest();
        }
      }
      return httpobj;
    }
  },

  // ------------------------------------------------返回load加载层
  load: function() {
    /* body... */
    return layer.load(conf.load_sty, {
      shade: 0.6
    });
  },
  // ------------------------------------------------获取dom的视图高度
  dom_height: function(sel) {
    // 不存在该dom
    if ($(sel).length == 0) {
      return 0;
    } else {
      return $(sel).css('height').replace('px', '') * 1;
    }
  },
  // 视图宽度
  dom_width: function(sel) {
    // 不存在该dom
    if ($(sel).length == 0) {
      return 0;
    } else {
      return $(sel).css('width').replace('px', '') * 1;
    }
  },
  // ------------------------------------------------设置BOX的padding值
  _box_padding: function() {
    var pt = 0;
    if (FN.dom_height('.header') != 0) {
      pt += FN.dom_height('.header');
      pt += 5;
    }
    if (FN.dom_height('.tool') != 0) {
      pt += FN.dom_height('.tool');
      pt += 5;
    }
    $('.app>.box').css('paddingTop', pt + 'px');
  },
  myPager: function(pno, rows, totalRecords, fn) { //rows每页多少条
    kkpager.generPageHtml({
      pno: pno, //当前页码
      mode: 'click', //设置为click模式
      //总页码  
      total: Math.ceil(totalRecords / rows),
      //总数据条数  
      totalRecords: totalRecords,
      isShowFirstPageBtn: true,
      isShowLastPageBtn: true,
      isShowTotalPage: true,
      isShowTotalRecords: true,
      isGoPage: false,
      isShowCurrPage: false,
      lang: {
        prePageText: '<',
        nextPageText: '>'
      },
      //点击页码、页码输入框跳转、以及首页、下一页等按钮都会调用click
      //适用于不刷新页面，比如ajax
      click: function(n) {
        this.selectPage(n);
        fn && fn(n);
      },
      //getHref是在click模式下链接算法，一般不需要配置，默认代码如下
      getHref: function(n) {
        return '#';
      }
    }, true);
  },
  //时间格式转换
  longToDate: function(lmsd) {
    if (lmsd != null && lmsd != '') {
      var date = new Date();
      date.setTime(lmsd);
      var day = date.getDate().toString();
      day = day.length == 1 ? '0' + day : day;
      var month = (date.getMonth() + 1).toString();
      month = month.length == 1 ? '0' + month : month;
      var year = date.getFullYear();
      var hour = date.getHours().toString();
      hour = hour.length == 1 ? '0' + hour : hour;
      var min = date.getMinutes().toString();
      min = min.length == 1 ? '0' + min : min;
      var second = date.getSeconds().toString();
      second = second.length == 1 ? '0' + second : second;
      return (year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + second);
    } else {
      return ('无');
    }
  },
  dataToLong: function(str) {
    if (str != '' && str != '无') {
      str = str.replace(/-/g, '/'); // 将-替换成/
      var date = new Date(str); // 构造一个日期型数据，值为传入的字符串
      var time = date.getTime();
      return time;
    }
  },

};
