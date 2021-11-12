# Props

## 单向数据流

所有的 prop 都使得其父子 prop 之间形成一个**单向下行绑定**，父级 prop 的更新会向下流动到子组件中，
但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解

每次父级组件发生变更时，所有子组件中对应的 prop 都会刷新为最新的值。你不应该在一个子组件中改变
prop，如果你这样做了，Vue 会在控制台发出警告

**这里有两种常见的试图变更 prop 的情形**

- prop 用来传递一个初始值，子组件希望将其作为一个本地的 prop 数据使用。这种情况下，最好定义一个本地 data property
  并将这个 prop 作为其初始值

```js
props: {
  initialCounter: Number,
}
data() {
  return {
    counter: this.initialCounter
  }
}
```

- prop 以一种原始值传入，且需要进行转换。这种情况下，最好使用这个 prop 的值来定义一个计算属性

```js
props: {
  size: String,
}
computed: {
  standardSize() {
    return this.size.trim().toLowerCase()
  }
}
```

> 提示
> 在 JavaScript 中对象或数组是引用数据，所以对于一个数组或对象类型的 prop，
> 在子组件中改变这个 prop 值将会影响到父级组件的状态

## Prop 验证

我们可以为组件的 prop 指定验证要求，例如类型。如果需求没有被满足，则 Vue 会在控制台警告你，这在开发一个
会被别人用到的组件时尤其有帮助

`null`和`undefined`会通过任何类型验证

```js
app.component("my-component", {
  props: {
    propA: Number,

    // 多个可能的类型
    propB: [String, Number],

    // 必填的字段
    propC: {
      type: String,
      require: true,
    },

    // 带有默认值，基本值
    propD: {
      type: Number,
      default: 10,
    },

    // 带有默认值，引用值
    propE: {
      type: Object,
      default() {
        return { message: "hi" };
      },
    },

    // 自定义验证函数
    propF: {
      validator(value) {
        return ["success", "warning", "danger"].includes(value);
      },
    },

    // 具有默认值的函数
    propG: {
      type: Function,
      default() {
        return "Default function";
      },
    },
  },
});
```

> 提示，prop 会在一个组件实例创建之前进行验证

### 类型检查

`type`可以是下列原生构造函数中的一个

- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol

此外，`type`还可以是一个自定义的构造函数，并且通过`instanceof`来进行检查确认

```js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
```

使用方式

```js
props: {
  author: Person,
}
```
