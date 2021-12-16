# 使用插件

Gulp 插件实质上是 Node 转换流(Transform Streams)，它封装了通过管道转换文件的常见功能，通常是
使用`pipe()`方法放在`src()`和`dest()`之间。它们可以更改流过的每个文件的文件名、元数据或文件内容

每个插件应当只完成必要的工作，因此你可以把它们像构建块一样连接在一起

并非 gulp 中的一切都需要用插件来完成，虽然它们是一种快速上手的方法，但许多操作都应当通过使用
独立的功能模块或库来实现

```js
const { rollup } = require("rollup");

// Rollup 提供了基于 promise的API，在`async`任务中工作的很好

exports.default = async function () {
  const bundle = await rollup.rollup({
    input: "src/index.js",
  });

  return bundle.write({
    file: "output/bundle.js",
    format: "iife",
  });
};
```

插件应当总是用来转换文件的，其他操作都应该使用 Node 模块来实现

```js
// 直接使用Node模块`delete`，避免使用gulp-rimraf插件
exports.default = function (cb) {
  del(["output/*.js"], cb);
};
```

## 条件插件

因为插件的操作不应该针对特定文件类型，因此你可能需要使用`gulp-if`之类的插件来完成转换某些文件的操作

```js
const { src, dest } = require("gulp");
const gulpif = require("gulp-if");
const uglify = require("gulp-uglify");

function isJavaScript(file) {
  // 判断文件的扩展名是否是`.js`
  return file.extname === ".js";
}

exports.default = function () {
  // 在同一个管道上处理JavaScript和CSS文件
  // 只对JavaScript 文件应用gulp-uglify
  return src(["src/*.js", "src/*.css"])
    .pipe(gulpif(isJavaScript, uglify()))
    .pipe(dest("output/"));
};
```

## 内联插件

内联插件是一次性的转换流(Transform Streams)，你可以通过在 gulpfile 文件直接书写需要的功能

在两种情况下，创建内联插件很有用

- 避免自己创建并维护插件

- 避免 fork 一个已经存在的插件并添加自己所需的功能

```js
const { src, dest } = require("gulp");
const uglify = require("uglify-js");
const throgh2 = require("through2");

exports.default = function () {
  return src("src/*.js")
    .pipe(
      through2.obj(function (file, _, cb) {
        if (file.isBuffer()) {
          const code = uglify.minify(file.contents.toString());
          file.contents = Buffer.from(code);
        }
        cb(null, file);
      })
    )
    .pipe(dest("output"));
};
```
