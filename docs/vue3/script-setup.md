# 单文件组件`<script setup>`

`<script setup>`是在单文件组件（SFC）中使用组合式 API 的编译时语法糖。相比于普通的
`<script>`语法，它具有更多优势

- 更少的样板内容，更简洁的代码

- 能够使用纯 TypeScript 声明 props 和抛出事件

- 更好的运行时性能（其模版会被编译成与其同一作用域的渲染函数，没有任何的中间代理）

```vue
<script setup>
console.log("hello script setup");
</script>
```

`<script setup>`里面的代码会被编译成组件`setup()`函数的内容。这意味着与普通的`<script>`只
在组件被首次引入的时候执行一次不同，`<script setup>`中的代码会在**每次组件实例被创建的时候执行**

## 顶层的绑定会被暴露给模版

任何在`<script setup>`声明的顶层绑定（包括变量、函数声明以及 import 引入的内容）都能在模版
中直接使用

```vue
<script setup>
const msg = "Hello";

function log() {
  console.log(msg);
}
</script>
<template>
  <div @click="log">{{ msg }}</div>
</template>
```

import 导入的内容也会以同样的方式暴露。意味着可以在模版表达式中直接使用导入的 helper 函数，
 并不需要通过`methods`选项来暴露它

```vue
<script setup>
import { capitalize } from "./helpers";
</script>
<template>
  <div>{{ capitalize("hello") }}</div>
</template>
```

## 响应式

响应式状态需要明确使用响应式 API 来创建，和从`setup()`函数中返回值一样，ref 值在模版中使用
的时候会自动解包

## 使用组件

`<script setup>`范围里的值也能被直接作为自定义组件的标签名使用

```vue
<script setup>
import MyComponent from "./MyComponent";
</script>
<template>
  <MyComponent />
</template>
```
