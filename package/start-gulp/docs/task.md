# 创建任务

每个 gulp 任务都是一个异步的 JavaScript 函数，此函数是一个可以接收 callback 作为参数的函数，
或者是一个返回 stream、promise、event emitter、child process 或 observable 类型值的函数

## 任务导出

任务可以是 public(公开)或 private(私有)的

- 公开任务从 gulpfile 中导出，可以通过`gulp`命令直接调用
- 私有任务被设计为在内部使用，通常作为`series()`或`parallel()`组合的组成部分

一个私有类型任务在外观上和行为上和其他任务是一样的，但是不能够被用户直接调用

## 组合任务

Gulp 提供了两个强大的组合方法`series()`和`parallel()`，允许将多个独立的任务组合为一个更大的操作。
这两个方法都可以接受任意数目的任务函数或已经组合的操作，`series()`和`parallel()`可以互相嵌套任意深度

如果需要让任务按顺序执行，使用`series()`方法

如果希望以最大并发来运行的任务，可以使用`parallel()`方法将它们组合起来

## 异步执行

Node 库以多种方式处理异步功能。最常见的模式是`error-first callback`，但是你还可能会遇到
`streams`, `promises`, `event emitters`, `child processes`或`observables`

> **error-first callbacks**
> 大多数的异步方法的执行都遵循 Node.js 核心 API 被称为`error-first callback`模式
> 这种模式，异步操作会传入一个回调函数作为参数，异步操作或者是执行完成，或者是因为异常而产生错误
> 此时，回调函数的第一个参数，或者传入异常时的`Error object`，或者正常执行时传入`null`

```js
const fs = require("fs");

function errorFirstCallback(err, data) {
  if (err) {
    console.error("There was an error", err);
    return;
  }
  console.log(data);
}

fs.readFile("/some/file/that/does-not-exist", errorFirstCallback);
```

## 任务完成通知

当从任务中返回`stream`, `promise`, `event emitter`, `child process`或`observable`时，
成功或错误值将通知 gulp 是否继续执行或结束。如果任务出错，gulp 将立即结束执行并显示该错误

当使用`series()`组合多个任务时，任何一个任务的错误将导致整个任务组合结束，并且不会进一步执行其他任务。
当使用`parallel()`组合多个任务时，一个任务的错误将结束整个任务组合的结束，但是其他并行的任务可能会执行
完，也可能没有执行完

### 返回`stream`

```js
const { src, dest } = require("gulp");

function streamTask() {
  return src("*.js").pipe(dest("output"));
}

exports.default = streamTask;
```

### 返回`promise`

```js
function promiseTask() {
  return Promise.resolve("the value is ignored");
}

exports.default = promiseTask;
```

### 返回`event emitter`

```js
const { EventEmitter } = require("events");

function eventEmitterTask() {
  const emitter = new EventEmitter();

  // Emit has to happen async
  setTimeout(() => emitter.emit("finish"), 250);
  return emitter;
}

exports.default = eventEmitterTask;
```

### 返回`child process`

```js
const { exec } = require("child_process");

function childProcessTask() {
  return exec("date");
}

exports.default = childProcessTask;
```

### 返回`observable`

```js
const { Observable } = require("rxjs");

function observableTask() {
  return Observable.of(1, 2, 3);
}

exports.default = observableTask;
```

### 使用 `callback`

如果任务不返回任何内容，则必须使用`callback`来指示任务已完成，如下示例中，
callback 将作为唯一一个名为`cb()`的参数传递给任务

```js
function callbackTask(cb) {
  // `cb()` should be called by some async work
  cb();
}

exports.default = callbackTask;
```

如需通过 callback 把任务中的错误告知 gulp，请将`Error`作为 callback 的唯一参数

```js
function callbackError(cb) {
  cb(new Error("kaboom"));
}

exports.default = callbackError;
```

然而，你通常会将此 callback 函数传递给另一个 API，而不是自己调用它

```js
const fs = require("fs");

function passingCallback(cb) {
  fs.access("gulpfile.js", cb);
}

exports.default = passingCallback;
```

### 使用 `async/await`

你还可以将任务定义为一个`async`函数，它将利用 promise 对你的任务进行包装，
这将允许你使用`await`处理 promise

```js
const fs = require("fs");

async function asyncAwaitTask() {
  const { version } = fs.readFileSync("package.json");
  console.log(version);
  await Promise.resolve("some result");
}

exports.default = asyncAwaitTask;
```
