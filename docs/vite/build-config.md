# 构建选项

## build.target

- 类型: `string | string[]`
- 默认: `modules`

设置最终构建的浏览器兼容目标，默认值是一个 Vite 特有的值`modules`，这是指`支持原生ES模块的浏览器`

另一个特殊的值是`esnext`，即假设有原生动态导入支持，并且将会转译得尽可能小

转换过程将会由`esbuild`执行，并且此值应该是一个合法的`esbuild目标选项`，自定义目标也可以是一个 ES 版本（例如`es2015`），
一个浏览器版本（例如`chrome58`）或是多个目标组成的一个数组

注意，如果代码包含不能被`esbuild`安全地编译的特性，那么构建将会失败

## build.polyfillModulePreload

- 类型: `boolean`
- 默认值: `true`

用于决定是否自动注入`module preload 的polyfill`

如果设置为`true`，此 polyfill 会被自动注入到每个`index.html`入口的 proxy 模块中。
如果是通过`build.rollupOptions.input`将构建配置为使用非 html 的自定义入口，那么则需要在你自定义
入口中手动引入 polyfill

```js
import "vite/modulepreload-polyfill";
```

> 注意，此 polyfill 不适用于`Library模式`。如果你需要支持不支持动态引入的浏览器，你应该避免在你的
> 库中使用此选项

## build.outDir

- 类型: `string`
- 默认值: `dist`

指定输出路径，相对于项目根目录

## build.assetsDir

- 类型: `string`
- 默认值: `assets`

指定生成静态资源的存放路径（相对于`build.outDir`）

## build.assetsInlineLimit

- 类型: `number`
- 默认值: `4096`(4kb)

小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为`0`可以完全
禁用此项

> 注意，如果你指定了`build.lib`，那么`build.assetsInlineLimit`将被忽略，无论文件大小资源都
> 会被内联

## build.cssCodeSplit

- 类型: `boolean`
- 默认值: `true`

启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在
其被加载时插入

如果禁用，整个项目中的所有 CSS 将被提到一个 CSS 文件中

> 注意
> 如果指定了`build.lib`，`build.cssCodeSplit`会默认为`false`

## build.cssTarget

- 类型: `string | string[]`
- 默认值: 与`build.target`一致

次选项允许用户为 CSS 的压缩设置一个不同的浏览器 target，此处的 target 并非是用于 JavaScript 转写目标

应只在针对非主流浏览器时使用。最直观的示例是当你要兼容的场景时安卓微信中的`webview`时，它支持大多数现代的
JavaScript 功能，但并不支持 CSS 中的`#RGBA`十六进制颜色符号。这种情况下，你需要将`build.cssTarget`
设置为`chrome61`以防止 vite 将`rgba()`颜色转化为`#RGBA`十六进制符号的形式
