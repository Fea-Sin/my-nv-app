# nextTick

看一下 nextTick 源码，nextTick 源码很简单

```ts
export function nextTick<T = void>(
  this: T,
  fn?: (this: T) => void
): Promise<void> {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
```

```ts
const resolvedPromise: Promise<any> = Promise.resolve();
```

`nextTick`就是使用了 JavaScript 的 Promise

在下次 DOM 更新循环之后执行回调

[实例](../../src/views/TestG.vue)
