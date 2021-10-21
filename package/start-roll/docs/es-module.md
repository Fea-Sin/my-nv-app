# ES 模块语法

## 导入

导入的值不能重新分配，尽管导入的对象和数组可以被修改，它们的行为与 const 声明类似

**命名导入**

从源模块导入其原始名称的特定值

```js
import { something } from "./module.js";
```

从源模块导入特定值，并指定自定义名称

```js
import { something as somethingElse } from "./module.js";
```

**命名空间导入**

将源模块中的所有内容作为对象导入，将所有源模块的命名导出为对象的属性和方法。默认导出
被排除在此对象之外

```js
import * as module from "./module.js";
```

**默认导入**

导入源文件的默认导出

```js
import something from "./module.js";
```

**空的导入**

加载模块代码，但不要创建任何新对象

```js
import "./module.js";
```

这对于 polyfills 是有用的，或者当导入的代码的主要目的是与原型有关的时候

## 导出

**命名导出**

导出以前声明的值

```js
const something = true;

export { something };
```

在导出时重命名

```js
export { something as somethingElse };
```

声明后立即导出

```js
// 这可以与var、let、const、class、function 配合使用

export var something = true;
```

**默认导出**

导出一个值作为源模块的默认导出

```js
export default something;
```

## ES module 实时绑定

ES 模块导出实时绑定，而不是值。

如若重新分配对应值会报错

[实例](../src/rollc/a-esm.js)
