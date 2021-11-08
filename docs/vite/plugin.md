# 使用插件

Vite 可以使用插件进行扩展，这得益于 Rollup 优秀的插件接口设计和一部分 Vite 独有的额外选项。
这意味着 Vite 用户可以利用 Rollup 插件的强大生态系统，同时根据需要也能够扩展开发服务器和 SSR 功能

## 添加一个插件

若要使用一个插件，需要将它添加到项目的`devDependencies`并在`vite.config.js`配置文件中的
`plugins`数组中引入它

```bash
pnpm add --save-dev @vitejs/plugin-legacy
```

```js
import legacy from "@vitejs/plugin-legacy";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
});
```

## 按需应用

默认情况下插件在开发（serve）和生产（build）模式中都会调用，如果插件在服务或构建期间
按需使用，请使用`apply`属性指明它们仅在`build`或`serve`模式时调用

```js
import typescript2 from "rollup-plugin-typescript2";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      ...typescript2(),
      apply: "build",
    },
  ],
});
```
