# 应用配置

每个 Vue 应用都会暴露一个`config`对象，该对象包含此应用的配置设置

```js
const app = createApp({});

console.log(app.config);
```

## globalProperties

类型： `[key: string]: any`

用法：

```js
app.config.globalProperties.foo = "bar";

app.component("my-component", {
  mounted() {
    console.log(this.foo); // "bar"
  },
});
```

添加一个可以在应用的任何组件实例中访问的全局 property。组件的 property 在命名冲突具有优先权。

### 与 Vue2 对比

```js
// Vue2
Vue.prototype.$http = () => {};

// Vue3
const app = createApp({});
app.config.globalProperties.$http = () => {};
```
