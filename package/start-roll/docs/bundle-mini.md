# Rollup Bundle

有些时候，项目可能依赖于从 npm 安装到你的`node_modules`文件夹中的软件包。与 webpack 和 browserify
这样的捆绑包不同，Rollup 不知道如何打破常规去处理这些依赖。我们需要添加一些配置

- rollup-plugin-node-resolve

这个插件可以告诉 Rollup 如何查找外部模块

[实例](../src/roll-package/rollup.config.js)

- rollup-plugin-commonjs

一些库导出的是 ES6 模块，但是，npm 中的很多包都是 CommonJS 模块，我们需要将
CommonJS 模块转换为 ES6 模块，以供 Rollup 处理

> 注意，`rollup-plugin-commonjs`应该在其它插件转换你的模块之前使用，
> 防止其他插件的改变破坏 CommonJS 的检测

## Peer dependencies

假设你正在构建一个具有对等依赖关系（peer dependencies）的库，例如 React 或 Lodash。
如若不配置外部引用`externals`，你的 Rollup 将把所有的 import 模块打包在一起

[实例](../src/roll-package/main-peer.js)

`external`接受一个模块名称的数组或一个接受模块名称的函数，如果函数返回`true`则被视为外部引用

```js
export default {
  // ...
  external: (id) => /lodash/.test(id),
};
```
