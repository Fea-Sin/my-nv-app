# 测试单文件组件

Vue 的单文件组件在它们运行于 Node 或浏览器之前是需要预编译的。我们推荐两种方式完成编译：通过
一个 Jest 预编译器，或直接使用 webpack

`vue-jest`预处理器支持基本的单文件组件功能，但是目前还不能处理样式和自定义块，这些都只在`vue-loader`
中支持。如果你依赖这些功能或其它 webpack 特有的配置项，那么你需要基于 webpack + vue-loader 进行设置

## 用 Mocha 和 webpack 测试单文件组件

通过 webpack 编译所有的测试文件然后在测试运行器中运行，这样做的好处是可以完全支持所有 webpack 和 vue-loader
的功能，所以我们不必对我们的源代码做任何妥协

## 用 Karma 测试单文件组件

Karma 是一个启动浏览器运行测试并生成报告的测试运行器，我们会使用 Mocha 框架撰写测试，同时使用
Chai 作为断言库

Chai 是一个流行的常配合 Mocha 使用的断言库

### 覆盖率

我们可以使用`karma-coverage`插件来设置 Karma 的代码覆盖率

默认情况下，`karma-coverage`不会使用 source map 来对照覆盖率报告。我们需要使用`babel-plugin-istanbul`
来确认正确的覆盖率

我们会使用`cross-env`来设置一个`NODE_ENV`环境变量，这样我们就可以在编译测试的时候使用`babel-plugin-istanbul`
因为我们不想在生产环境下引入`babel-plugin-istanbul`

配置`.babelrc`文件的环境变量

```json
{
  "presets": [["env", { "modules": false }], "stage-3"],
  "env": {
    "test": {
      "plugins": ["istanbul"]
    }
  }
}
```

## 不经过构建而使用

我们习惯于使用工具，诸如 webpack 打包 Vue 应用、Vue Loader 处理单文件组件。使用 Vue Test Utils
其实不需要引入这么多，使用 Vue Test Utils 最低要求是

- Vue

- vue-template-compiler

- DOM（可以在 Node 环境下的 jsdom 或真实浏览器）
