# 组件注册

## 全局注册

```js
Vue.createApp({}).component("my-component-name", {
  /* ...选项... */
});
```

全局注册之后，可以将组件用在任何新创建的组件实例的模版中

## 局部注册

全局注册有时候不够理想

我们可以通过一个普通的 JavaScript 对象来定义组件

```js
const ComponentA = {
  // 选项
};
const ComponentB = {
  // 选项
};

const app = Vue.createApp({
  components: {
    "component-a": ComponentA,
    "component-b": ComponentB,
  },
  // 其它选项
});
```

`components`对象中的每个 property，其 property 名就是自定义元素的名字，值就是这个组件的
选项对象

> 注意
> 局部注册的组件在其子组件中不可用
> 如果希望`ComponentA`在`ComponentB`中可用，需要在`CompoentB`中注册，如下所示

```js
const ComponentA = {};

const ComponentB = {
  components: {
    "component-a": ComponentA,
  },
};
```

如果使用 webpack 工程化开发方式

```js
import ComponentA from "./ComponentA.vue";

export default {
  components: {
    ComponentA,
  },
};
```
