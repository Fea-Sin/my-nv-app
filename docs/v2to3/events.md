# 自定义事件

可以通过`emits`选项在组件上定义发出的事件，建议定义所有发出的事件，一便
更好地记录组件应该如何工作

当在`emits`选项中定义了原生事件(如`click`)时，将使用组件中的事件替代原生事件侦听器

```js
app.component("custom-form", {
  emits: ["inFocus", "submit"],
});
```

## 验证发出的事件

与 prop 类型验证类似，如果使用对象语法而不是数组语法定义发出的事件，要添加验证，
为事件分配一个函数，该函数接收传递给`$emit`调用的参数，比返回一个布尔值以指示事件是否有效

```js
app.component("custom-form", {
  emits: {
    // 没有验证
    click: null,
    submit: ({ email, password }) => {
      if (email && password) {
        return true;
      } else {
        console.warn("Invalid submit event payload!");
        return false;
      }
    },
  },
  methods: {
    submitForm(email, passworld) {
      this.$emit("submit", { email, password });
    },
  },
});
```

## v-model 参数

默认情况下，组件上的`v-model`使用`modelValue`作为 prop 和 `update:modelValue`作为事件。
我们可以通过向`v-model`传递参数来修改这些名称

双向绑定

```js
<my-component v-model:title="bookTitle"></my-component>
```

子组件只需要一个`title` prop 并发出`update:title`同步事件

```js
app.component("my-component", {
  props: {
    title: String,
  },
  emits: ["update:titles"],
  template: `
    <input type="text" :value="title" @input="$emit('update:title', $event.target.value)" />
  `,
});
```

## 多个`v-model`绑定

通过利用特定 prop 和 事件 的能力，我们可以在单个组件实例上创建多个`v-model`绑定，每个
v-model 将同步到不同的 prop

```js
<user-name
  v-model:first-name="firstName"
  v-model:last-name="lastName"></user-name>
```

```js
app.component("user-name", {
  props: {
    firstName: String,
    lastName: String,
  },
  emits: ["update:firstName", "update:lastName"],
  template: `
    <input type="text" :value="firstName" @input="$emit('update:firstName', $event.target.value)" />

    <input type="text" :value="lastName" @input="$emit('update:lastName', $event.target.value)" />
  `,
});
```
