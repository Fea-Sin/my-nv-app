# Setup

使用`setup`函数时，它将接收两个参数

1. `props`

1. `context`

## 访问组件的 property

执行`setup`时，组件实例尚未被创建。因此，你只能访问以下 property

- `props`

- `attrs`

- `slots`

- `emit`

你将无法访问以下组件选项

- `data`

- `computed`

- `methods`

## 结合模版使用

如果`setup`返回一个对象，那么该对象的 property 以及传递给`setup`的`props`
参数中的 property 就都可以在模版中访问到

## 使用渲染函数

`setup`还可以返回一个渲染函数，该函数可以直接使用在同一作用域中声明的响应式状态

```js
import { h, ref, reactive } from "vue";

export default {
  setup() {
    const readersNumber = ref(0);
    const book = reactive({ title: "Vue 3 Guide" });

    // 这里需要使用ref的value
    return () => h("div", [readersNumber.value, book.title]);
  },
};
```
