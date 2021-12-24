# 插件开发

Rollup 插件是一个对象，对象包含一个或多个属性、`build hooks`、`output generation hooks`。
开发插件通常遵循一些规范，一个插件应当被分发为 package，package 应当 exports 一个 function
被 plugin 特定的`options` 调用，并返回一个对象

插件允许你修改 Rollup 的行为，例如在打包之前编译代码，或者在`node_modules`中找到特定的第三方模块等

## 约定规范

- 插件应当有一个明确的`name`，且以`rollup-plugin-`前缀

- 在`package.json`的 keyword 中指定`rollup-plugin`

- 插件应当被充分测试

- 优先使用 asynchronous 方法

- 写说明文档

- 确保你的插件 outputs correct source mappiings

示例

```js
// rollup-plugin-my-example
export default function myExample() {
  return {
    // this name will show up in warning and errors
    name: "my-example",
    resolveId(source) {
      if (source === "virtual-module") {
        // this signals that rollup should not ask other plugins or check the file system to find this id
        return source;
      }
      // other ids should be handled as usually
      return null;
    },
    load(id) {
      if (id === "virtual-module") {
        return "export default 'This is virtual!'";
      }
      // other ids should be handled as usually
      return null;
    },
  };
}
```

```js
// rollup.config.js
import myExample from "./rollup-plugin-my-example.js";

export default {
  input: "virtual-module",
  plugins: [myExample()],
  output: [
    {
      file: "bundle.js",
      format: "es",
    },
  ],
};
```

## 插件实例

- [only-default-for-entry](../../rollup-plugin/rollup.config.js)

- [augment-with-date](../../rollup-plugin/plugin/augment-with-date.js)

- [build-for-end](../../rollup-plugin/plugin/build-end.js)

- [svgResolverPlugin](../../rollup-plugin/plugin/svg-resolver-plugin.js)
