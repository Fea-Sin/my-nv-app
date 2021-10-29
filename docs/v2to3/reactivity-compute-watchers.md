# 响应式 计算 和 侦听

有时我们需要依赖于其它状态的状态，在 Vue 中这是用组件计算属性处理的。我们也可以
用`computed`直接创建计算值，它接收 getter 函数，getter 函数返回一个不可变的响应式 ref

```js
import { computed } from "vue";

const count = ref(1);
const plusCount = computed(() => count.value + 1);

console.log(plusCount.value); // 2

// 其值不可改变
plusCount.value++; // Error
```

也可以使用一个带有`get`和`set`函数的对象来创建一个可写的 ref 对象

```js
const count = ref(1);
const plusCount = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1;
  },
});

plusCount.value = 100;
console.log(count.value); // 99
```

## watchEffect

为了根据响应式状态**自动应用**副作用，我们可以使用`watchEffect`函数，它立即执行传入的一个函数，
同时响应式追踪其依赖，并在其依赖变更时重新运行该函数

```js
import { watchEffect } from "vue";

const count = ref(3);
watchEffect(() => console.log("watchEffect: ", count.value));

count.value++;
// watchEffect: 4
```

### 停止侦听

当`watchEffect`在组件的`setup()`函数或**生命周期钩子**被调用时，侦听器会被链接到该组件的生命周期，
并在组件卸载时自动停止

在一些情况下，也可以显式调用返回值以停止侦听

```js
const stop = watchEffect(() => {
  // ...
});

// later
stop();
```

### 清除副作用

有时副作用函数会执行一些异步的副作用，这些响应需要在其失效时清除（例如，在异步副作用完成之前，状态又改变了），
所以侦听副作用传入的函数可以接收一个`onInvalidate`函数作为参数，用来清理失效的回调。

当以下情况发生时，这个清理回调会被触发

- 副作用即将重新执行时

- 侦听器被停止（如在`setup()`或生命周期钩子函数中使用了`watchEffect`，当组件卸载时）

```js
watchEffect((onInvalidate) => {
  const token = performAsyncOperation(id.value);

  // 当id已经改变或watcher已经停止
  // 当前 pending 的异步任务会被终止
  onInvalidate(() => {
    token.cancel();
  });
});
```

我们之所以是通过传入一个函数去注册失效回调，而不是从回调返回它，是因为返回值对于异步错误处理很重要

副作用函数执行数据请求时

```js
const data = ref(null);

watchEffect(async (onInvalidate) => {
  onInvalidate(() => {
    // ...
  });
  // 我们在Promise解析之前注册清除函数
  data.value = await fetchData(props.id);
});
```

我们知道异步函数都会隐式地返回一个 Promise，但是清理函数必须要在 Promise 被 resolve 之前被注册

### 副作用调用机制

Vue 的响应性系统会缓存副作用函数，并异步地执行它们，这样可以避免同一个`tick`中多个状态改变导致的不必要
的重复调用。在核心的具体实现中，组件的`update`函数也是一个被侦听的副作用，当一个用户定义的副作用函数
进入队列时，默认情况下会在所有组件`update`**前**执行

如果需要在组件更新**后**调用侦听器副作用，我们可以传递带有`flush`选项的附加`options`对象（默认是`pre`）

```js
// 在组件更新后触发，这样你就可以访问更新的DOM
// 注意，这也将推迟副作用的初始运行，直到组件的首次渲染完成
watchEffect(
  () => {
    // ...
  },
  {
    flush: "post",
  }
);
```

`flush`选项还接受`sync`，这将强制效果同步触发，这是低效的，应该很少需要

## watch

`watch` API 完全等同于组件侦听器属性，`watch`需要侦听特定的数据源，并在回调函数中执行副作用。
默认情况下，它是惰性的，即只有被侦听的源发生变化时才执行回调

与`watchEffect`相比，`watch`允许我们：

- 懒执行副作用

- 更具体地说明什么状态应该触发侦听器重新运行

- 访问侦听状态变化前后的值

### 侦听单个数据源

侦听器数据源可以是返回值的 getter 函数，也可以直接是`ref`

```js
// 侦听一个getter
const state = reactive({ count: 0 });

watch(
  () => state.count,
  (count, preCount) => {
    // ...
  }
);

// 直接侦听ref
const count = ref(0);
watch(count, (count, preCount) => {
  // ...
});
```

### 侦听器多个数据源

侦听器还可以使用数组同时侦听多个源

```js
const firstName = ref("");
const lastName = ref("");

watch([firstName, lastName], (newValues, preValues) => {
  console.log(newValues, preValues);
});

firstName.value = "John"; // ["John", ""], ["", ""]
lastName.value = "Smith"; // ["John", "Smith"], ["John", ""]
```

在同一个函数里如果同时改变侦听来源，侦听器仍只会执行一次

```js
const changeValues = () => {
  firstName.value = "John";
  lastName.value = "Smith";
};

// ["John", "Smith"], ["", ""]
```

> 多个同步更改只会触发一次侦听器

我们可以用`nextTick`调整侦听副作用执行

```js
import { nextTick } from "vue";

const changeValues = async () => {
  firsName.value = "John"; // ["John", ""], ["", ""]
  await nextTick();
  lastName.value = "Smith"; // ["John", "Smith"], ["John", ""]
};
```

### 侦听响应式对象

使用侦听器来比较一个数组或对象的值，这些值是响应式的，要求它有一个由值构成的副本

```js
import { reactive, watch } from "vue";

const numbers = reactive([1, 2, 3, 4]);

watch(
  () => [...numbers],
  (numbers, preNumbers) => {
    console.log(numbers, preNumbers);
  }
);

numbers.push(5); // [1, 2, 3, 4], [1, 2, 3, 4, 5]
```

尝试检查深度嵌套对象或数组中的 property 变化时，需要将`deep`选项设置为 true

[实例](../../src/views/TestH.vue)

然而，侦听一个响应式对象或数组将返回该对象当前值和上一个状态值的引用，为了获取完全的
对比差异，需要对值进行深度拷贝，可以通过`lodash.cloneDeep()`实现

### 与 watchEffect 共享的行为

`watch`与`watchEffect`共享**停止侦听**、**清除副作用**相应的`onInvalidate`
会作为回调的第三个参数传入，**副作用调用机制**和**侦听调试**
