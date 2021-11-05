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

Vite 提供了对`.scss`、`.sass`、`.less`、`.styl`、`.stylus`文件的内置支持，必须按转相应的预处理依赖

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
