# 插件功能

我们通过相对路径，将一个入口文件和一个模块创建成了一个简单的 bundle，随着构建更复杂的
bundle，通常需要更大的灵活性，引入 npm 安装的模块、通过 Babel 编译代码和 JSON 文件打交道等

## 加载 Node.js 里面的 CommonJS 模块

- rollup-plugin-node-resolve

- rollup-plugin-commonjs

```js
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "main.js",
  output: {
    file: "bundle.umd.js",
    format: "umd",
    name: "MyBundle",
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
    }),
    commonjs({
      extensions: [".js"],
    }),
  ],
};
```

## 加载 JSON

- rollup-plugin-json

```js
import json from "rollup-plugin-json";

export default {
  input: "src/roll-json/main.js",
  output: {
    file: "src/roll-json/bundle.js",
    format: "esm",
  },
  plugins: [json()],
};
```
