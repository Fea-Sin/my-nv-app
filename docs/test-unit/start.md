# TEST 起步

## 挂载组件

Vue Test Utils 通过将组件隔离挂载，然后模拟必要的输入（prop、注入和用户事件）和对输出（渲染结果、触发的自定义事件）
的断言来测试 Vue 组件

被挂载的组件会返回到一个包裹器内，而包裹器会暴露很多封装、遍历和查询其内部的 Vue 组件实例的便捷的方法

可以通过`mount`方法来创建包裹器

[实例](../../tests/start/TaCounter.spec.ts)

## 测试组件渲染出来的 HTML

现在我们已经有了这个包裹器，我们能做的第一件事就是认证该组件渲染出来的 HTML 复合预期

[实例](../../tests/start/TbCounter.spec.ts)

## 模拟用户点击

当用户点击按钮的时候，我们的计数器应该递增，为了模拟这一行为，我们首先需要通过`wrapper.find()`
定位该按钮，此方法返回一个该按钮元素的包裹器，然后我们能够通过对该按钮包裹器调用`.trigger()`来模拟点击

### 使用`nextTick`与 await

任何操作导致 DOM 的改变都应改在断言之前 await `nextTick`函数。因为 Vue 会对未生效的 DOM 进行批量异步更新，
避免因数据反复变化而导致不必要的渲染

等待 Vue 完成 DOM 更新，再去断言相应的改变

```ts
await button.trigger("click");
expect(wrapper.text()).to.contain("1");
```

`trigger`返回一个可以像上述示例一样被 await 或像普通 Promise 回调一样被`then`链式
调用 Promise

[实例](../../tests/start/TcCounter.spec.ts)

## 明白要测试的是什么

对于 UI 组件来说，我们不推荐一味追求行级覆盖率，因为它会导致我们过分关注组件的内部细节，
从而导致琐碎的测试

取而代之的是，我们推荐把测试撰写为断言你的组件的公共接口，并在一个黑盒内部处理它。一个简单的测试
用例将会断言一些输入（用户交互或 prop 的改变）提供给某组件之后是否导致预期结果。

这样的好处在于，即便该组件的内部实现已经随时间发生了改变，只要你的组件的公共接口始终保持一致，
测试就可以通过

## 浅渲染

在测试用例中，我们通常希望专注在一个孤立的单元中测试组件，避免对其子组件的行为进行间接的断言
除此之外，对于包含许多子组件的组件来说，整个渲染树可能会非常大。重复渲染所有的子组件可能会让我们
的测试变慢

Vue Test Utils 允许你通过`shallowMount`方法只挂载一个组件而不渲染其子组件（即保留它们的存根）

## 生命周期钩子

在使用`mount`或`shallowMount`方法时，你可以期望你的组件响应 Vue 所有生命周期事件。
但是请务必注意的是，除非使用`Wrapper.destroy()`，否则`beforeDestroy`和`destroyed`
将不会触发

此外，组件在每个测试结束时并不会自动销毁，并且将由用户来决定是否要存根或手动清理那些在测试
结束前继续运行的任务

## 断言触发的事件

每个挂载的包裹器都会通过其背后的 Vue 实例自动记录所有被触发的事件。你可以用`wrapper.emitted()`
方法取回这些事件记录

```ts
wrapper.vm.$emit("foo");
wrapper.vm.$emit("foo", 123);

// wrapper.emitted() 返回以下对象
{
  foo: [[], [123]];
}
```

然后你可以基于这些数据来设置断言

```ts
// 断言事件已经被触发
expect(wrapper.emitted().foo).toBeTruthy();

// 断言事件的数量
expect(wrapper.emitted().foo.length).toBe(2);

// 断言事件的有效数据
expect(wrapper.emitted().foo(1)).toEqual([123]);
```

## 操作组件状态

你可以在包裹器上用`setData`或`setProps`方法直接操作组件状态

```ts
it("manipulates", async () => {
  await wrapper.setData({ count: 10 });

  await wrapper.setProps({ foo: "bar" });
});
```

### 仿造 Prop

你可以使用 Vue 在内置`propsData`选项向组件传入 prop:

```ts
import { mount } from "@vue/test-utils";

mount(Component, {
  propsData: {
    aProp: "some value",
  },
});
```

你也可以用`wrapper.setProps({})`方法更新这些已经挂载的组件的 prop

### 避免`setData`

编写测试避免使用`setData`，我们在使用`mount`或者`shallowMount`时需要指定一些选项

```ts
it("should render Foo", async () => {
  const wrapper = mount(Foo, {
    data() {
      return {
        show: true,
      };
    },
  });

  expect(wrapper.text()).toMatch(/Foo/);
});

it("should not render Foo", async () => {
  const wrapper = mount(Foo, {
    data() {
      return {
        show: false,
      };
    },
  });

  expect(wrapper.text()).not.toMatch(/Foo/);
});
```

## 鼠标点击

使用 Sinon 检测函数调用

[实例](../../tests/start/YesNoComponent.spec.ts)
