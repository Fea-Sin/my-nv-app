# 双向绑定为什么要用 Proxy 重构

在`Proxy`之前，`JavaScript`中就提供过`Object.defineProperty`，允许对对象的`getter/setter`
进行拦截

Vue3.0 之前的双向绑定是由`defineProperty`实现，在 3.0 重构为`Proxy`，那两者的区别在哪里呢

`Object.defineProperty`的定义

> Object.defineProperty() 方法会直接在一个**对象**上定义一个**新属性**，或者修改一个对象的
> 现有属性，并返回此对象

```js
Object.defineProperty(obj, prop, descriptor);
```

- obj 要定义属性的对象
- prop 要定义或修改的属性的名称或 Symbol
- descriptor 要定义或修改的属性描述符

[实例](../src/c.js)

## Vue 中的 defineProperty

Vue3 之前的双向绑定都是通过`defineProperty`的`getter/setter`来实现的。

摘抄一段 Vue 源码中的片段

```js
Object.defineProperty(obj, key, {
  enumrable: true,
  configurable: true,
  get: function reactiveGetter() {
    // ...
    if (Dep.target) {
      // 收集依赖
      dep.depend();
    }
    return value;
  },
  set: function reactiveSetter(newVal) {
    // ...
    // 通知视图更新
    dep.notify();
  },
});
```

`defineProperty`是对**对象上的属性**操作，而非对象本身，这也是为什么
对象新增属性不会更新视图

[实例](../../../src/views/TestE.vue)
Vue2 相应操作无法更新视图

Vue2 及之前数组的变动无法更新视图
[实例](../../../src/views/TestE.vue)

## Proxy 与 defineProperty 对比

- `Proxy`作为新标准将受到浏览器厂商重点持续关注

- `Proxy`能观察的类型比`defineProperty`更丰富

- `Proxy`不兼容 IE，也没有`polyfill`，`defineProperty`能支持到 IE9

- `Object.defineProperty`是劫持对象的属性，新增元素需要再次`defineProperty`。而`Proxy`
  劫持的是整个对象

- 使用`defineProperty`时，我们修改原来的`obj`对象就可以触发拦截，而使用`Proxy`必须需要修改
  代理对象，即`proxy`的实例才可以触发拦截
