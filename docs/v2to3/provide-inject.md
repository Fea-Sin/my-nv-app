# Provide / Inject

通常，我们需要从父组件向子组件传递数据时，我们使用`props`。有一些深度嵌套的组件，
而深层的子组件只需要父组件的部分内容。这种情况下，如果仍热将 prop 沿着组件链逐级传递
下去，会很麻烦

对于这种情况，我们可以使用一对`provide`和`inject`。无论组件层次结构有多深，父组件都可以将
数据传给子组件。这个特性有两个部分：父组件`provide`选项提供数据，子组件`inject`选项来使用这些数据

但是，如果我们尝试 provide 一些组件的实例 property，如下是不起作用的

```js
app.component("todo-list", {
  data() {
    return {
      todos: ["Feed a cat", "Buy tickets"],
    };
  },
  provide: {
    todoLength: this.todos.length,
  },
});
```

要访问组件实例 property，我们需要将`provide`转换为返回对象的函数

```js
app.component("todo-list", {
  data() {
    return {
      todos: ["Feed a cat", "Buy tickets"],
    };
  },
  provide() {
    return {
      todoLength: this.todos.length,
    };
  },
});
```

实际上，可以将依赖注入看作`long range props`，与`props`的不同点是

1. 父组件不需要知道哪些子组件使用它的 provide 的 property

1. 子组件不需要知道 inject 的 property 来自哪里

## 处理响应性
