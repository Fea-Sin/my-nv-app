# Rollup Babel New

`@rollup/plugin-babel`

🍣 一个集成 Rollup 和 Babel 的 Rollup 插件

```bash
npm install --save-dev @rollup/plugin-babel
```

实例

```js
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel"

export default {
  ...
  plugins: [
    commonjs(),
    nodeResolve(),
    babel({
      babelHelpers: "runtime"
    })
  ]
};
```

## babelHelpers

type: `bundled` `runtime` `inline` `external`，default: `bundled`

当使用`runtime`时，需要跟 Babel 的插件联合使用 `@babel/plugin-transform-runtime` 和 `@babel/runtime`

babel 会自动搜索 Babel 配置文件，自动加载相应配置

[实例](../rollup.config.js)
