# 构建生产版本

当需要将应用部署到生产环境时，只需要运行`vite build`命令。默认情况下，它使用
`<root>/index.html`作为其构建入口点，并生成能够静态部署的应用程序包

## 浏览器兼容性

用于生产环境的构建包会假设目标浏览器支持现代 JavaScript 语法。默认情况下，Vite 的目标
浏览器是指能够`支持原生ESM script`标签和`支持原生ESM动态导入`的

你也可以通过`build.target`配置项指定构建目标，最低支持`es2015`

默认情况下 Vite 只处理语法转译，且默认不包含任何 polyfill。

传统浏览器可以通过插件`@vitejs/plugin-legacy`来支持，它将自动生成传统版本的 chunk 及
与其相对应 ES 语言特性方面的 polyfill。兼容版的 chunk 只会在不支持原生 ESM 的浏览器中
进行按需加载

## 公共基础路径

如果你需要在嵌套的公共路径下部署项目，只需指定`base`配置项，然后所有资源的路径都将据此配置
重写，这个选项也可以通过命令参数指定，例如`vite build --base=/my/public/path/`。
由 js 引入的资源 URL，CSS 中的`url()`引用以及`.html`文件中引用的资源在构建过程中都会
自动调整，以适配此选项

当然，情况也有例外，当访问过程中需要使用动态链接的 url 时，可以使用全局注入的`import.meta.env.BASE_URL`变量，它的值为公共基础路径。这个变量在构建时会被静态替换，它必须是按`import.meta.env.BASE_URL`原样出现

## 多页面应用模式

假设你有下面这样的项目文件结构

```
 |-- package.json
 |-- vite.config.js
 |-- index.html
 |-- main.js
 |-- nested
       |-- index.html
       |-- nested.js
```

在开发过程中，简单地导航或链接到`/nested/`将会按预期工作，与正常的静态文件服务器表现一致

在构建过程中，只需要指定多个`.html`文件作为入口即可

```js
// vite.config.js

const { resolve } = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        nested: resolve(__dirname, "nested/index.html"),
      },
    },
  },
});
```

## 库模式

当你开发面向浏览器的库时，Vite 可以使用`index.html`获取如丝般顺滑的开发体验

当这个库要进行发布构建时，请使用`build.lib`配置项，以确保将那些你不想打包进库
的依赖进行外部化处理，例如`vue`或`react`

```js
// vite.config.js
const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/main.js"),
      name: "MyLib",
      fileName: (format) => `my-lib.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
```

使用如上配置运行`vite build`时，将会使用一套面向库的 Rollup 预设，并且将为
该库提供两种构建格式`es`和`umd`

推荐在你库的`package.json`中使用如下格式

```json
{
  "name": "my-lib",
  "files": ["dist"],
  "main": "./dist/my-lib.umd.js",
  "module": "./dist/my-lib.es.js",
  "exports": {
    ".": {
      "import": "./dist/my-lib.es.js",
      "require": "./dist/my-lib.umd.js"
    }
  }
}
```
