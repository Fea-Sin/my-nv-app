# TypeScript 支持

随着应用的增长，静态类型系统可以帮助防止许多潜在的运行时错误

将组件的`script`部分将语言设置为 TypeScript

```vue
<script lang="ts"></script>
```

如果你想将 TypeScript 与 `render`函数结合起来

```vue
<script lang="tsx"></script>
```

## 定义 Vue 组件

要让 TypeScript 正确推断 Vue 组件选项中的类型，需要使用`defineComponent`全局
方法定义组件

```vue
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  // 已开启类型推断
});
</script>
```

对于**复杂的类型或接口**，可以使用`type assertion`对其进行指明

```ts
interface Book {
  title: string;
  author: string;
  year: number;
}

const Component = defineComponent({
  data() {
    return {
      book: {
        title: "Vue 3 Guide",
        author: "Vue Team",
        year: "2020",
      } as Book,
    };
  },
});
```

### 注解返回类型

由于 Vue 声明文件的循环特性，TypeScript 可能难以推断 computed 的类型。因此，你需要注解计算
属性的返回类型

```ts
import { defineComponent } from "vue";

const Component = defineComponent({
  data() {
    return {
      message: "Hello",
    };
  },
  computed: {
    // 需要注解
    greeting(): string {
      return this.message + "!";
    },

    // 在使用setter进行计算时，需要对getter进行注解
    greetingUppercased: {
      get() {
        return this.greeting.toUpperCase();
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase();
      },
    },
  },
});
```

### 注解 Props

Vue 对定义了`type`的 prop 执行运行时验证。要将这些类型提供给 TypeScript，我们需要使用`PropType`
指明构造函数

```ts
import { defineComponent, PropType } from "vue";

interface Book {
  title: string;
  author: string;
  year: number;
}

const Component = defineComponent({
  props: {
    name: String,
    id: [Number, String],
    callback: {
      type: Function as PropType<() => void>,
    },
    book: {
      type: Object as PropType<Book>,
      required: true,
    },
    metadata: {
      type: null, // metadata 的类型是 any
    },
  },
});
```

> 注意
>
> 由于 TypeScript 中的设计限制，当它涉及到为了对函数表达式进行类型推理，你必须注意对象
> 和数组的`validator`和`default`值

```ts
import { defineComponent, PropType } from "vue";

interface Book {
  title: string;
  year?: number;
}

const Component = defineComponent({
  props: {
    bookA: {
      type: Object as PropType<Book>,
      // 请务必使用箭头函数
      default: () => ({
        title: "Arrow Function Expression",
      }),
      validator: (book: Book) => !!book.title,
    },
  },
});
```

### 注解 emit

我们可以为触发的事件注解一个有效载荷。另外，所有未声明的触发事件在调用时都会抛出一个类型错误

```ts
const Component = defineComponent({
  emits: {
    addBook(payload: { bookName: string }) {
      // perform runtime 验证
      return payload.bookName.length > 0;
    },
  },
  methods: {
    onSubmit() {
      this.$emit("addBook", {
        bookName: 123, // 类型错误
      });
      this.$emit("non-declared-event"); // 类型错误
    },
  },
});
```

### 与组合式 API 一起使用

在`setup()`函数中，不需要将类型传递给`props`参数，因为它将从`props`组件选项推断类型

```ts
import {} from "vue";

const Component = defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const result = props.message.split(""); // 正确 'message' 被声明为字符串
  },
});
```

### 类型声明 `refs`

Refs 根据初始值推断类型。有时我们可能需要为 ref 的内部值指定复杂类型，我们可以在调用
ref 重写默认推理时简单地传递一个泛型参数

```ts
const year = ref<string | number>("2020");

year.value = 2021; // ok
```

> TIP
>
> 如果泛型的类型未知，建议将`ref`转换为`Ref<T>`

### 类型声明 `reactive`

当声明类型`reactive`property，我们可以使用接口

```ts
import { defineComponent, reactive } from "vue";

interface Book {
  title: string;
  year?: number;
}

export default defineComponent({
  name: "HelloWorld",
  setup() {
    const book = reactive<Book>({ title: "Vue 3 Guide" });
    // or
    const book: Book = reactive({ title: "Vue 3 Guide" });
    // or
    const book = reactive({ title: "Vue 3 Guide" }) as Book;
  },
});
```

### 类型声明 `computed`

计算值将根据返回值自动推断类型

```ts
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "CounterButton",
  setup() {
    let count = ref(0);

    // 只读
    const doubleCount = computed(() => count.value * 2);

    const result = doubleCount.value.split(""); // Property 'split' does not exist on type 'number'
  },
});
```

### 为事件处理器添加类型

在处理原生 DOM 事件的时候，正确地为处理函数的参数添加类型会是有用的

```vue
<template>
  <input type="text" @change="handleChange" />
</template>
```

```ts
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    // 'evt' 将会是 `any`类型
    const handleChange = (evt) => {
      console.log(evt.target.value); // 此处 TS 将会抛出异常
    };

    return { handleChange };
  },
});
```

解决方案是将事件的目标转换为正确的类型

```ts
const handleChange = (evt: Event) => {
  console.log((evt.target as HTMLInputElement).value);
};
```
