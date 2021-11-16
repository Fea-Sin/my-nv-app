# pnpm CLI

## 命令行

**等效**

- `npm install` => `pnpm install`

- `npm install <pkg>` => `pnpm install <pkg>`

- `npm run <cmd>` => `pnpm <cmd>`

例如：

`npm run lint` 和 `pnpm lint` 相同

## 配置项

- `-C <path>`

在`<path>`中启动 pnpm，而不是在当前的目录

- -W

在工作空间的根目录中启动 pnpm，而不是在当前的目录

## pnpx

`pnpx`是一个命令行工具，他从源获取包，但不将它安装为依赖，热加载它，并运行任何它暴露的默认二进制命令

```bash
pnpx create-react-app my-project
```

这将从源获取`create-react-app`并使用给定的参数运行它

## pnpm exec

在项目范围内执行 shell 命令

`node_modules/.bin`添加到`PATH`，因此`pnpm exec`允许执行依赖项的命令

如果您将 Jest 作为项目的依赖项，则无需全局安装 Jest，只需要使用`pnpm exec`运行它

```bash
pnpm exec jest
```

### --recursive, -r

在工作区的每个项目中执行 shell 命令

## pnpm dlx

从源中获取包而不将其安装为依赖，热加载，并运行它公开的默认命令二进制文件

例如

```bash
pnpm dlx create-react-app ./my-app
```
