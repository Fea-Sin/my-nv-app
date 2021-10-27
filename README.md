# my-nv-app

Vue3 My-Next-Vue-App

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

## [vue 3](./docs/vue3/overview.md)

- [组合式 API](./docs/vue3/composition-api.md)

- [Setup](./docs/vue3/setup.md)

- [TypeScript 支持](./docs/vue3/vue-ts.md)

- [单文件组件 Setup](./docs/vue3/script-setup.md)

## 手把手写 Vue 单元测试

- [概述](./docs/test-unit/overview.md)

- [测试组件](./docs/test-unit/component-test.md)

- [起步](./docs/test-unit/start.md)

- [Wrapper 常用 API](./docs/test-unit/wrapper-api.md)

## 前置知识

- [Proxy 的应用](./package/start/docs/Proxy.md)

- [Vue2 与 Vue3 数据绑定之别](./package/start/docs/to-proxy.md)

- [基础数据结构](./package/start/docs/unit.md)

- [TypeScript 概述](./package/start-ts/docs/overview.md)

- [TypeScript 泛型](./package/start-ts/docs/genericity.md)

## Vue3 源码小解

- [目录结构](./package/vue-back/overview.md)

- [createApp](./package/vue-back/createApp.md)

- [defineComponent](./package/vue-back/defineComponent.md)

- [nextTick](./package/vue-back/nextTick.md)

### @vue/shared

- [extend](./package/shared/src/index.ts)

- [remove](./package/shared/src/index.ts)

- [hasOwn](./package/shared/src/index.ts)

- [isArray](./package/shared/src/index.ts)

- [isString](./package/shared/src/index.ts)

- [isFunction](./package/shared/src/index.ts)

- [isObject](./package/shared/src/index.ts)

- [isSymbol](./package/shared/src/index.ts)

- [isPromise](./package/shared/src/index.ts)

- [isPlainObject](./package/shared/src/index.ts)

- [isSet](./package/shared/src/index.ts)

- [isMap](./package/shared/src/index.ts)

已经发布为 npm 包，可以将公共 utils 抽离成包，项目开发时直接安装使用

[@nvapp/shared](https://www.npmjs.com/package/@nvapp/shared)

## Rollup

Rollup 统一了前端模块模式，`ES module`、`CommonJS`、`UMD`、`IIFE`、`AMD`

- browser 模式 `UMD`、`IIFE`、`AMD`

- node 模式 `CommonJS`、`UMD`

- ES module

在 ES module 中可以加载 CommonJS 模块，并可以打包生成 `ES module`、`CommonJS`、`UMD`、`IIFE`、`AMD` 中的任何一种模式

- [概述](./package/start-roll/docs/overview.md)

- [Rollup 配置](./package/start-roll/docs/config.md)

- [插件](./package/start-roll/docs/plugin-config.md)

- [Rollup Minify Bundle](./package/start-roll/docs/bundle-mini.md)

- [Rollup + Babel](./package/rollup-babel/docs/overview.md)

- [Rollup + Babel 插件](./package/rollup-babel/docs/plugin.md)

- [Rollup + TS](./package/rollup-typescript/docs/overview.md)

- [Rollup + Babel New](./package/shared-use/docs/overview.md)

## npm link

- [概述](./package/shared-use/docs/link.md)

## Run your unit tests

```
npm run test
```
