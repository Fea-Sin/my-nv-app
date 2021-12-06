# 环境变量和模式

## 环境变量

Vite 在一个特殊的`import.meta.env`对象上暴露环境变量，这里有一些内建变量

- `import.meta.env.MODE`： `string`应用运行的模式

- `import.meta.env.BASE_URL`： `string`部署应用时的基本 URL。它由`base`配置项决定

- `import.meta.env.PROD`：`boolean`应用是否运行在生产环境

- `import.meta.env.DEV`： `boolean`应用是否运行在开发环境（与`import.mata.env.PROD`相反）

## `.env`文件

Vite 使用`dotenv`从你的环境目录中的下列文件加载额外的环境变量

```bash
.env              # 所有情况下都会加载
.env.local        # 所有情况下都会加载，但会被 git 忽略
.env.[mode]       # 只在指定模式下加载
.env.[mode].local # 只在指定模式下加载，但会被 git 忽略
```

加载的环境变量也会通过`import.meta.env`暴露给客户端源码

为了防止意外将一些环境变量泄漏到客户端，只有以`VITE_`为前缀的变量才会暴露给经过 vite 处理的代码

```
DB_PASSWORD=foobar
VITE_SOME_KEY=123
```

只有`VITE_SOME_KEY`会被暴露为`import.meta.env.VITE_SOME_KEY`提供给客户端源码，而`DB_PASSWORD`
则不会

> 安全注意事项
>
> - `env.*.local`文件应是本地的，可以包含敏感变量。你应该将`.local`添加到你的`.gitignore`中
> - 由于任何暴露给 Vite 源码的变量都将出现在客户端包中，`VITE_*`变量应该不包含任何敏感信息

## 智能提示

默认情况下，Vite 为`import.meta.env`提供了类型定义。随着在`.env.[mode]`文件中定义了越来
越多的环境变量，你可能想要在代码中获取这些以`VITE_`为前缀的用户自定义环境变量的 TypeScript 智能提示

要做到这一点，你可以在`src`目录下创建一个`env.d.ts`文件，增加如下`ImportMetaEnv`定义

```ts
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_TITLE: string;
  // 更多环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## 模式

默认情况下，开发服务器（`dev`命令）运行在`development`(开发)模式，而`build`以及`serve`
命令则运行在`production`（生产）模式

这意味着当执行`vite build`时，它会自动加载`.env.production`中存在的环境变量

```
# .env.production

VITE_APP_TITLE=My App
```

在应用中，可以使用`import.meta.env.VITE_APP_TITLE`渲染标题

然而，重要的是理解**模式**是一个更广泛的概念，而不仅仅是开发和生产。一个典型的例子是，
你希望有一个`staging`（预发布）模式，它应该具备类似生产的行为，但环境变量与生产环境略有不同

你可以通过传递`--mode`选项标志来覆盖命令使用的默认模式

```bash
vite build --mode staging
```

为了使应用实现预期行为，我们还需要一个`.env.staging`文件

```
# .env.staging
NODE_ENV=production
VITE_APP_TITLE=My App (staging)
```
