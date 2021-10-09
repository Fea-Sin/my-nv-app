# 组合式 API

## `setup` 组件选项

新的 `setup` 选项在组件创建之前执行，一旦 `props` 被解析，就将作为组合式 API 的入口

> 注意
>
> 在`setup`中你应该避免使用`this`，因为它不会找到组件实例
> `setup`的调用发生在`data`property、`computed`property、`methods`被解析之前
> 所以它们无法在`setup`中被获取

`setup`选项是一个接收`props`和`context`的函数，此外，我们将`setup`返回的所有内容都暴露给
组件的其余部分（计算属性、方法、声明周期钩子等等）以及组件的模版

## 带 `ref` 的响应式变量

在 Vue3 中，我们可以通过一个新的`ref`函数使任何响应式变量在任何地方起作用

```js
import { ref } from "vue";

const counter = ref(0);
```

`ref`接收参数并将其包裹在一个带有`value`property 的对象中返回，然后可以使用该 property 访问
或更改响应式变量的值

将值封装在一个对象中，看似没有必要，但为了保持 JavaScript 中不同数据类型的行为统一，因为在 JavaScript 中，
`Number`或`String`等基本类型是通过值而非引用传递的

> 提示
>
> `ref`为我们的值创建了一个**响应式引用**。在整个组合式 API 中经常使用**引用**的概念

## 在`setup`内注册声明周期钩子

组合式 API 的功能和选项式 API 一样完整，组合式 API 上的生命周期钩子与选项式 API 的名称相同，
但前缀为`on`，`mounted`是`onMounted`

这些函数接受一个回调，当钩子被调用时，该回调将被执行

## `watch`响应式更改

就像我们在组件中使用`watch`选项并在 property 上设置侦听器一样，我们可以使用从 Vue
导入的`watch`函数执行相同的操作。它接受 3 个参数

- 一个想要侦听的响应式引用或 getter 函数

- 一个回调

- 可选的配置选项

```vue
<script setup>
import { ref, watch } from "vue";
const counter = ref(0);

watch(counter, (newValue, oldValue) => {
  console.log("The new counter value is: " + counter.value);
});
</script>
```

**等效的选项式 API**

```js
export default {
  data() {
    return {
      counter: 0,
    };
  },
  watch: {
    counter(newValue, oldValue) {
      console.log("The new counter value is: " + this.counter);
    },
  },
};
```

## 独立的`computed`属性

与`ref`和`watch`类似，也可以使用从 Vue 导入的`computed`函数在 Vue 组件外部创建计算属性。
`computed`的第一个参数，它是一个类似 getter 的回调函数，输出的是一个只读的**响应式引用**。
为了访问新创建的计算变量的 value，我们需要像`ref`一样使用`.value`property
