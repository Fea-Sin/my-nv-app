# Wrapper

Vue Test Utils 是一个基于包裹器的 API

一个 `Wrapper`是一个包括了一个挂载组件或 vnode，以及测试该组件或 vnode 的方法

## attributes

返回`Wrapper`DOM 节点的特性对象。如果提供了`key`，则返回这个`key`对应的值

- 参数 key（可选）: `string`

- 返回值: { [attribute: string]: any } | string

[实例](../../tests/start/Greeting.spec.ts)

## classes

返回`Wrapper`DOM 节点的 class，返回 class 名称的数组，或在提供 class 名的时候返回一个布尔值

- 参数 className（可选）: `string`

- 返回值： `Array<string> | boolean`

[实例](../../tests/start/Greeting.spec.ts)

## contains

可以用 find | findComponent

判断`Wrapper`是否包含了一个匹配选择器的元素或组件

- 参数 selector: `string|Component`

- 返回值: `boolean`

[实例](../../tests/start/Greeting.spec.ts)

## html

返回`Wrapper`DOM 节点的 HTML 字符串

返回值: `string`

[实例](../../tests/start/Greeting.spec.ts)

## findComponent

返回第一个匹配的 Vue 组件的 Wrapper

- 参数 selector: `Component|ref|name`

- 返回: `Wrapper`

[实例](../../tests/start/Greeting.spec.ts)
