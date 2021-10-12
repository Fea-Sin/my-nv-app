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
