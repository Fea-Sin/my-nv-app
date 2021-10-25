# Rollup, Babel 插件

**编译**

首先是 Babel 编译，它会把 ES Next 语法解析成语法树，然后转换成各种兼容性更好的语法

举个例子

```js
// 源码
var b = { ...a };

// 编译后
function _extends() {}
var b = _extends({}, a);
```

这里的`_extends`就是一个 helper，用于实现`...`的展开功能

但是有两个文件都用到了`...`，会在每个文件里都生成一个`_extends`方法

> **问题一： 每个文件里都生成 helper 方法**

- `@babel/preset-env`

`@babel/preset-env`是一个插件集，它会根据指定环境对 js 特性的支持情况，来按需转换`ES Next`代码。
如果开启了`corejs`配置，它还会自动从`core-js`中引入 polyfill

`corejs`配置需要跟`useBuiltIns: usage`或者`useBuiltIns: entry`一起使用，需要指定`corejs` version

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": "58",
          "ie": "11"
        },
        "useBuiltIns": "usage",
        "modules": false,
        "corejs": "3"
      }
    ]
  ]
}
```

```js
const b = new Map();
```

这时我们使用 Map 的话，如果环境不支持，就会自动引入 Map 的 polyfill

自动引入的 polyfill 是挂载到全局的，但是我们可能只是打包一个库，不希望污染全局环境，这时我们
会用`@babel/plugin-transform-runtime`插件

> **问题二： 自动引入的 polyfill 是挂载到全局的**

- `@babel/plugin-transform-runtime`

一个可以重复使用 Babel 注入 helper 代码的插件

`@babel/plugin-transform-runtime`的作用是将 Babel 生成的一些代码转换成 runtime 实现。
它的作用包括两个方面：helpers 和 polyfill

```json
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": "3"
      }
    ]
  ]
```

配置`@babel/plugin-transform-runtime`后

原来的 helpers 函数

```js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
```

变为

```js
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
```

原来的全局 polyfill

```js
import "core-js/modules/es6.object.keys.js";
import "core-js/modules/es6.symbol.js";
import "core-js/modules/es6.array.filter.js";
import "core-js/modules/es6.object.get-own-property-descriptor.js";
import "core-js/modules/es7.object.get-own-property-descriptors.js";
```

变成

```js
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
```
