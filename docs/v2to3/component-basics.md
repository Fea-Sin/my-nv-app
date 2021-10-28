# 组件基础

## 基本实例

这里是一个 Vue 组件的示例

```js
// 创建一个Vue应用
const app = Vue.createApp({});

// 在应用中定义一个 button-counter 全局组件
app.component("button-counter", {
  data() {
    return {
      count: 1,
    };
  },
  template: `
    <button @click="count++">
      You clicked {{ count }}  times
    </button>
  `,
});
```

我们可以把这个组件作为一个自定义元素使用

```html
<div id="components-demo">
  <button-counter />
</div>
```

挂载应用实例

```js
app.mount("#components-demo");
```

[实例](../../package/components-demo/src/main.js)
