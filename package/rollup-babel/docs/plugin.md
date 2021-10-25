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

`@babel/preset-env`对 polyfill 的处理，它会从`core-js`库中引入对应的实现，并挂载到全局

`@babel/plugin-transform-runtime`只有设置了`corejs: 3`的情况下才会处理 polyfill，它的处理方式
并不是挂载到全局，如上对比所示，它是将对应的包赋予一个局部变量，它不会改变任何环境已有的代码

这样做的好处

- 不会污染全局环境，不会影响其它包

- 不依赖环境提供的全局变量，不会受到其它包的影响

- 依赖内部消化，作为库发布时，依赖处理会更简单

## @babel/plugin-external-helpers

这个插件的意思比较明显，就是把所有的辅助方法都打到外面去，通过全局变量的方式访问

## rollup-plugin-babel

和 webpack 相比，rollup 打包的代码冗余更少，可读性更好，通常用于库的构建

`rollup-plugin-babel`是一个 Rollup 插件，它在打包过程中使用 babel 编译代码，并应用 babel
的插件

那么它与直接 babel 编译，然后再打包的区别在哪里

- 如果先编译后打包，会出现重复代码。我们可以通过`tranform-runtime`插件加上配置`externals`来解决重复代码
  问题，但是会麻烦

- 如果先打包后编译，速度会更慢

这个插件，一边打包，一边编译。

默认情况下，它会将所有的 helpers 方法集中起来，插入到结果的头部，以确保 helpers 方法只被插入一次，
它的实现原理是直接将所有的 helpers 方法插入到代码前面，然后通过 Tree shaking 去掉没有用到的方法

## 总结

- `@babel/preset-env`在`core-js`包的加持下，可以自动为我们项目添加所需的 polyfill，但是会污染
  全局环境

- `@babel/plugin-transform-runtime` 在 `@babel/runtime-corejs`的加持下，将 helpers 和 polyfill
  转换成包的依赖，既解决了重复代码问题，有解决了 polyfill 污染全局的问题

- Rollup 构建库时，使用`rollup-plugin-babel`插件

  - 可以使用内置的`externalHelpers`方案，确保只引入一次 helpers，但是需要自己添加 polyfill

  - 使用`runtimeHelpers`方案，结合`@babel/plugin-transform-runtime`，通过 runtime 实现，更好的
    复用代码，因此推荐使用的做法

    ```js
    const babel = require("rollup-plugin-babel");

    babel({
      runtimeHelpers: true,
      plugins: [["@babel/plugin-transform-runtime", { corejs: 3 }]],
    });
    ```

[实例 esm](../rollup.config.js)

[实例 umd](../rollup.config.umd.js)
