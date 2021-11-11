# 总览

Vite 是一种新型前端构建工具，能够显著提升前端开发体验，它主要由两部分组成

- 一个开发服务器，它基于`原生 ES 模块`提供了丰富内建功能，如速度快到惊人的模块热更新(HMR)

- 一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化的静态资源

Vite 天然支持引入`.ts`文件，Vite 仅执行`.ts`文件的转译工作，并不执行任何类型检查。比假设类型检查
已经被你的 IDE 或构建过程接管了（你可以在构建脚本中运行`tsc --noEmit`或者安装`vue-tsc`然后运行`vue-tsc --noEmit`
来对你的`*.vue`文件做类型检查）

Vite 使用`esbuild`将 TypeScript 转译到 JavaScript，约是`tsc`速度的 20 ～ 30 倍

Vite 为 Vue 提供第一优先级支持

- Vue3 单文件组件支持`@vitejs/plugin-vue`

- Vue3 JSX 支持`@vitejs/plugin-vue-jsx`

## 命令行界面

安装了 Vite 的项目中，可以在 npm scripts 中使用`vite`可执行文件，或者直接使用
`npx vite`运行它

```json
{
  "scripts": {
    "dev": "vite", // 启动开发服务器
    "build": "vite build", // 为生产环境构建产物
    "serve": "vite preview" // 本地预览生产构建物
  }
}
```

## JSX

`.jsx`和`.tsx`文件同样开箱即用，JSX 的转译同样是通过`esbuild`，默认是 React16 风格

Vue 用户应该使用官方提供的`@vitejs/plugin-vue-jsx`插件，它提供了 Vue3 特性的支持，包括 HMR、
全局组件解析，指令和插槽

## CSS

导入`.css`文件将会把内容插入到`<style>`标签中，同时也带有 HMR 支持

**`@import`内联合变基**

Vite 通过`postcss-import`预配置支持了 CSS`@import`内联，Vite 的路径别名也遵从 CSS`@import`。
所有 CSS`url()`引用，即使导入的文件在不同的目录中，也总是自动变基以保证正确性

Sass 和 Less 文件也支持`@import`别名和 URL 变基

## CSS Modules

任何以`.module.css`为后缀名的 CSS 文件都被认为是一个`CSS Modules`文件。导入这样的文件会
返回一个相应的模块对象

```css
/* example.module.css */
.red {
  color: red;
}
```

```js
import classes from "./example.module.css";

document.getElementById("foo").className = classes.red;
```

## CSS 预处理

Vite 提供了对`.scss`、`.sass`、`.less`、`.styl`、`.stylus`文件的内置支持，必须安装相应的预处理依赖

```bash
# .scss and .sass

pnpm add --save-dev sass

# .less

pnpm install --save-dev less

# .styl and .stylus

pnpm install --save-dev stylus
```

Vite 为 Sass 和 Less 改进了`@import`解析，以保证 Vite 别名也能被使用，另外，`url()`
中的相对路径引用，与根文件不同目录中的 Sass/Less 文件会自动变基以保证正确性

## 静态资源处理

导入一个静态资源会返回解析后的 URL

```js
import imgUrl from "./img.png";
```

添加一些特殊的查询参数可以更改资源引入的方式

```js
// 显式加载资源为一个URL
import assertAsURL from "./asset.js?url";

// 以字符串形式加载资源
import assertAsString from "./shader.glsl?raw";

// 加载为web worker
import Worker from "./worker.js?worker";

// 在构建时web worker 内联为base64 字符串
import InlineWorker from "./worker.js?worker&inline";
```

## JSON

JSON 可以被直接导入，同样支持具名导入

```js
import json from "./example.json";

import { field } from "./example.json";
```

## Glob 导入

Vite 支持使用特殊的`import.meta.glob`函数从文件系统导入多个模块

```js
const modules = import.meta.glob(`./dir/*.js`);
```

以上将会被转译为下面的样子

```js
// vite 生成的代码
const modules = {
  "./dir/foo.js": () => import("./dir/foo.js"),
  "./dir/bar.js": () => import("./dir/bar.js"),
};
```

你可以遍历`modules`对象的 key 值来访问相应的模块

```js
for (const path in modules) {
  modules[path]().then((mod) => {
    console.log(path, mod);
  });
}
```

匹配到的文件默认是懒加载的，通过动态导入实现，并会在构建时分离为独立的 chunk。如果你倾向于
直接引入所有的模块，例如依赖于这些模块执行的副作用，可以使用`import.meta.globEager`

```js
const modules = import.meta.globEager("./dir/*.js");
```

会被转译为下面的样子

```js
import * as __glob__0_0 from "./dir/foo.js";
import * as __glob__0_1 from "./dir/bar.js";

const modules = {
  "./dir/foo.js": __glob__0_0,
  ".dir/bar.js": __glob__0_1,
};
```

## 构建优化

vite 会自动地将一个异步 chunk 模块中使用到的 CSS 代码抽取出来并为其生成一个单独的文件，
这个 CSS 文件将在该异步 chunk 加载完成时自动通过一个`<link>`标签载入，该异步 chunk 会保证
只在 CSS 加载完毕后再执行

如果你更倾向于将所有的 CSS 抽取到一个文件中，可以通过设置`build.cssCodeSplit`为`false`来禁用 CSS 代码分割

### 异步 Chunk 加载优化

例如 chunk`A`依赖 chunk`C`

在无优化的情况下，当异步 chunk`A`被导入时，浏览器将必须请求和解析`A`，然后它才清楚也需要 chunk`C`，
这会导致额外的网路往返

```
Entry --> A --> C
```

Vite 将使用一个预加载步骤自动重写代码，来分割动态导入调用，当`A`被请求时`C`也将被同时请求

```
Entry ---> (A + C)
```
