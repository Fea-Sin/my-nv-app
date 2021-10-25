# Rollup + Babel

许多开发人员在它们的项目中使用 Babel，以便他们可以使用未被浏览器和 Node.js 支持的将来
版本的 JavaScript 特性

使用 Babel 和 Rollup 的最简单方法是使用`rollup-plugin-babel`

[实例](../rollup.config.js)

在 Babel 实际编译代码之前，需要进行配置。这个设置有一些不同寻常的地方，首先我们设置`"modules": false`，
否则 Babel 会在 Rollup 处理之前，将我们的模块转成 CommonJS，导致 Rollup 的一些处理失败

其次，我们使用`@babel/plugin-external-helpers`插件，它允许 Rollup 在包的顶部只引用一次`helpers`，而不是
每个使用它们的模块中都引用一遍

我们可以在`src`文件下添加`.babelrc`文件，这允许我们对不同的任务有不同的`.babelrc`配置，比如像测试，通常
我们为单独的任务单独配置会更好

## 背景

Babel 是一个 JavaScript 编译器，用于解析和编译 ES Next 语法

- @babel/preset-env 是一个插件集，内置了自动添加 polyfill 的功能

- @babel/plugin-transform-runtime 是一个 Babel 插件，用于将 helpers 转化为 runtime 的引用，减少重复代码

- @babel/plugin-external-helpers 是一个 Babel 插件，用于将 helpers 外置

- rollup-plugin-babel 是一个 Rollup 插件，用于在 Rollup 打包过程中，对 JavaScript 文件应用 Babel
