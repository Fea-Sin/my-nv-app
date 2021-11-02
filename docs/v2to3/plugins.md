# 插件

插件通常向 Vue 添加全局级功能，它可以是公开`install()`方法的`object`，也可以是`function`

插件的功能范围没有严格限制，一般有下面几种

1. 添加全局方法或者 property

1. 添加全局资源，如指令/过渡等

1. 通过全局 mixin 来添加一些组件选项

1. 添加全局实例方法，通过把它们添加到`config.globalProperties`上实现

1. 一个库，提供自己的 API，同时提供上面的一个或多个功能

## 编写插件

每当插件被添加到应用程序时，如果它是一个对象，就会调用`install`方法，如果它是一个`function`，
则函数本身将被调用。在这两种情况下，它都会收到两个参数：由 Vue 的`createApp`生成的`app`对象和
用户传入的选项

```js
export default {
  install(app, options) {
    // Plugin code
  },
};
```

### 添加全局方法

添加全局实例方法，我们使用`app.config.globalProperties`暴露它

该方法接收一个`key`字符串

```js
export default {
  install(app, options) {
    app.config.globalProperties.$translate = (key) => {
      return key.split(".").reduce((acc, cur) => {
        if (acc) {
          return acc[cur];
        }
      }, options);
    };
  },
};
```

如果`options`为如下

```js
options = {
  greetings: {
    hello: "HI Vue3",
  },
};
```

```js
$translate("greetings.hello"); // HI Vue3
```

### `inject`为插件的用户提供功能或 attribute

我们可以允许应用程序访问`options`参数以能使用翻译对象

```js
export default {
  install(app, options) {
    // ...

    app.provide("i18n", options);
  },
};
```

插件用户现在可以将`inject["i18n"]`注入到他们的组件并访问该对象

### 其它

由于我们可以访问`app`对象，因此插件可以使用其它所有功能

例如`mixin`和`directive`

```js
export default {
  install(app, options) {
    // ...

    app.provide("i18n", options);

    app.directive("my-directive", {
      mounted(el, binding, vnode, oldVnode) {
        // ...
      },
    });

    app.mixin({
      created() {
        // ...
      },
    });
  },
};
```

## 使用插件

使用`createApp()`初始化 Vue 应用程序后，你可以通过调用`use()`方法将插件添加到你的
应用程序中

`use()`方法有两个参数，第一个是要安装的插件

第二个参数是可选的，取决于每个特定的插件，例如上述插件的`options`参数

```js
import { createApp } from "vue";
import Root from "./App.vue";
import i18nPlugin from "./plugins/i18n";

const app = createApp(Root);

const i18nOptions = {
  greetings: {
    hello: "HI Vue3",
  },
};

app.use(i18nPlugin, i18nOptions);

app.mount("#app");
```
