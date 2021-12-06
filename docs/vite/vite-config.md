# 配置 Vite

## 配置文件解析

当以命令方式运行`vite`时，Vite 会自动解析项目根目录下名为`vite.config.js`的文件
最基础的配置文件是这样的

```js
// vite.config.js
export default {
  // 配置项
};
```

注意，即使项目没有在`package.json`中开启`type: "module"`，Vite 也支持在配置文件中使用 ESM 语法。
这种情况下，配置文件会在被加载前自动进行预处理

可以显式地通过`--config`命令行选项指定一个配置文件，相对于`cwd`路径进行解析

Vite 也直接支持 TS 配置文件。你可以在`vite.config.ts`中使用`defineConfig`工具函数

## 情景配置

如果配置文件需要基于（`dev`或`build`）命令或者不同的`模式`来决定选项，则可以选择导出一个函数

```js
export default defineConfig(({ command, mode }) => {
  if (command === "serve") {
    return {
      // dev 独有配置
    };
  } else {
    // command === "build"
    return {
      // build 独有配置
    };
  }
});
```

需要注意的是，在 Vite 的 API 在开发环境下`command`的值为`serve`(在 CLI 中，`vite dev`和`vite serve` 是 vite 的别名)，
而在开发环境下为`build`(vite build)
