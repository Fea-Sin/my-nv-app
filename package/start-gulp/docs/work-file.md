# 处理文件

gulp 暴露了`src()`和`dest()`方法用于处理计算机上存放的文件

`src()`接受`glob`参数，并从文件系统中读取文件然后生成一个 Node 流(stream)，它将所有匹配的文件
读取到内存中并通过流(stream)进行处理

> **Stream**
> Source Code: lib/stream.js
> stream 是一个抽象接口，在 Node.js working with `streaming data`
>
> `stream`模块提供了实现 stream 接口的 API
> 在 Node.js 中提供了许多 stream objects，例如`request to an HTTP servers`, `process.stdout`都是 stream 实例
> `stream`module
>
> ```js
> const stream = require("stream");
> ```
>
> `stream`module 可以很容易的创建新的 stream 实例，但通常不需要使用`stream`module 消费(consume)streams

`src()`产生的流(stream)所提供的主要的 API 是`.pipe()`方法，用于连接转换流(Transform streams)或可写流(Writable streams)

```js
const { src, dest } = require("gulp");
const babel = require("gulp-babel");

exports.default = function () {
  return src("src/*.js").pipe(babel()).pipe(dest("output"));
};
```

`dest()`接受一个输出目录作为参数，并且它还会产生一个 Node 流，通常作为终止流(terminator stream)，
当它接收到通过管道(pipeline)传输的文件时，它会将文件内容及文件属性写入到指定的目录中

gulp 还提供了`symlink()`方法，其操作方式类似`dest()`，但是创建的是链接而不是文件

## 向流(stream)中添加文件

`src()`也可以放在管道的中间，以根据给定的 glob 向流中添加文件，新加入的文件只对后续的转换可用，
如果 glob 匹配的文件与之前的有重复，仍然会再次添加文件

者对于在添加普通的 JavaScript 文件之前先转换部分文件的场景很有用，添加新的文件后可以对所有文件
统一进行压缩并混淆

```js
const { src, dest } = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

exports.default = function () {
  return src("src/*.js")
    .pipe(babel())
    .pipe(src("vender/*.js"))
    .pipe(uglify())
    .pipe(dest("output"));
};
```

## 分段输出

`dest()`也可以用在管道中间，用于将文件的中间状态写入文件系统。当收到文件时，当前文件的状态将被
写入文件系统，文件路径也将被修改以反映输出文件的新位置，然后该文件继续沿着管道传输

此功能可用于在同一个管道中创建未压缩和已压缩的文件

```js
const { src, dest } = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

exports.default = function () {
  return src("src/*.js")
    .pipe(babel())
    .pipe(src("vender/*.js"))
    .pipe(dest("output/"))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest("output/"));
};
```

## 模式： 流动(streaming)、缓冲(buffered)和空(empty)

`src()`可以工作在三种模式下，缓冲(buffered)、流动(streaming)和空(empty)模式，这些模式
可以通过对`src()`的`buffer`和`read`参数进行设置

- 缓冲(buffering)模式是默认模式，将文件内容加载到内存中。插件通常运行在缓冲(buffering)
  模式下，并且许多插件不支持流动模式

- 流动(streaming)模式的存在主要用于操作无法放入内存中的大文件，例如巨幅图像或电影
  文件内容从文件系统中以小块的方式流式传输，而不是一次性全部加载

- 空(empty)不包含任何内容，仅处理文件元数据时有用
