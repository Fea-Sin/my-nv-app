# Rollup 配置

我们一般在命令行中使用 Rollup，也可以提供一份配置文件来简化命令行操作，同时还能启用 Rollup 的
高级特性

配置文件是一个 ES6 模块，它对外暴露一个对象，这个对象包含了一些 Rollup 需要的一些选项。通常，我们
把这个配置文件叫做`rollup.config.js`

必须配置文件才能完成的高级操作

- 把一个项目打包，然后输出多个文件

- 使用 Rollup 插件，例如让你加载 Node.js 里面的 CommonJS 模块

如果想要使用 Rollup 的配置文件，需要在命令行里加上`--config`或者`-c`

```bash

// 默认使用根目录 rollup.config.js
rollup --config

// 或者，使用自定义配置文件
rollup --config my.config.js
```

## 命令行参数

```
-i, --input <filename>: 要打包的文件（必须）
-o, --file <output>: 输出的文件
-f, --format <format>: 输出的文件类型（amd, cjs, esm, iife, umd）
-e, --external <ids>: 将以逗号分隔的模块列表排除在最终生成文件之外
-n, --name <name>: 生成UMD模块的名字
-m, --sourcemap: 生成 sourcemap
-w, --watch: 监听源文件是否有改动，如果有改动，重新打包

--amd.id: AMD模块的ID，默认是个匿名函数
--no-strict: 在生成的包中省略`use strict`
--interop: 包含公共的模块（这个选项是默认添加的）
--intro: 在打包好的文件的块的内部的最顶部插入一段内容
```
