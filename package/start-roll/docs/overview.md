# Rollup

Rollup 是一个 JavaScript 模块打包器，可将小块代码编译成大块复杂的代码，例如 library 或应用程序。
Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中，而不是以前的
特殊解决方案，如 CommonJS 和 AMD。ES6 模块可以使你自由、无缝地使用你最喜爱的 library 中那些最有用
独立函数，而你的项目不必携带其它未使用的代码。ES6 模块最终还是要由浏览器原生实现，但当前 Rollup 可以使
你提前体验

## 快速体验

假设应用程序入口起点的名称为`main.js`，并且你想要所有`import`的依赖都编译到一个名为`bundle.js`的
单个文件中

**对于浏览器**

```bash
// compile to a <script>, format iife
rollup main.js --file bundle.js --format iife
```

**对于 Node.js**

```bash
// compile to a CommonJS module, format cjs
rollup main.js --file bundle.js --format cjs
```

**对于浏览器和 Node.js**

```bash
// UMD format requires a bundle name
rollup main.js --file bundle.js --format umd --name "myBundle"
```

## Why Rollup

### 基础动因

将项目拆分成小的单独文件，可以消除无法预知的相互影响，以及显著降低了所要解决问题的复杂度。
不幸的是，JavaScript 并没有此核心功能。

### Tree-shaking

除了统一 ES6 模块之外，Rollup 还静态分析代码中的`import`，并将排除任何未实际使用的代码。
者允许您架构于现有工具和模块之上，而不会增加额外的依赖使项目的大小膨胀

在使用 CommonJS 时，必须导入完整的工具或库对象

```js
var utils = require("utils");

utils.ajax("https://api.example.com").then(handleResponse);
```

在使用 ES6 模块时，无需导入整个对象，我们可以只导入我们所需要的`ajax`函数

```js
import { ajax } from "utils";

ajax("https://api.example.com").then(handleResponse);
```

因为 Rollup 只引入了最基本最精简代码，所以可以产生轻量、快速以及复杂度地的 library 和应用程序。
因为这种基于显式的`import`和`export`语句的方式，远比**在编译后的输出代码中**，简单地运行自动
`minifier`检测未使用的变量更有效

### 兼容性（Compatibility）

Rollup 可以**通过插件**导入已经存在的 CommonJS 模块

可以将 ES6 模块编译为 UMD 或 CommonJS 格式，在`package.json`文件的`main`属性中
指向当前编译的版本，并且可以在`package.json`中增加`module`字段指向 ES6 模块版本，像
Rollup 和 webpack 这样的感知 ES6 工具，可以直接导入 ES6 模块版本
