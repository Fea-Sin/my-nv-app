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

## [手把手写 Vue 单元测试](./docs/test-unit/test-unit.md)

## [前置知识](./package/start/docs/start.md)

## [Vue3 源码小解](./package/vue-back/vue-back.md)

### @vue/shared

- [@vue/shared](./package/shared/docs/overview.md)

已经发布为 npm 包，可以将公共 utils 抽离成包，项目开发时直接安装使用

[@nvapp/shared](https://www.npmjs.com/package/@nvapp/shared)

## [Rollup](./package/start-roll/docs/start-roll.md)

Rollup 统一了前端模块模式，`ES module`、`CommonJS`、`UMD`、`IIFE`、`AMD`

- browser 模式 `UMD`、`IIFE`、`AMD`

- node 模式 `CommonJS`、`UMD`

- ES module

在 ES module 中可以加载 CommonJS 模块，并可以打包生成 `ES module`、`CommonJS`、`UMD`、`IIFE`、`AMD` 中的任何一种模式

## npm link

- [概述](./package/shared-use/docs/link.md)

## [Vue2 => Vue3](./docs/v2to3/v2to3.md)

## [pnpm](./docs/pnpm/pnpm.md)

## [Vite](./docs/vite/vite.md)

## Lint

- [概述](./docs/lint/overview.md)

## [Jest](./docs/jest/jest.md)

## VitePress

- [实例](./package/press)

## [Gulp 深入工作流](./package/start-gulp/docs/overview.md)

## [esbuild](./package/start-esbuild/docs/overview.md)

## Run your unit tests

```
pnpm run test -r
```
