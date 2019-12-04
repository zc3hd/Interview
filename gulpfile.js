'use strict';
var one = './src_webapp/modules/js_demo/';












// 生成文件的配置
var opts = {
  // 真是的工作目录，
  dist: 'webapp',
  // 要src的文件夹名字
  src: 'src_webapp',
  // 编译一个功能模块路径
  one: one,
};


















// 开发环境key
var env = process.env.NODE_ENV;

var path = require('path');
var gulp = require('gulp');
var fs = require('fs-extra');

// 全局配置
var conf = require('./conf.js');

// ------------------------------------------------服务器及文件编译
// 服务器
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// html
var htmlmin = require('gulp-htmlmin');

// JS
const uglify = require('gulp-uglifyes');
var babel = require('gulp-babel');
// 取消严格模式
var removeUseStrict = require("gulp-remove-use-strict");

// css
var cssnano = require('gulp-cssnano');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');

// img
var imagemin = require('gulp-imagemin'); // 图片压缩
var pngquant = require('imagemin-pngquant'); // 深度压缩 



// -----------------------------------------------------错误插件
// 错误阻止
var plumber = require('gulp-plumber');
// 重命名插件
var rename = require('gulp-rename');
// 错误调试地图
var sourcemaps = require('gulp-sourcemaps');
// 只更新修改过的文件
var changed = require('gulp-changed');


// -----------------------------------------------------路径解析
var arr = opts.one.split('/');
arr.forEach(function(ele, index) {
  if (ele == opts.src) {
    arr[index] = opts.dist;
  }
});
// 生成目标文件路径
opts.one_dist = arr.join('/');



var server_opts = null
  // 静态服务器 + 监听 html,css 文件
gulp.task('server', function() {

  switch (env) {
    case "web_proxy":
      // 前后端开发模式
      server_opts = {
        // 被代理的后台API端口
        proxy: 'http://localhost:' + conf.api_port,

        browser: 'chrome',
        notify: false,

        // gulp 前端的端口
        port: conf.dev_port
      };
      break;
    case "web_only":
      // 前端开发模式
      server_opts = {
        notify: false,
        server: path.resolve(__dirname, opts.dist),
        index: './index.html',
        port: conf.dev_port,
        logConnections: true
      };
      break;
  }
  // 启动代理服务器。
  browserSync.init(server_opts);


  // 监听 html
  gulp.watch(path.join(opts.one, '*.html'), ['html']);
  // 监听 less
  gulp.watch(path.join(opts.one, '*.less'), ['less']);
  // 监听 images
  gulp.watch(path.join(opts.one, '*/*.{png,jpg,gif,svg}'), ['images']);
  // 监听 js
  gulp.watch(path.join(opts.one, '*.js'), ['js']);
});




// html
gulp.task('html', function() {
  var options = {
    //清除HTML注释
    removeComments: true,
    //清除空行 压缩
    collapseWhitespace: true,
    // 忽略Boolean的值属性
    collapseBooleanAttributes: false,
    // 去除属性引用
    removeAttributeQuotes: false,
    // 删除空属性
    removeEmptyAttributes: false,
    // 删除 type="text/javascript"
    removeScriptTypeAttributes: true,
    // 删除 type="text/css"
    removeStyleLinkTypeAttributes: true,
    //压缩页面JS
    minifyJS: true,
    //压缩页面CSS
    minifyCSS: true
  };
  return (gulp.src(path.join(opts.one, '*.html'))
    .pipe(plumber())
    .pipe(htmlmin(options))
    .pipe(gulp.dest(opts.one_dist))
    .pipe(reload({
      stream: true
    })));
});

// less编译后的css将注入到浏览器里实现更新
gulp.task('less', function() {
  // gulp.src(path.join(opts.one, '*.less'))
  //   .pipe(gulp.dest(opts.one_dist));
  return (
    gulp.src(path.join(opts.one, '*.less'))
    .pipe(plumber())
    .pipe(less())
    .pipe(cssnano())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', '>5%', 'Firefox >= 20', 'Chrome >=40'],
      cascade: false
    }))
    .pipe(gulp.dest(opts.one_dist))
    .pipe(reload({
      stream: true
    })));

});

// 图片压缩
gulp.task('images', function() {
  //文件格式匹配,目前是png,jpg,gif,svg
  return (
    gulp.src(path.join(opts.one, '*/*.{png,jpg,gif,svg}'))
    .pipe(plumber())
    // 对比文件是否有过改动（此处填写的路径和输出路径保持一致）
    .pipe(changed(opts.one_dist))
    .pipe(imagemin({
      // 无损压缩JPG图片
      progressive: true,
      // 不移除svg的viewbox属性
      svgoPlugins: [{
        removeViewBox: false
      }],
      // 使用pngquant插件进行深度压缩
      use: [pngquant()]
    }))
    .pipe(gulp.dest(opts.one_dist)) // 输出路径
    .pipe(reload({
      stream: true
    })));
});

// JS文件的压缩
gulp.task('js', function() {
  return (gulp.src(path.join(opts.one, '*.js'))
    .pipe(plumber())
    // 重命名
    // .pipe(rename({
    //   suffix: '.min'
    // }))

    // 转语法
    // .pipe(babel({
    //   presets: [
    //     'es2015',
    //   ]
    // }))
    // 去除严格，这个不管用
    // .pipe(removeUseStrict())
    // 压缩
    .pipe(uglify())
    // 输出路径
    .pipe(gulp.dest(opts.one_dist))
    .pipe(reload({
      stream: true
    })));
});


gulp.task('default', ['server'], function() {
  gulp.start(['html', 'less', 'js', 'images']);
});







// gulp.task('default', function() {
//   browserSync.init(server_opts);
// });


// gulp.watch('./' + opts.dist + '/**/*')
//   .on('change', function(event) {
//     browserSync.reload();
//   });